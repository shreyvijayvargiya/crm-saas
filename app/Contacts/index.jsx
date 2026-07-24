import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Users,
	PenIcon,
	Trash,
	Search,
	PlusCircle,
	ChevronUp,
	ChevronDown,
	Eye,
} from "lucide-react";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { INITIAL_CONTACTS } from "../CRM/contactsSeedData";
import { useCrmData } from "../../utils/CrmDataContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
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

const Contacts = () => {
	const router = useRouter();
	const { colors } = useTheme();

	const { contacts, setContacts } = useCrmData();

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

	const handleModalClose = () => {
		setIsAddContactModalOpen(false);
		setNewContact({ name: "", email: "", phone: "", company: "" });
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
							Customers
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Open a contact to see Stripe-shaped billing, subscriptions, and charges
						</p>
					</div>
					<div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
						{/* Total Contacts Card */}
						<Card className={cn("py-2 px-3 shadow-none")}>
							<div className="flex items-center gap-2">
								<Users size={16} />
								<p className={`text-xs ${colors.mutedForeground}`}>
									Total Contacts
								</p>
								<Badge variant="secondary" className="font-semibold">
									{contacts.length}
								</Badge>
							</div>
						</Card>
						{/* Search */}
						<div className="relative flex gap-2 items-center w-full md:w-auto">
							<Search
								size={18}
								className="absolute left-3 text-muted-foreground pointer-events-none"
							/>
							<Input
								type="text"
								placeholder="Search contacts..."
								name="search-contacts"
								className="pl-9"
								value={searchTerm}
								onChange={handleSearch}
							/>
						</div>
						{/* Add Contact Button */}
						<Button onClick={() => setIsAddContactModalOpen(true)}>
							<PlusCircle size={16} />
							Add Contact
						</Button>
					</div>
				</div>
			{/* Contacts Table - Improved */}
			<Card className="overflow-hidden my-4">
				

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Phone
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{filteredContacts.length === 0 ? (
								<TableRow>
									<TableCell colSpan="6" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No contacts found</p>
									</TableCell>
								</TableRow>
							) : (
								filteredContacts.map((contact) => (
									<TableRow
										key={contact.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/contacts/${contact.id}`)}
									>
										<TableCell className="px-6 py-4 whitespace-nowrap">
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
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{contact.email}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{contact.phone}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{contact.company}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(contact.createdAt)}
											</div>
										</TableCell>
										<TableCell
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													asChild
													title="View profile"
												>
													<Link href={`/contacts/${contact.id}`}>
														<a>
															<Eye size={16} />
														</a>
													</Link>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Edit"
												>
													<PenIcon size={16} />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Delete"
												>
													<Trash size={16} />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
			</Card>
			<FormModal
				open={isAddContactModalOpen}
				onClose={handleModalClose}
				title="Add New Contact"
				subtitle="Create a new contact in your database"
				onSubmit={handleAddContact}
				saveLabel="Add Contact"
			>
				<FormField label="Name" htmlFor="contact-name" required>
					<Input
						id="contact-name"
						type="text"
						placeholder="Enter contact name"
						value={newContact.name}
						onChange={(e) =>
							setNewContact({ ...newContact, name: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Email" htmlFor="contact-email" required>
					<Input
						id="contact-email"
						type="email"
						placeholder="contact@example.com"
						value={newContact.email}
						onChange={(e) =>
							setNewContact({ ...newContact, email: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Phone" htmlFor="contact-phone">
					<Input
						id="contact-phone"
						type="text"
						placeholder="+1 (555) 123-4567"
						value={newContact.phone}
						onChange={(e) =>
							setNewContact({ ...newContact, phone: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Company" htmlFor="contact-company">
					<Input
						id="contact-company"
						type="text"
						placeholder="Company name"
						value={newContact.company}
						onChange={(e) =>
							setNewContact({ ...newContact, company: e.target.value })
						}
					/>
				</FormField>
			</FormModal>
			<Pagination />
		</div>
	);
};

export default Contacts;
