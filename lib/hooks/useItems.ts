import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export interface Item {
	item_id: string;
	item_code: string;
	item_name: string;
	item_type: string;
	is_sales_item: boolean;
	is_purchase_item: boolean;
	is_manufactured_item: boolean;
	sales_price: number;
	standard_cost: number;
	active: boolean;
	description: string | null;
	created_at: string;
	updated_at: string;
}

interface FetchItemsParams {
	filterType?: string;
}

const fetchItems = async (params?: FetchItemsParams): Promise<Item[]> => {
	let query = supabase
		.from("item")
		.select("*")
		.order("created_at", { ascending: false });

	if (params?.filterType && params.filterType !== "all") {
		query = query.eq("item_type", params.filterType);
	}

	const { data, error } = await query;

	if (error) throw error;
	return data || [];
};

const createItem = async (data: {
	item_code: string;
	item_name: string;
	item_type: string;
	is_sales_item: boolean;
	is_purchase_item: boolean;
	is_manufactured_item: boolean;
	sales_price: number;
	standard_cost: number;
	description?: string;
	created_by_user_id: string | null;
}): Promise<Item> => {
	const { data: item, error } = await supabase
		.from("item")
		.insert({
			item_code: data.item_code,
			item_name: data.item_name,
			item_type: data.item_type,
			is_sales_item: data.is_sales_item,
			is_purchase_item: data.is_purchase_item,
			is_manufactured_item: data.is_manufactured_item,
			sales_price: data.sales_price,
			standard_cost: data.standard_cost,
			description: data.description || null,
			active: true,
			created_by_user_id: data.created_by_user_id,
		})
		.select()
		.single();

	if (error) throw error;
	return item;
};

const updateItem = async (data: {
	item_id: string;
	active?: boolean;
	[key: string]: any;
}): Promise<Item> => {
	const { item_id, ...updateData } = data;
	const { data: item, error } = await supabase
		.from("item")
		.update(updateData)
		.eq("item_id", item_id)
		.select()
		.single();

	if (error) throw error;
	return item;
};

const deleteItem = async (itemId: string): Promise<void> => {
	const { error } = await supabase.from("item").delete().eq("item_id", itemId);

	if (error) throw error;
};

export function useItems(filterType: string = "all") {
	const queryClient = useQueryClient();

	// Query for fetching items
	const {
		data: items = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["items", filterType],
		queryFn: () => fetchItems({ filterType }),
	});

	// Mutation for creating item
	const createItemMutation = useMutation({
		mutationFn: createItem,
		onSuccess: () => {
			// Invalidate and refetch items
			queryClient.invalidateQueries({ queryKey: ["items"] });
		},
		onError: (err: Error) => {
			console.error("Error creating item:", err);
		},
	});

	// Mutation for updating item
	const updateItemMutation = useMutation({
		mutationFn: updateItem,
		onSuccess: () => {
			// Invalidate and refetch items
			queryClient.invalidateQueries({ queryKey: ["items"] });
		},
		onError: (err: Error) => {
			console.error("Error updating item:", err);
		},
	});

	// Mutation for deleting item
	const deleteItemMutation = useMutation({
		mutationFn: deleteItem,
		onSuccess: () => {
			// Invalidate and refetch items
			queryClient.invalidateQueries({ queryKey: ["items"] });
		},
		onError: (err: Error) => {
			console.error("Error deleting item:", err);
		},
	});

	return {
		items,
		isLoading,
		error,
		refetch,
		createItem: createItemMutation.mutate,
		createItemAsync: createItemMutation.mutateAsync,
		isCreating: createItemMutation.isPending,
		updateItem: updateItemMutation.mutate,
		updateItemAsync: updateItemMutation.mutateAsync,
		isUpdating: updateItemMutation.isPending,
		deleteItem: deleteItemMutation.mutate,
		deleteItemAsync: deleteItemMutation.mutateAsync,
		isDeleting: deleteItemMutation.isPending,
		createError: createItemMutation.error,
		updateError: updateItemMutation.error,
		deleteError: deleteItemMutation.error,
	};
}
