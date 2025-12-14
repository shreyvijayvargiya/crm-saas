"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { GrantLoginAccessDialog } from "./GrantLoginAccessDialog";
import { useContacts, Contact } from "@/lib/hooks/useContacts";

interface PeopleTabProps {
	entityId: string;
}

export function PeopleTab({ entityId }: PeopleTabProps) {
	const {
		contacts,
		isLoading,
		createContactAsync,
		isCreating,
		deleteContactAsync,
		isDeleting,
		grantAccessAsync,
		isGrantingAccess,
		createError,
		deleteError,
		grantAccessError,
	} = useContacts(entityId);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showGrantAccessModal, setShowGrantAccessModal] = useState(false);
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		job_title: "",
		is_primary_contact: false,
	});

	const handleAddContact = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.first_name || !formData.last_name) {
			alert("Please fill in at least first and last name");
			return;
		}

		try {
			await createContactAsync({
				entity_id: entityId,
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email || undefined,
				phone: formData.phone || undefined,
				job_title: formData.job_title || undefined,
				is_primary_contact: formData.is_primary_contact,
			});

			setFormData({
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
				job_title: "",
				is_primary_contact: false,
			});
			setShowAddModal(false);
		} catch (error) {
			console.error("Error adding contact:", error);
			alert("Failed to add contact. Please try again.");
		}
	};

	const handleRemoveContact = async (contactId: string) => {
		if (!confirm("Are you sure you want to remove this contact?")) return;

		try {
			await deleteContactAsync(contactId);
		} catch (error) {
			console.error("Error removing contact:", error);
			alert("Failed to remove contact. Please try again.");
		}
	};

	const handleGrantAccessSuccess = async () => {
		setShowGrantAccessModal(false);
		setSelectedContact(null);
		// The mutation will automatically update the cache and Redux state
	};

	if (isLoading) {
		return <div>Loading contacts...</div>;
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<div>
						<CardTitle>People</CardTitle>
						<CardDescription>
							Manage contacts associated with this company
						</CardDescription>
					</div>
					<Button onClick={() => setShowAddModal(true)}>
						<Plus className="h-4 w-4 mr-2" />
						Add Person
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{contacts.length === 0 ? (
					<div className="py-8 text-center text-zinc-500">
						No contacts found. Add your first contact to get started.
					</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Phone</TableHead>
								<TableHead>Role / Job Title</TableHead>
								<TableHead>Login Access</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{contacts.map((contact) => (
								<TableRow key={contact.contact_id}>
									<TableCell className="font-medium">
										{contact.first_name} {contact.last_name}
										{contact.is_primary_contact && (
											<Badge variant="outline" className="ml-2">
												Primary
											</Badge>
										)}
									</TableCell>
									<TableCell>{contact.email || "—"}</TableCell>
									<TableCell>{contact.phone || "—"}</TableCell>
									<TableCell>{contact.job_title || "—"}</TableCell>
									<TableCell>
										{contact.has_login_access ? (
											<Badge variant="success">Yes</Badge>
										) : (
											<Badge variant="secondary">No</Badge>
										)}
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											{!contact.has_login_access && (
												<Button
													variant="outline"
													size="sm"
													onClick={() => {
														setSelectedContact(contact);
														setShowGrantAccessModal(true);
													}}
												>
													<UserPlus className="h-4 w-4 mr-1" />
													Grant Access
												</Button>
											)}
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleRemoveContact(contact.contact_id)}
												disabled={isDeleting}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>

			{/* Add Person Modal */}
			<Dialog open={showAddModal} onOpenChange={setShowAddModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new contact to this company
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleAddContact} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="first_name">First Name *</Label>
								<Input
									id="first_name"
									value={formData.first_name}
									onChange={(e) =>
										setFormData({ ...formData, first_name: e.target.value })
									}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="last_name">Last Name *</Label>
								<Input
									id="last_name"
									value={formData.last_name}
									onChange={(e) =>
										setFormData({ ...formData, last_name: e.target.value })
									}
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">Phone</Label>
							<Input
								id="phone"
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="job_title">Job Title</Label>
							<Input
								id="job_title"
								value={formData.job_title}
								onChange={(e) =>
									setFormData({ ...formData, job_title: e.target.value })
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="is_primary">Primary Contact</Label>
								<p className="text-sm text-muted-foreground">
									Mark this person as the primary contact
								</p>
							</div>
							<Switch
								id="is_primary"
								checked={formData.is_primary_contact}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, is_primary_contact: checked })
								}
							/>
						</div>
						{createError && (
							<div className="text-sm text-red-600">
								{createError instanceof Error
									? createError.message
									: "Failed to add contact"}
							</div>
						)}
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setShowAddModal(false)}
								disabled={isCreating}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isCreating}>
								{isCreating ? "Adding..." : "Add Person"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Grant Login Access Modal */}
			{selectedContact && (
				<GrantLoginAccessDialog
					open={showGrantAccessModal}
					onClose={() => {
						setShowGrantAccessModal(false);
						setSelectedContact(null);
					}}
					contact={selectedContact}
					onSuccess={handleGrantAccessSuccess}
					grantAccessAsync={grantAccessAsync}
					isGrantingAccess={isGrantingAccess}
					grantAccessError={grantAccessError}
				/>
			)}
		</Card>
	);
}
