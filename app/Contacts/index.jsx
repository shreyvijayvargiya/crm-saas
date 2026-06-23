import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Users,
	PenIcon,
	Trash,
	X,
	Search,
	PlusCircle,
	ChevronUp,
	ChevronDown,
	Eye,
} from "lucide-react";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";
import { INITIAL_CONTACTS } from "../CRM/contactsSeedData";

const Contacts = () => {
	const router = useRouter();
	// Theme hook
	const { colorScheme, colors, scheme } = useTheme();

	const [contacts, setContacts] = useState(INITIAL_CONTACTS);

	const [searchTerm, setSearchTerm] = useState("");
	const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
	const [newContact, setNewContact] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
	});
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "ascending",
	});

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleAddContact = () => {
		setContacts((prevContacts) => [
			...prevContacts,
			{
				id: Date.now().toString(),
				...newContact,
				createdAt: new Date().toLocaleDateString(),
				image: "./people/default.png",
				emails: [],
			},
		]);
		setNewContact({ name: "", email: "", phone: "", company: "" });
		setIsAddContactModalOpen(false);
	};

	const handleSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const sortedContacts = [...contacts].sort((a, b) => {
		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === "ascending" ? 1 : -1;
		}
		return 0;
	});

	const filteredContacts = sortedContacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className={`p-6 ${colors.primaryBackground} transition-all duration-100 ease-in`}>
			{/* Table Header */}
			<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-4`}
				>
					<div className="flex-1">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Contacts
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your contacts
						</p>
					</div>
					<div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
						{/* Total Contacts Card */}
						<div
							className={`flex items-center ${colors.card} border ${colors.border} rounded-xl py-2 px-2 gap-2 transition-all duration-100 ease-in`}
						>
								<Users className={``} size={16} />
								<p className={`text-xs ${colors.mutedForeground}`}>
									Total Contacts
								</p>
								<p className={`text-sm font-semibold ${colors.foreground}`}>
									{contacts.length}
								</p>
						</div>
						{/* Search */}
						<div
							className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} w-full md:w-auto`}
						>
							<Search className={colors.textSecondary} size={18} />
							<input
								type="text"
								placeholder="Search contacts..."
								className={`outline-none flex-1 dark:bg-transparent placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
								name="search-contacts"
								value={searchTerm}
								onChange={handleSearch}
							/>
						</div>
						{/* Add Contact Button */}
						<button
							onClick={() => setIsAddContactModalOpen(true)}
							className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
						>
							<PlusCircle size={16} />
							Add Contact
						</button>
					</div>
				</div>
			{/* Contacts Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => handleSort("name")}
								>
									<div className="flex items-center gap-2">
										Name
										{sortConfig?.key === "name" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => handleSort("email")}
								>
									<div className="flex items-center gap-2">
										Email
										{sortConfig?.key === "email" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Phone
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => handleSort("company")}
								>
									<div className="flex items-center gap-2">
										Company
										{sortConfig?.key === "company" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => handleSort("createdAt")}
								>
									<div className="flex items-center gap-2">
										Created At
										{sortConfig?.key === "createdAt" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{filteredContacts.length === 0 ? (
								<tr>
									<td colSpan="6" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No contacts found</p>
									</td>
								</tr>
							) : (
								filteredContacts.map((contact) => (
									<tr
										key={contact.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/contacts/${contact.id}`)}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-3">
												<img
													src={contact.image}
													alt={contact.name}
													className="w-10 h-10 rounded-full border-2 border-zinc-200"
												/>
												<div
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{contact.name}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{contact.email}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{contact.phone}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{contact.company}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(contact.createdAt)}
											</div>
										</td>
										<td
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<div className="flex items-center gap-2">
												<Link href={`/contacts/${contact.id}`} passHref>
													<a
														className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors inline-flex`}
														title="View profile"
													>
														<Eye size={16} className={colors.textSecondary} />
													</a>
												</Link>
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Edit"
												>
													<PenIcon size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Delete"
												>
													<Trash size={16} className={colors.textSecondary} />
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
			{/* Add New Contact Modal */}
			{isAddContactModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={() => setIsAddContactModalOpen(false)}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-xl w-full overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Add New Contact
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									Create a new contact in your database
								</p>
							</div>
							<button
								onClick={() => setIsAddContactModalOpen(false)}
								className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-4">
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="Enter contact name"
									value={newContact.name}
									onChange={(e) =>
										setNewContact({ ...newContact, name: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Email <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									placeholder="contact@example.com"
									value={newContact.email}
									onChange={(e) =>
										setNewContact({ ...newContact, email: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Phone
								</label>
								<input
									type="text"
									placeholder="+1 (555) 123-4567"
									value={newContact.phone}
									onChange={(e) =>
										setNewContact({ ...newContact, phone: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Company
								</label>
								<input
									type="text"
									placeholder="Company name"
									value={newContact.company}
									onChange={(e) =>
										setNewContact({ ...newContact, company: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
						</div>

						{/* Modal Footer */}
						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								onClick={() => setIsAddContactModalOpen(false)}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								onClick={handleAddContact}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors flex items-center gap-2`}
							>
								<PlusCircle size={16} />
								Add Contact
							</button>
						</div>
					</div>
				</div>
			)}
			<Pagination />
		</div>
	);
};

export default Contacts;
