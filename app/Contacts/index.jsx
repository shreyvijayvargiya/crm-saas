import React, { useState } from "react";
import {
	Users,
	PenIcon,
	Trash,
	X,
	Search,
	PlusCircle,
	ChevronUp,
	ChevronDown,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Contacts = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const [contacts, setContacts] = useState([
		{
			id: "201",
			name: "John Doe",
			email: "john@startup.com",
			phone: "123-456-7890",
			company: "Startup Inc.",
			createdAt: "2024-06-25",
			image: "./people/person-1.png",
			emails: [
				{
					subject: "Follow-Up",
					body: "Hi John, let’s schedule a call!",
					date: "2024-06-25",
				},
			],
		},
		{
			id: "202",
			name: "Jane Smith",
			email: "jane@agency.co",
			phone: "234-567-8901",
			company: "Agency Co.",
			createdAt: "2024-06-24",
			image: "./people/person-2.png",
			emails: [
				{
					subject: "Introduction",
					body: "Hi Jane, I hope you are doing well!",
					date: "2024-06-24",
				},
			],
		},
		{
			id: "203",
			name: "Alice Johnson",
			email: "alice@company.com",
			phone: "345-678-9012",
			company: "Company LLC",
			createdAt: "2024-06-23",
			image: "./people/person-3.png",
			emails: [
				{
					subject: "Meeting Request",
					body: "Hi Alice, can we meet next week?",
					date: "2024-06-23",
				},
			],
		},
		{
			id: "204",
			name: "Bob Brown",
			email: "bob@startup.io",
			phone: "456-789-0123",
			company: "Startup LLC",
			createdAt: "2024-06-22",
			image: "./people/person-4.png",
			emails: [
				{
					subject: "Welcome",
					body: "Hi Bob, welcome to our platform!",
					date: "2024-06-22",
				},
			],
		},
		{
			id: "205",
			name: "Tech Corp",
			email: "contact@techcorp.com",
			phone: "567-890-1234",
			company: "Tech Corporation",
			createdAt: "2024-06-21",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Partnership Inquiry",
					body: "Hello, we are interested in a partnership.",
					date: "2024-06-21",
				},
			],
		},
		{
			id: "206",
			name: "Global Solutions",
			email: "info@globalsolutions.com",
			phone: "678-901-2345",
			company: "Global Solutions Inc.",
			createdAt: "2024-06-20",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Service Inquiry",
					body: "Hi, we would like to know more about your services.",
					date: "2024-06-20",
				},
			],
		},
		{
			id: "207",
			name: "Innovatech",
			email: "contact@innovatech.com",
			phone: "789-012-3456",
			company: "Innovatech LLC",
			createdAt: "2024-06-19",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Collaboration Proposal",
					body: "Dear Innovatech, we propose a collaboration.",
					date: "2024-06-19",
				},
			],
		},
		{
			id: "208",
			name: "GreenTech",
			email: "info@greentech.com",
			phone: "890-123-4567",
			company: "GreenTech Innovations",
			createdAt: "2024-06-18",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Sustainability Initiative",
					body: "Hello GreenTech, let's discuss sustainability initiatives.",
					date: "2024-06-18",
				},
			],
		},
		{
			id: "209",
			name: "Future Solutions",
			email: "contact@futuresolutions.com",
			phone: "901-234-5678",
			company: "Future Solutions Inc.",
			createdAt: "2024-06-17",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Project Collaboration",
					body: "Dear Future Solutions, we are interested in collaborating on a project.",
					date: "2024-06-17",
				},
			],
		},
		{
			id: "210",
			name: "Tech Innovators",
			email: "hello@techinnovators.com",
			phone: "012-345-6789",
			company: "Tech Innovators LLC",
			createdAt: "2024-06-16",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Innovation Summit",
					body: "Hi Tech Innovators, we would like to invite you to our innovation summit.",
					date: "2024-06-16",
				},
			],
		},
		{
			id: "211",
			name: "NextGen Solutions",
			email: "info@nextgensolutions.com",
			phone: "123-456-7891",
			company: "NextGen Solutions LLC",
			createdAt: "2024-06-15",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "New Opportunities",
					body: "Hello, we are exploring new opportunities together.",
					date: "2024-06-15",
				},
			],
		},
		{
			id: "212",
			name: "Synergy Corp",
			email: "contact@synergycorp.com",
			phone: "234-567-8902",
			company: "Synergy Corporation",
			createdAt: "2024-06-14",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Partnership Discussion",
					body: "Hi, let's discuss a potential partnership.",
					date: "2024-06-14",
				},
			],
		},
		{
			id: "213",
			name: "Visionary Tech",
			email: "info@visionarytech.com",
			phone: "345-678-9013",
			company: "Visionary Technologies",
			createdAt: "2024-06-13",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Tech Innovations",
					body: "Dear Visionary Tech, we are interested in your innovations.",
					date: "2024-06-13",
				},
			],
		},
		{
			id: "214",
			name: "Eco Solutions",
			email: "contact@ecosolutions.com",
			phone: "456-789-0124",
			company: "Eco Solutions LLC",
			createdAt: "2024-06-12",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Sustainability Projects",
					body: "Hello, we would like to collaborate on sustainability projects.",
					date: "2024-06-12",
				},
			],
		},
		{
			id: "215",
			name: "Innovative Minds",
			email: "info@innovativeminds.com",
			phone: "567-890-1235",
			company: "Innovative Minds LLC",
			createdAt: "2024-06-11",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Creative Collaboration",
					body: "Hi, we are looking for creative collaboration opportunities.",
					date: "2024-06-11",
				},
			],
		},
		{
			id: "216",
			name: "Tech Pioneers",
			email: "contact@techpioneers.com",
			phone: "678-901-2346",
			company: "Tech Pioneers LLC",
			createdAt: "2024-06-10",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Future Technologies",
					body: "Dear Tech Pioneers, let's discuss future technologies.",
					date: "2024-06-10",
				},
			],
		},
		{
			id: "217",
			name: "Global Innovators",
			email: "info@globalinnovators.com",
			phone: "789-012-3457",
			company: "Global Innovators LLC",
			createdAt: "2024-06-09",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Innovation Strategies",
					body: "Hello, we would like to discuss innovation strategies.",
					date: "2024-06-09",
				},
			],
		},
		{
			id: "218",
			name: "Future Vision",
			email: "contact@futurevision.com",
			phone: "890-123-4568",
			company: "Future Vision LLC",
			createdAt: "2024-06-08",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Visionary Projects",
					body: "Dear Future Vision, we are interested in your projects.",
					date: "2024-06-08",
				},
			],
		},
		{
			id: "219",
			name: "Next Level Tech",
			email: "info@nextleveltech.com",
			phone: "901-234-5679",
			company: "Next Level Technologies",
			createdAt: "2024-06-07",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Tech Advancements",
					body: "Hi, we would like to discuss tech advancements.",
					date: "2024-06-07",
				},
			],
		},
		{
			id: "220",
			name: "Innovative Solutions",
			email: "contact@innovativesolutions.com",
			phone: "012-345-6780",
			company: "Innovative Solutions LLC",
			createdAt: "2024-06-06",
			image: `./people/person-${Math.floor(Math.random() * 4) + 1}.png`,
			emails: [
				{
					subject: "Collaboration Opportunities",
					body: "Hello, we are looking for collaboration opportunities.",
					date: "2024-06-06",
				},
			],
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedContact, setSelectedContact] = useState(null);
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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

	const handleSelectContact = (contact) => {
		setSelectedContact(contact);
		setIsContactModalOpen(true);
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
		<div className={`p-6 ${colors.background} transition-colors`}>
			{/* Contacts Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				{/* Table Header */}
				<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b ${colors.border} gap-4`}
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
							className={`flex items-center ${colors.card} border ${colors.border} rounded-xl py-2 px-4 gap-3 ${colors.hoverSecondary} transition-all duration-100 ease-in`}
						>
							<Users className={`${scheme.primary}`} size={20} />
							<div>
								<p className={`text-xs ${colors.mutedForeground}`}>
									Total Contacts
								</p>
								<p className={`text-sm font-semibold ${colors.foreground}`}>
									{contacts.length}
								</p>
							</div>
						</div>
						{/* Search */}
						<div
							className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} w-full md:w-auto`}
						>
							<Search className={colors.textSecondary} size={18} />
							<input
								type="text"
								placeholder="Search contacts..."
								className={`outline-none flex-1 ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
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
										onClick={() => handleSelectContact(contact)}
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
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Edit"
												>
													<PenIcon size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
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
			{/* Contact Details Modal */}
			{isContactModalOpen && selectedContact && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={() => setIsContactModalOpen(false)}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-md w-full overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Contact Details
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									View contact information and details
								</p>
							</div>
							<button
								onClick={() => setIsContactModalOpen(false)}
								className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-6">
							<div className="flex flex-col items-center">
								<img
									src={selectedContact.image}
									alt={selectedContact.name}
									className="w-24 h-24 rounded-full border-4 border-zinc-200 mb-4"
								/>
								<h3 className={`text-xl font-semibold ${colors.foreground}`}>
									{selectedContact.name}
								</h3>
								<p className={`text-sm ${colors.textSecondary} mt-1`}>
									{selectedContact.company}
								</p>
							</div>

							<div className="space-y-4">
								<div>
									<p
										className={`text-xs font-medium ${colors.mutedForeground} mb-1`}
									>
										Email
									</p>
									<p className={`text-sm ${colors.foreground}`}>
										{selectedContact.email}
									</p>
								</div>
								<div>
									<p
										className={`text-xs font-medium ${colors.mutedForeground} mb-1`}
									>
										Phone
									</p>
									<p className={`text-sm ${colors.foreground}`}>
										{selectedContact.phone}
									</p>
								</div>
								<div>
									<p
										className={`text-xs font-medium ${colors.mutedForeground} mb-1`}
									>
										Company
									</p>
									<p className={`text-sm ${colors.foreground}`}>
										{selectedContact.company}
									</p>
								</div>
								<div>
									<p
										className={`text-xs font-medium ${colors.mutedForeground} mb-1`}
									>
										Created At
									</p>
									<p className={`text-sm ${colors.foreground}`}>
										{formatDate(selectedContact.createdAt)}
									</p>
								</div>
							</div>

							<div className={`border-t ${colors.border} pt-4`}>
								<p
									className={`text-xs font-medium ${colors.mutedForeground} mb-3`}
								>
									Social Media
								</p>
								<div className="flex items-center gap-3">
									<a
										href="#"
										className={`p-2 rounded-lg ${colors.hoverSecondary} transition-colors`}
										title="Facebook"
									>
										<FaFacebook className={`w-5 h-5 ${colors.textSecondary}`} />
									</a>
									<a
										href="#"
										className={`p-2 rounded-lg ${colors.hoverSecondary} transition-colors`}
										title="Twitter"
									>
										<BsTwitterX className={`w-5 h-5 ${colors.textSecondary}`} />
									</a>
									<a
										href="#"
										className={`p-2 rounded-lg ${colors.hoverSecondary} transition-colors`}
										title="LinkedIn"
									>
										<BsLinkedin className={`w-5 h-5 ${colors.textSecondary}`} />
									</a>
								</div>
							</div>
						</div>

						{/* Modal Footer */}
						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								onClick={() => setIsContactModalOpen(false)}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
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
