"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building2 } from "lucide-react";

interface UserData {
	userId: string;
	username: string;
	role: string;
}

interface ContactData {
	first_name: string;
	last_name: string;
	email: string | null;
	phone: string | null;
	job_title: string | null;
	entity?: {
		display_name: string;
		entity_type: string;
	};
}

export default function AccountPage() {
	const router = useRouter();
	const [user, setUser] = useState<UserData | null>(null);
	const [contact, setContact] = useState<ContactData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (!userData) {
			router.push("/login");
			return;
		}

		try {
			const userObj = JSON.parse(userData);
			setUser(userObj);
			fetchContactData(userObj.userId);
		} catch (error) {
			console.error("Error parsing user data:", error);
			router.push("/login");
		}
	}, [router]);

	const fetchContactData = async (userId: string) => {
		try {
			// Get user account with contact info
			const { data: userAccount, error: userError } = await supabase
				.from("user_account")
				.select("contact_id, entity_id")
				.eq("user_id", userId)
				.single();

			if (userError) throw userError;

			if (userAccount?.contact_id) {
				// Fetch contact details
				const { data: contactData, error: contactError } = await supabase
					.from("contact")
					.select(
						`
						first_name,
						last_name,
						email,
						phone,
						job_title,
						entity:entity_id (
							display_name,
							entity_type
						)
					`
					)
					.eq("contact_id", userAccount.contact_id)
					.single();

				if (contactError) throw contactError;
				setContact(contactData);
			}
		} catch (error) {
			console.error("Error fetching contact data:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-50 p-8">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Account Settings</h1>
					<p className="text-muted-foreground mt-1">
						Manage your account information and preferences
					</p>
				</div>

				{/* User Information */}
				<Card>
					<CardHeader>
						<CardTitle>Login Information</CardTitle>
						<CardDescription>
							Your login credentials and account details
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label className="text-muted-foreground">Username</Label>
								<p className="font-medium">{user?.username}</p>
							</div>
							<div>
								<Label className="text-muted-foreground">Role</Label>
								<div className="mt-1">
									<Badge variant="default">{user?.role}</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contact Information */}
				{contact && (
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
							<CardDescription>Your personal contact details</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-muted-foreground">Name</Label>
									<p className="font-medium">
										{contact.first_name} {contact.last_name}
									</p>
								</div>
								<div>
									<Label className="text-muted-foreground">Job Title</Label>
									<p className="font-medium">{contact.job_title || "—"}</p>
								</div>
								<div>
									<Label className="text-muted-foreground">Email</Label>
									<p className="font-medium flex items-center gap-2">
										<Mail className="w-4 h-4" />
										{contact.email || "—"}
									</p>
								</div>
								<div>
									<Label className="text-muted-foreground">Phone</Label>
									<p className="font-medium flex items-center gap-2">
										<Phone className="w-4 h-4" />
										{contact.phone || "—"}
									</p>
								</div>
							</div>
							{contact.entity && (
								<div className="pt-4 border-t">
									<Label className="text-muted-foreground">Company</Label>
									<p className="font-medium flex items-center gap-2 mt-1">
										<Building2 className="w-4 h-4" />
										{contact.entity.display_name}
										<Badge variant="outline" className="ml-2">
											{contact.entity.entity_type === "COMPANY"
												? "Company"
												: "Individual"}
										</Badge>
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* Actions */}
				<Card>
					<CardHeader>
						<CardTitle>Actions</CardTitle>
						<CardDescription>Manage your account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button variant="outline" className="w-full">
							Change Password
						</Button>
						<Button variant="outline" className="w-full">
							Update Profile
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
