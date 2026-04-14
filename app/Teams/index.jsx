import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
	Search,
	Plus,
	ChevronDown,
	X,
	Shield,
	UserCircle,
	Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

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

const initialMembers = [
	{
		id: "1",
		name: "John Doe",
		email: "john@doe.com",
		role: "Admin",
		status: "Active",
		joinedAt: "2024-01-10",
		image: "/people/person-1.png",
	},
	{
		id: "2",
		name: "Sarah Chen",
		email: "sarah.chen@company.com",
		role: "Member",
		status: "Active",
		joinedAt: "2024-03-22",
		image: "/people/person-2.png",
	},
	{
		id: "3",
		name: "Marcus Webb",
		email: "marcus@company.com",
		role: "Member",
		status: "Invited",
		joinedAt: "2025-11-02",
		image: "/people/person-3.png",
	},
	{
		id: "4",
		name: "Elena Rossi",
		email: "elena@company.com",
		role: "Viewer",
		status: "Active",
		joinedAt: "2025-01-15",
		image: "/people/person-4.png",
	},
];

const Teams = () => {
	const { colors, scheme } = useTheme();
	const [members, setMembers] = useState(initialMembers);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [filterOpen, setFilterOpen] = useState(false);
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

	const handleAddMember = (e) => {
		e.preventDefault();
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
		<div className={`${colors.background} min-h-screen transition-colors pb-10`}>
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1 className={`text-2xl font-bold tracking-tight ${colors.foreground}`}>
						Teams
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Invite colleagues and manage access to your workspace
					</p>
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
				>
					<div
						className={`flex flex-col gap-4 px-4 md:px-6 py-4 border-b ${colors.border}`}
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<button
								type="button"
								onClick={() => setAddOpen(true)}
								className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover} transition-colors shrink-0`}
							>
								<Plus className="w-4 h-4" />
								Add new member
							</button>
							<div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1 sm:justify-end min-w-0">
								<div
									className={`flex items-center gap-2 border ${colors.border} rounded-xl px-3 py-2 ${colors.secondary} min-w-0 flex-1 sm:max-w-xs`}
								>
									<Search className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
									<input
										type="search"
										placeholder="Search members..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className={`bg-transparent outline-none text-sm flex-1 min-w-0 ${colors.foreground} placeholder:${colors.textTertiary}`}
									/>
								</div>
								<div className="relative shrink-0">
									<button
										type="button"
										onClick={() => setFilterOpen(!filterOpen)}
										className={`flex items-center justify-between gap-2 w-full sm:w-44 px-3 py-2 rounded-xl border ${colors.border} ${colors.secondary} text-sm ${colors.foreground} ${colors.hoverSecondary} transition-colors`}
									>
										<span className="truncate">{currentRoleLabel}</span>
										<ChevronDown
											className={`w-4 h-4 shrink-0 ${colors.textMuted} ${filterOpen ? "rotate-180" : ""} transition-transform`}
										/>
									</button>
									{filterOpen && (
										<>
											<button
												type="button"
												className="fixed inset-0 z-10 cursor-default"
												aria-label="Close menu"
												onClick={() => setFilterOpen(false)}
											/>
											<div
												className={`absolute right-0 mt-1 z-20 min-w-full py-1 rounded-xl border ${colors.border} ${colors.card} ${colors.shadow}`}
											>
												{ROLE_OPTIONS.map((opt) => (
													<button
														key={opt.value}
														type="button"
														onClick={() => {
															setRoleFilter(opt.value);
															setFilterOpen(false);
														}}
														className={`w-full text-left px-3 py-2 text-sm ${colors.hoverSecondary} ${colors.foreground}`}
													>
														{opt.label}
													</button>
												))}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className={`border-b ${colors.border} ${colors.secondary}`}>
									<th
										className={`text-left font-semibold px-4 md:px-6 py-3 ${colors.textSecondary}`}
									>
										Member
									</th>
									<th
										className={`text-left font-semibold px-4 py-3 ${colors.textSecondary} hidden md:table-cell`}
									>
										Email
									</th>
									<th
										className={`text-left font-semibold px-4 py-3 ${colors.textSecondary}`}
									>
										Role
									</th>
									<th
										className={`text-left font-semibold px-4 py-3 ${colors.textSecondary}`}
									>
										Status
									</th>
									<th
										className={`text-left font-semibold px-4 md:px-6 py-3 ${colors.textSecondary} hidden sm:table-cell`}
									>
										Joined
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredMembers.length === 0 ? (
									<tr>
										<td
											colSpan={5}
											className={`px-6 py-12 text-center ${colors.mutedForeground}`}
										>
											No team members match your filters.
										</td>
									</tr>
								) : (
									filteredMembers.map((m) => {
										const RoleIcon = ROLE_ICONS[m.role] || UserCircle;
										const statusActive = m.status === "Active";
										return (
											<tr
												key={m.id}
												className={`border-b ${colors.border} ${colors.hoverSecondary} transition-colors`}
											>
												<td className="px-4 md:px-6 py-3">
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
												</td>
												<td
													className={`px-4 py-3 ${colors.textSecondary} hidden md:table-cell max-w-[200px] truncate`}
												>
													{m.email}
												</td>
												<td className="px-4 py-3">
													<span
														className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-xl text-xs font-medium ${colors.secondary} ${colors.foreground}`}
													>
														<RoleIcon className="w-3.5 h-3.5" />
														{m.role}
													</span>
												</td>
												<td className="px-4 py-3">
													<span
														className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
															statusActive
																? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
																: "bg-amber-500/15 text-amber-800 dark:text-amber-200"
														}`}
													>
														{m.status}
													</span>
												</td>
												<td
													className={`px-4 md:px-6 py-3 ${colors.textSecondary} hidden sm:table-cell whitespace-nowrap`}
												>
													{m.joinedAt}
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{addOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
					<div
						className={`w-full max-w-md rounded-xl border ${colors.border} ${colors.card} ${colors.shadow}`}
						role="dialog"
						aria-modal="true"
						aria-labelledby="add-member-title"
					>
						<div
							className={`flex items-center justify-between px-5 py-4 border-b ${colors.border}`}
						>
							<h2
								id="add-member-title"
								className={`text-lg font-semibold ${colors.foreground}`}
							>
								Add team member
							</h2>
							<button
								type="button"
								onClick={() => setAddOpen(false)}
								className={`p-1 rounded-xl ${colors.hoverSecondary} ${colors.mutedForeground}`}
								aria-label="Close"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						<form onSubmit={handleAddMember} className="p-5 space-y-4">
							<div>
								<label
									htmlFor="tm-name"
									className={`block text-sm font-medium mb-1.5 ${colors.foreground}`}
								>
									Full name
								</label>
								<input
									id="tm-name"
									value={form.name}
									onChange={(e) =>
										setForm((f) => ({ ...f, name: e.target.value }))
									}
									className={`w-full px-3 py-2 rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} text-sm ${getFocusRingClass()}`}
									placeholder="Jane Doe"
								/>
							</div>
							<div>
								<label
									htmlFor="tm-email"
									className={`block text-sm font-medium mb-1.5 ${colors.foreground}`}
								>
									Email
								</label>
								<input
									id="tm-email"
									type="email"
									value={form.email}
									onChange={(e) =>
										setForm((f) => ({ ...f, email: e.target.value }))
									}
									className={`w-full px-3 py-2 rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} text-sm ${getFocusRingClass()}`}
									placeholder="jane@company.com"
								/>
							</div>
							<div>
								<label
									htmlFor="tm-role"
									className={`block text-sm font-medium mb-1.5 ${colors.foreground}`}
								>
									Role
								</label>
								<select
									id="tm-role"
									value={form.role}
									onChange={(e) =>
										setForm((f) => ({ ...f, role: e.target.value }))
									}
									className={`w-full px-3 py-2 rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} text-sm ${getFocusRingClass()}`}
								>
									<option value="Admin">Admin</option>
									<option value="Member">Member</option>
									<option value="Viewer">Viewer</option>
								</select>
							</div>
							<div className="flex justify-end gap-2 pt-2">
								<button
									type="button"
									onClick={() => setAddOpen(false)}
									className={`px-4 py-2 rounded-xl text-sm font-medium border ${colors.border} ${colors.secondary} ${colors.foreground} ${colors.hoverSecondary}`}
								>
									Cancel
								</button>
								<button
									type="submit"
									className={`px-4 py-2 rounded-xl text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
								>
									Add member
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Teams;
