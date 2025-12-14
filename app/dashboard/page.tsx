"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus, LogOut, Package, Building2 } from "lucide-react";

interface Item {
	item_id: string;
	item_code: string;
	item_name: string;
	price: number;
	description: string | null;
	item_type: string;
}

interface User {
	userId: string;
	username: string;
	role: string;
}

export default function DashboardPage() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [showAddForm, setShowAddForm] = useState(false);
	const [formData, setFormData] = useState({
		item_code: "",
		item_name: "",
		price: "",
		description: "",
		item_type: "HOUSE_KIT",
	});

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (!userData) {
			router.push("/login");
			return;
		}
		try {
			setUser(JSON.parse(userData));
			fetchItems();
		} catch (error) {
			console.error("Error parsing user data:", error);
			router.push("/login");
		}
	}, [router]);

	const fetchItems = async () => {
		try {
			const { data, error } = await supabase
				.from("item")
				.select("*")
				.eq("is_active", true)
				.order("created_at", { ascending: false });

			if (error) throw error;
			setItems(data || []);
		} catch (error) {
			console.error("Error fetching items:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		try {
			const { error } = await supabase.from("item").insert({
				item_code: formData.item_code,
				item_name: formData.item_name,
				price: parseFloat(formData.price),
				description: formData.description || null,
				item_type: formData.item_type,
				created_by_user_id: user.userId,
			});

			if (error) throw error;

			setFormData({
				item_code: "",
				item_name: "",
				price: "",
				description: "",
				item_type: "HOUSE_KIT",
			});
			setShowAddForm(false);
			fetchItems();
		} catch (error) {
			console.error("Error adding item:", error);
			alert("Failed to add item. Please try again.");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		router.push("/login");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-50">
			<main className="container mx-auto px-4 py-8">
				<div className="mb-6 flex justify-between items-center">
					<h2 className="text-3xl font-bold">House Kits & Items</h2>
					<div className="flex gap-2">
						<Button variant="outline" onClick={() => router.push("/companies")}>
							<Building2 className="h-4 w-4 mr-2" />
							Companies
						</Button>
						<Button onClick={() => setShowAddForm(!showAddForm)}>
							<Plus className="h-4 w-4 mr-2" />
							Add Item
						</Button>
					</div>
				</div>

				{showAddForm && (
					<Card className="mb-6">
						<CardHeader>
							<CardTitle>Add New Item</CardTitle>
							<CardDescription>
								Add a new house kit or item to the system
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleAddItem} className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="item_code">Item Code</Label>
										<Input
											id="item_code"
											value={formData.item_code}
											onChange={(e) =>
												setFormData({ ...formData, item_code: e.target.value })
											}
											placeholder="e.g., KIT-HOUSE-2BR60-BEL"
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="item_name">Item Name</Label>
										<Input
											id="item_name"
											value={formData.item_name}
											onChange={(e) =>
												setFormData({ ...formData, item_name: e.target.value })
											}
											placeholder="e.g., 2 Bedroom 60m² House Kit"
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="price">Price</Label>
									<Input
										id="price"
										type="number"
										step="0.01"
										value={formData.price}
										onChange={(e) =>
											setFormData({ ...formData, price: e.target.value })
										}
										placeholder="0.00"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="description">Description</Label>
									<Input
										id="description"
										value={formData.description}
										onChange={(e) =>
											setFormData({ ...formData, description: e.target.value })
										}
										placeholder="Optional description"
									/>
								</div>
								<div className="flex gap-2">
									<Button type="submit">Add Item</Button>
									<Button
										type="button"
										variant="outline"
										onClick={() => setShowAddForm(false)}
									>
										Cancel
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				)}

				<div className="grid gap-4">
					{items.length === 0 ? (
						<Card>
							<CardContent className="py-8 text-center text-zinc-500">
								No items found. Add your first item to get started.
							</CardContent>
						</Card>
					) : (
						items.map((item) => (
							<Card key={item.item_id}>
								<CardContent className="p-6">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-xl font-semibold">
												{item.item_name}
											</h3>
											<p className="text-sm text-zinc-600 mt-1">
												Code: {item.item_code}
											</p>
											{item.description && (
												<p className="text-sm text-zinc-500 mt-2">
													{item.description}
												</p>
											)}
										</div>
										<div className="text-right">
											<p className="text-2xl font-bold text-primary">
												${parseFloat(item.price.toString()).toFixed(2)}
											</p>
											<p className="text-xs text-zinc-500 mt-1">
												{item.item_type}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</main>
		</div>
	);
}
