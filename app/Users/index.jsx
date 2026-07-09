import React, { useMemo, useState } from "react";
import { Plus, Search, Shield, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormSelect from "../../lib/ui/FormSelect";
import { FormModal, FormField } from "../../lib/ui/modal";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

import { useCrmData } from "../../utils/CrmDataContext";

function getInitials(name) {
	return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const Users = () => {
	const { users, setUsers } = useCrmData();
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("All");
	const [modalOpen, setModalOpen] = useState(false);
	const [form, setForm] = useState({ name: "", email: "", role: "Member", department: "Sales" });

	const filtered = useMemo(() => {
		let list = [...users];
		if (roleFilter !== "All") list = list.filter((u) => u.role === roleFilter);
		if (searchTerm.trim()) {
			const q = searchTerm.toLowerCase();
			list = list.filter(
				(u) =>
					u.name.toLowerCase().includes(q) ||
					u.email.toLowerCase().includes(q) ||
					u.department.toLowerCase().includes(q)
			);
		}
		return list;
	}, [users, searchTerm, roleFilter]);

	const handleInvite = () => {
		if (!form.name.trim() || !form.email.trim()) {
			toast.error("Name and email are required.");
			return;
		}
		setUsers((prev) => [
			{
				id: `usr_${String(prev.length + 1).padStart(3, "0")}`,
				...form,
				status: "Invited",
				lastActive: "—",
			},
			...prev,
		]);
		toast.success(`Invitation sent to ${form.email}`);
		setModalOpen(false);
		setForm({ name: "", email: "", role: "Member", department: "Sales" });
	};

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">Users</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Organization directory — roles, departments, and access status.
					</p>
				</div>
				<Button onClick={() => setModalOpen(true)}>
					<Plus className="h-4 w-4" />
					Invite user
				</Button>
			</div>

			<Card>
				<CardContent className="space-y-4 p-6">
					<div className="flex flex-wrap gap-3">
						<div className="relative max-w-sm flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search users…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<FormSelect
							value={roleFilter}
							onChange={(e) => setRoleFilter(e.target.value)}
							options={["All", "Admin", "Manager", "Member", "Viewer"]}
							className="w-36"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Department</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Last active</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((user) => (
								<TableRow key={user.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
												{getInitials(user.name)}
											</div>
											<div>
												<p className="font-medium text-foreground">{user.name}</p>
												<p className="text-xs text-muted-foreground">{user.email}</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="secondary" className="gap-1">
											{user.role === "Admin" ? <Shield className="h-3 w-3" /> : <UserCircle className="h-3 w-3" />}
											{user.role}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">{user.department}</TableCell>
									<TableCell>
										<Badge variant={user.status === "Active" ? "default" : user.status === "Suspended" ? "destructive" : "outline"}>
											{user.status}
										</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<FormModal open={modalOpen} onClose={() => setModalOpen(false)} title="Invite user" onSubmit={handleInvite}>
				<FormField label="Full name" htmlFor="user-name" required>
					<Input id="user-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
				</FormField>
				<FormField label="Email" htmlFor="user-email" required>
					<Input id="user-email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
				</FormField>
				<FormField label="Role" htmlFor="user-role">
					<FormSelect id="user-role" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} options={["Admin", "Manager", "Member", "Viewer"]} />
				</FormField>
				<FormField label="Department" htmlFor="user-dept">
					<Input id="user-dept" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
				</FormField>
			</FormModal>
		</div>
	);
};

export default Users;
