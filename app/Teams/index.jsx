import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
	Search,
	Plus,
	ChevronDown,
	Shield,
	UserCircle,
	Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

import { useCrmData } from "../../utils/CrmDataContext";
const ROLE_OPTIONS = [
	{ value: "all", label: "All roles" },
	{ value: "Admin", label: "Admin" },
	{ value: "Member", label: "Member" },
	{ value: "Viewer", label: "Viewer" },
];

const ROLE_ICONS = {
	Admin: Shield,
	Member: UserCircle,
	Viewer: Eye,
};

const Teams = () => {
	const { colors } = useTheme();
	const { teamMembers: members, setTeamMembers: setMembers } = useCrmData();
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [addOpen, setAddOpen] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		role: "Member",
	});

	const filteredMembers = useMemo(() => {
		const q = searchTerm.trim().toLowerCase();
		return members.filter((m) => {
			const matchesRole = roleFilter === "all" || m.role === roleFilter;
			if (!matchesRole) return false;
			if (!q) return true;
			return (
				m.name.toLowerCase().includes(q) ||
				m.email.toLowerCase().includes(q) ||
				m.role.toLowerCase().includes(q) ||
				m.status.toLowerCase().includes(q)
			);
		});
	}, [members, searchTerm, roleFilter]);

	const handleAddMember = () => {
		if (!form.name.trim() || !form.email.trim()) {
			toast.error("Name and email are required.");
			return;
		}
		const id = String(Date.now());
		setMembers((prev) => [
			...prev,
			{
				id,
				name: form.name.trim(),
				email: form.email.trim(),
				role: form.role,
				status: "Invited",
				joinedAt: new Date().toISOString().slice(0, 10),
				image: `/people/person-${(prev.length % 4) + 1}.png`,
			},
		]);
		toast.success("Team member added.");
		setForm({ name: "", email: "", role: "Member" });
		setAddOpen(false);
	};

	const currentRoleLabel =
		ROLE_OPTIONS.find((r) => r.value === roleFilter)?.label ?? "All roles";

	return (
		<div className={`min-h-screen transition-all duration-100 ease-in pb-10`}>
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1 className={`text-2xl font-bold tracking-tight ${colors.foreground}`}>
						Teams
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Invite colleagues and manage access to your workspace
					</p>
				</div>

				<Card className="overflow-hidden">
					<div
						className={`flex flex-col gap-4 px-4 md:px-6 py-4 border-b ${colors.border}`}
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<Button type="button" onClick={() => setAddOpen(true)} className="shrink-0">
								<Plus className="w-4 h-4" />
								Add new member
							</Button>
							<div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1 sm:justify-end min-w-0">
								<div className="relative flex-1 sm:max-w-xs min-w-0">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
									<Input
										type="search"
										placeholder="Search members..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-9"
									/>
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											type="button"
											variant="outline"
											className="w-full sm:w-44 justify-between shrink-0"
										>
											<span className="truncate">{currentRoleLabel}</span>
											<ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
										{ROLE_OPTIONS.map((opt) => (
											<DropdownMenuItem
												key={opt.value}
												onClick={() => setRoleFilter(opt.value)}
											>
												{opt.label}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>

					<Table className="w-full text-sm">
							<TableHeader>
								<TableRow className={`border-b ${colors.border} ${colors.secondary}`}>
									<TableHead
										className={`text-left font-semibold px-4 md:px-6 py-3 ${colors.textSecondary}`}
									>
										Member
									</TableHead>
									<TableHead
										className={`text-left font-semibold px-4 py-3 ${colors.textSecondary} hidden md:table-cell`}
									>
										Email
									</TableHead>
									<TableHead
										className={`text-left font-semibold px-4 py-3 ${colors.textSecondary}`}
									>
										Role
									</TableHead>
									<TableHead
										className={`text-left font-semibold px-4 py-3 ${colors.textSecondary}`}
									>
										Status
									</TableHead>
									<TableHead
										className={`text-left font-semibold px-4 md:px-6 py-3 ${colors.textSecondary} hidden sm:table-cell`}
									>
										Joined
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredMembers.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className={`px-6 py-12 text-center ${colors.mutedForeground}`}
										>
											No team members match your filters.
										</TableCell>
									</TableRow>
								) : (
									filteredMembers.map((m) => {
										const RoleIcon = ROLE_ICONS[m.role] || UserCircle;
										const statusActive = m.status === "Active";
										return (
											<TableRow
												key={m.id}
												className={`border-b ${colors.border} ${colors.hoverSecondary} transition-colors`}
											>
												<TableCell className="px-4 md:px-6 py-3">
													<div className="flex items-center gap-3 min-w-0">
														<div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-white dark:ring-zinc-800">
															<Image
																src={m.image}
																alt=""
																width={36}
																height={36}
																className="object-cover"
															/>
														</div>
														<div className="min-w-0">
															<span
																className={`font-medium truncate block ${colors.foreground}`}
															>
																{m.name}
															</span>
															<span
																className={`text-xs truncate block md:hidden ${colors.textMuted}`}
															>
																{m.email}
															</span>
														</div>
													</div>
												</TableCell>
												<TableCell
													className={`px-4 py-3 ${colors.textSecondary} hidden md:table-cell max-w-[200px] truncate`}
												>
													{m.email}
												</TableCell>
												<TableCell className="px-4 py-3">
													<Badge variant="secondary" className="gap-1.5">
														<RoleIcon className="w-3.5 h-3.5" />
														{m.role}
													</Badge>
												</TableCell>
												<TableCell className="px-4 py-3">
													<Badge
														variant="secondary"
														className={cn(
															statusActive
																? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-transparent"
																: "bg-amber-500/15 text-amber-800 dark:text-amber-200 border-transparent"
														)}
													>
														{m.status}
													</Badge>
												</TableCell>
												<TableCell
													className={`px-4 md:px-6 py-3 ${colors.textSecondary} hidden sm:table-cell whitespace-nowrap`}
												>
													{m.joinedAt}
												</TableCell>
											</TableRow>
										);
									})
								)}
							</TableBody>
						</Table>
				</Card>
			</div>

			<FormModal
				open={addOpen}
				onClose={() => setAddOpen(false)}
				onSubmit={handleAddMember}
				title="Add team member"
				saveLabel="Add member"
				maxWidth="max-w-md"
			>
				<FormField label="Full name" htmlFor="tm-name">
					<Input
						id="tm-name"
						value={form.name}
						onChange={(e) =>
							setForm((f) => ({ ...f, name: e.target.value }))
						}
						placeholder="Jane Doe"
					/>
				</FormField>
				<FormField label="Email" htmlFor="tm-email">
					<Input
						id="tm-email"
						type="email"
						value={form.email}
						onChange={(e) =>
							setForm((f) => ({ ...f, email: e.target.value }))
						}
						placeholder="jane@company.com"
					/>
				</FormField>
				<FormField label="Role" htmlFor="tm-role">
					<FormSelect
						id="tm-role"
						value={form.role}
						onChange={(e) =>
							setForm((f) => ({ ...f, role: e.target.value }))
						}
						options={["Admin", "Member", "Viewer"]}
					/>
				</FormField>
			</FormModal>
		</div>
	);
};

export default Teams;
