import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

const DEFAULT_TENANT_ID = "00000000-0000-0000-0000-000000000001";

export interface Entity {
	entity_id: string;
	entity_type: "COMPANY" | "INDIVIDUAL";
	legal_name: string;
	display_name: string;
	country: string | null;
	status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
	relationships?: Array<{
		relationship_type: string;
		is_primary: boolean;
	}>;
	created_at: string;
	updated_at: string;
}

interface CreateEntityData {
	entity_type: "COMPANY" | "INDIVIDUAL";
	legal_name: string;
	display_name: string;
	country?: string;
	default_currency?: string;
	relationship_type: string;
	is_primary: boolean;
	created_by_user_id: string | null;
}

const fetchCompanies = async (): Promise<Entity[]> => {
	// Fetch entities with their relationships
	const { data: entitiesData, error: entitiesError } = await supabase
		.from("entity")
		.select("*")
		.order("created_at", { ascending: false });

	if (entitiesError) throw entitiesError;

	// Fetch relationships for each entity
	const entitiesWithRelationships = await Promise.all(
		(entitiesData || []).map(async (entity) => {
			const { data: relationships } = await supabase
				.from("entity_role")
				.select("relationship_type, is_primary")
				.eq("entity_id", entity.entity_id)
				.eq("tenant_id", DEFAULT_TENANT_ID);

			return {
				...entity,
				relationships: relationships || [],
			};
		})
	);

	return entitiesWithRelationships;
};

const fetchCompany = async (entityId: string): Promise<Entity> => {
	const { data: entityData, error: entityError } = await supabase
		.from("entity")
		.select("*")
		.eq("entity_id", entityId)
		.single();

	if (entityError) throw entityError;

	// Fetch relationships
	const { data: relationships } = await supabase
		.from("entity_role")
		.select("relationship_type, is_primary")
		.eq("entity_id", entityId)
		.eq("tenant_id", DEFAULT_TENANT_ID);

	return {
		...entityData,
		relationships: relationships || [],
	};
};

const createCompany = async (data: CreateEntityData): Promise<Entity> => {
	// Step 1: Create Entity
	const { data: entityData, error: entityError } = await supabase
		.from("entity")
		.insert({
			entity_type: data.entity_type,
			legal_name: data.legal_name,
			display_name: data.display_name,
			country: data.country || null,
			default_currency: data.default_currency || "USD",
			status: "ACTIVE",
			created_by_user_id: data.created_by_user_id,
		})
		.select()
		.single();

	if (entityError) throw entityError;

	// Step 2: Create EntityRole
	const { error: roleError } = await supabase.from("entity_role").insert({
		entity_id: entityData.entity_id,
		tenant_id: DEFAULT_TENANT_ID,
		relationship_type: data.relationship_type,
		is_primary: data.is_primary,
	});

	if (roleError) throw roleError;

	// Fetch the complete entity with relationships
	return fetchCompany(entityData.entity_id);
};

const updateCompany = async (data: {
	entity_id: string;
	status?: "ACTIVE" | "INACTIVE" | "ARCHIVED";
	internal_notes?: string | null;
	[key: string]: any;
}): Promise<Entity> => {
	const { entity_id, ...updateData } = data;
	const { error } = await supabase
		.from("entity")
		.update(updateData)
		.eq("entity_id", entity_id);

	if (error) throw error;

	return fetchCompany(entity_id);
};

export function useCompanies() {
	const queryClient = useQueryClient();

	// Query for fetching all companies
	const {
		data: companies = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["companies"],
		queryFn: fetchCompanies,
	});

	// Mutation for creating company
	const createCompanyMutation = useMutation({
		mutationFn: createCompany,
		onSuccess: () => {
			// Invalidate and refetch companies
			queryClient.invalidateQueries({ queryKey: ["companies"] });
		},
		onError: (err: Error) => {
			console.error("Error creating company:", err);
		},
	});

	// Mutation for updating company
	const updateCompanyMutation = useMutation({
		mutationFn: updateCompany,
		onSuccess: (_, variables) => {
			// Invalidate both companies list and specific company
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			queryClient.invalidateQueries({
				queryKey: ["company", variables.entity_id],
			});
		},
		onError: (err: Error) => {
			console.error("Error updating company:", err);
		},
	});

	return {
		companies,
		isLoading,
		error,
		refetch,
		createCompany: createCompanyMutation.mutate,
		createCompanyAsync: createCompanyMutation.mutateAsync,
		isCreating: createCompanyMutation.isPending,
		updateCompany: updateCompanyMutation.mutate,
		updateCompanyAsync: updateCompanyMutation.mutateAsync,
		isUpdating: updateCompanyMutation.isPending,
		createError: createCompanyMutation.error,
		updateError: updateCompanyMutation.error,
	};
}

export function useCompany(entityId: string) {
	const queryClient = useQueryClient();

	// Query for fetching single company
	const {
		data: company,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["company", entityId],
		queryFn: () => fetchCompany(entityId),
		enabled: !!entityId,
	});

	return {
		company,
		isLoading,
		error,
		refetch,
	};
}
