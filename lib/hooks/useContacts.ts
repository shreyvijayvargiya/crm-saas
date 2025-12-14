import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export interface Contact {
	contact_id: string;
	entity_id: string;
	first_name: string;
	last_name: string;
	email: string | null;
	phone: string | null;
	job_title: string | null;
	is_primary_contact: boolean;
	has_login_access?: boolean;
}

const DEFAULT_TENANT_ID = "00000000-0000-0000-0000-000000000001";

// Fetch contacts with login access status
const fetchContacts = async (entityId: string): Promise<Contact[]> => {
	const { data: contactsData, error: contactsError } = await supabase
		.from("contact")
		.select("*")
		.eq("entity_id", entityId)
		.order("created_at", { ascending: false });

	if (contactsError) throw contactsError;

	// Check which contacts have login access
	const contactsWithAccess = await Promise.all(
		(contactsData || []).map(async (contact) => {
			const { data: userAccount } = await supabase
				.from("user_account")
				.select("user_id")
				.eq("contact_id", contact.contact_id)
				.single();

			return {
				...contact,
				has_login_access: !!userAccount,
			};
		})
	);

	return contactsWithAccess;
};

// Create contact
const createContact = async (data: {
	entity_id: string;
	first_name: string;
	last_name: string;
	email?: string;
	phone?: string;
	job_title?: string;
	is_primary_contact: boolean;
}): Promise<Contact> => {
	const { data: contact, error } = await supabase
		.from("contact")
		.insert({
			entity_id: data.entity_id,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email || null,
			phone: data.phone || null,
			job_title: data.job_title || null,
			is_primary_contact: data.is_primary_contact,
		})
		.select()
		.single();

	if (error) throw error;

	return {
		...contact,
		has_login_access: false,
	};
};

// Delete contact
const deleteContact = async (contactId: string): Promise<void> => {
	const { error } = await supabase
		.from("contact")
		.delete()
		.eq("contact_id", contactId);

	if (error) throw error;
};

// Grant login access
const grantLoginAccess = async (data: {
	contact_id: string;
	entity_id: string;
	username: string;
	password: string;
	role: "ADMIN" | "MANAGER" | "EDITOR" | "SELF";
	access_scope: "SINGLE_COMPANY" | "ALL_COMPANIES";
}): Promise<void> => {
	const { error } = await supabase.from("user_account").insert({
		username: data.username,
		password_hash: data.password, // In production, hash this properly
		role: data.role,
		contact_id: data.contact_id,
		tenant_id: DEFAULT_TENANT_ID,
		entity_id: data.entity_id,
		access_scope: data.access_scope,
		is_active: true,
	});

	if (error) throw error;
};

export function useContacts(entityId: string) {
	const queryClient = useQueryClient();

	// Query for fetching contacts
	const {
		data: contacts = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["contacts", entityId],
		queryFn: () => fetchContacts(entityId),
		enabled: !!entityId,
	});

	// Mutation for creating contact
	const createContactMutation = useMutation({
		mutationFn: createContact,
		onSuccess: (_, variables) => {
			// Invalidate and refetch contacts
			queryClient.invalidateQueries({
				queryKey: ["contacts", variables.entity_id],
			});
		},
		onError: (err: Error) => {
			console.error("Error creating contact:", err);
		},
	});

	// Mutation for deleting contact
	const deleteContactMutation = useMutation({
		mutationFn: deleteContact,
		onSuccess: () => {
			// Invalidate and refetch contacts
			queryClient.invalidateQueries({ queryKey: ["contacts", entityId] });
		},
		onError: (err: Error) => {
			console.error("Error deleting contact:", err);
		},
	});

	// Mutation for granting login access
	const grantAccessMutation = useMutation({
		mutationFn: grantLoginAccess,
		onSuccess: (_, variables) => {
			// Invalidate and refetch contacts to get updated access status
			queryClient.invalidateQueries({
				queryKey: ["contacts", variables.entity_id],
			});
		},
		onError: (err: Error) => {
			console.error("Error granting access:", err);
		},
	});

	return {
		contacts,
		isLoading,
		error,
		refetch,
		createContact: createContactMutation.mutate,
		createContactAsync: createContactMutation.mutateAsync,
		isCreating: createContactMutation.isPending,
		deleteContact: deleteContactMutation.mutate,
		deleteContactAsync: deleteContactMutation.mutateAsync,
		isDeleting: deleteContactMutation.isPending,
		grantAccess: grantAccessMutation.mutate,
		grantAccessAsync: grantAccessMutation.mutateAsync,
		isGrantingAccess: grantAccessMutation.isPending,
		createError: createContactMutation.error,
		deleteError: deleteContactMutation.error,
		grantAccessError: grantAccessMutation.error,
	};
}
