"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Contact } from "@/lib/store/slices/contactsSlice";

interface GrantLoginAccessDialogProps {
	open: boolean;
	onClose: () => void;
	contact: Contact;
	onSuccess: () => void;
	grantAccessAsync: (data: {
		contact_id: string;
		entity_id: string;
		username: string;
		password: string;
		role: "ADMIN" | "MANAGER" | "EDITOR" | "SELF";
		access_scope: "SINGLE_COMPANY" | "ALL_COMPANIES";
	}) => Promise<void>;
	isGrantingAccess: boolean;
	grantAccessError: Error | null;
}

export function GrantLoginAccessDialog({
	open,
	onClose,
	contact,
	onSuccess,
	grantAccessAsync,
	isGrantingAccess,
	grantAccessError,
}: GrantLoginAccessDialogProps) {
	const [formData, setFormData] = useState({
		role: "SELF" as "ADMIN" | "MANAGER" | "EDITOR" | "SELF",
		access_scope: "SINGLE_COMPANY" as "SINGLE_COMPANY" | "ALL_COMPANIES",
		username: "",
		password: "",
	});

	// Reset form when contact changes or modal opens
	useEffect(() => {
		if (open && contact) {
			setFormData({
				role: "SELF",
				access_scope: "SINGLE_COMPANY",
				username: contact.email?.split("@")[0] || "",
				password: "",
			});
		}
	}, [open, contact]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.username || !formData.password) {
			alert("Please provide a username and password");
			return;
		}

		try {
			await grantAccessAsync({
				contact_id: contact.contact_id,
				entity_id: contact.entity_id,
				username: formData.username,
				password: formData.password,
				role: formData.role,
				access_scope: formData.access_scope,
			});

			onSuccess();
		} catch (error: any) {
			console.error("Error granting login access:", error);
			// Error is handled by the mutation, but we can show a message
			if (error?.code === "23505") {
				alert("Username already exists. Please choose a different username.");
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Grant Login Access</DialogTitle>
					<DialogDescription>
						Grant login access to {contact.first_name} {contact.last_name}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username *</Label>
						<Input
							id="username"
							type="text"
							value={formData.username}
							onChange={(e) =>
								setFormData({ ...formData, username: e.target.value })
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password *</Label>
						<Input
							id="password"
							type="password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="role">Role *</Label>
						<Select
							value={formData.role}
							onValueChange={(value: any) =>
								setFormData({ ...formData, role: value })
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ADMIN">Admin</SelectItem>
								<SelectItem value="MANAGER">Manager</SelectItem>
								<SelectItem value="EDITOR">Editor</SelectItem>
								<SelectItem value="SELF">Self</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="access_scope">Access Scope *</Label>
						<Select
							value={formData.access_scope}
							onValueChange={(value: any) =>
								setFormData({ ...formData, access_scope: value })
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="SINGLE_COMPANY">
									This company only
								</SelectItem>
								<SelectItem value="ALL_COMPANIES">
									All companies under my organization
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{grantAccessError && (
						<div className="text-sm text-red-600">
							{grantAccessError instanceof Error
								? grantAccessError.message
								: "Failed to grant access"}
						</div>
					)}
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isGrantingAccess}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isGrantingAccess}>
							{isGrantingAccess ? "Creating..." : "Grant Access"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
