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

const Contacts = () => {
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
		<div className="p-6">
			<p className="mb-4">Recent contacts</p>
			<div className="flex justify-between items-center flex-wrap">
				<div className="flex gap-2 items-center my-2 flex-wrap">
					<div className="flex hover:bg-gray-50 rounded px-2 py-1 items-center group border border-gray-100">
						<Search className="text-gray-800 mx-2" size={16} />{" "}
						<input
							type="text"
							placeholder="Search..."
							className="outline-none focus:outline-none group-hover:bg-gray-50"
							value={searchTerm}
							onChange={handleSearch}
						/>
					</div>
					<button
						onClick={() => setIsAddContactModalOpen(true)}
						className="flex items-center bg-gray-800 hover:bg-black hover:px-4 transition-all duration-100 ease-in text-white px-2 py-1 rounded"
					>
						<PlusCircle className="mr-1" size={16} />
						Add Contact
					</button>
				</div>
				<div className="flex items-center mb-4 gap-2">
					<div className="flex items-center bg-white border border-gray-100 rounded-xl py-2 px-6 gap-4 hover:bg-gray-50 hover:px-8 transition-all duration-100 ease-in order-1">
						<Users className="text-blue-500" size={20} />
						<span className="">{contacts.length} Total Contacts</span>
					</div>
				</div>
			</div>
			<div className="overflow-x-auto hidescrollbar">
				<table className="min-w-full bg-white border">
					<thead>
						<tr className="py-2 px-2 text-gray-800 text-sm">
							<th
								className="py-2 px-2 border-b text-left cursor-pointer"
								onClick={() => handleSort("name")}
							>
								Name
								{sortConfig?.key === "name" &&
									(sortConfig.direction === "ascending" ? (
										<ChevronUp size={16} className="inline ml-1" />
									) : (
										<ChevronDown size={16} className="inline ml-1" />
									))}
							</th>
							<th
								className="py-2 px-2 border-b text-left cursor-pointer"
								onClick={() => handleSort("email")}
							>
								Email
								{sortConfig?.key === "email" &&
									(sortConfig.direction === "ascending" ? (
										<ChevronUp size={16} className="inline ml-1" />
									) : (
										<ChevronDown size={16} className="inline ml-1" />
									))}
							</th>
							<th className="py-2 px-2 border-b text-left">Phone</th>
							<th
								className="py-2 px-2 border-b text-left cursor-pointer"
								onClick={() => handleSort("company")}
							>
								Company
								{sortConfig?.key === "company" &&
									(sortConfig.direction === "ascending" ? (
										<ChevronUp size={16} className="inline ml-1" />
									) : (
										<ChevronDown size={16} className="inline ml-1" />
									))}
							</th>
							<th
								className="py-2 px-2 border-b text-left cursor-pointer"
								onClick={() => handleSort("createdAt")}
							>
								Created At
								{sortConfig?.key === "createdAt" &&
									(sortConfig.direction === "ascending" ? (
										<ChevronUp size={16} className="inline ml-1" />
									) : (
										<ChevronDown size={16} className="inline ml-1" />
									))}
							</th>
							<th className="py-2 px-2 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredContacts.map((contact) => (
							<tr
								key={contact.id}
								className="hover:bg-gray-50 truncate text-sm"
								onClick={() => handleSelectContact(contact)}
							>
								<td className="py-2 px-2 flex items-center">
									<img
										src={contact.image}
										alt={contact.name}
										className="w-8 h-8 rounded-full mr-2"
									/>
									<span className="">{contact.name}</span>
								</td>
								<td className="py-2 px-4 ">{contact.email}</td>
								<td className="py-2 px-4 ">{contact.phone}</td>
								<td className="py-2 px-4 ">{contact.company}</td>
								<td className="py-2 px-4 ">{formatDate(contact.createdAt)}</td>
								<td className="md:py-2 px-4 sm:py-6">
									<div className="flex gap-2">
										<PenIcon size={18} />
										<Trash size={18} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isContactModalOpen && selectedContact && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg w-96">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold">Contact Details</h2>
							<button
								onClick={() => setIsContactModalOpen(false)}
								className="hover:bg-gray-50 text-gray-800 p-1 rounded"
							>
								<X className="inline" size={16} />
							</button>
						</div>
						<img
							src={selectedContact.image}
							alt={selectedContact.name}
							className="w-24 h-24 rounded-full mb-4"
						/>
						<p className="mb-2 text-lg font-semibold">
							Name: {selectedContact.name}
						</p>
						<p className="mb-2">Email: {selectedContact.email}</p>
						<p className="mb-2">Phone: {selectedContact.phone}</p>
						<p className="mb-2">Company: {selectedContact.company}</p>
						<p className="mb-2">
							Created At: {formatDate(selectedContact.createdAt)}
						</p>
						<div className="flex justify-start my-4">
							<a href="#" className="mx-2">
								<FaFacebook className="w-6 h-6" />
							</a>
							<a href="#" className="mx-2">
								<BsTwitterX className="w-6 h-6" />
							</a>
							<a href="#" className="mx-2">
								<BsLinkedin className="w-6 h-6" />
							</a>
						</div>
					</div>
				</div>
			)}
			{isAddContactModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto">
						<div className="flex items-center mb-4">
							<p className="flex-grow">Add New Contact</p>
							<button
								onClick={() => setIsAddContactModalOpen(false)}
								className="hover:bg-gray-50 text-gray-800 p-1 rounded"
							>
								<X className="inline mr-1" size={16} />
							</button>
						</div>
						<input
							type="text"
							placeholder="Name"
							value={newContact.name}
							onChange={(e) =>
								setNewContact({ ...newContact, name: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="email"
							placeholder="Email"
							value={newContact.email}
							onChange={(e) =>
								setNewContact({ ...newContact, email: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Phone"
							value={newContact.phone}
							onChange={(e) =>
								setNewContact({ ...newContact, phone: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Company"
							value={newContact.company}
							onChange={(e) =>
								setNewContact({ ...newContact, company: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<button
							onClick={handleAddContact}
							className="flex items-center bg-gray-800 hover:bg-black hover:px-4 transition-all duration-100 ease-in text-white px-2 py-1 rounded"
						>
							<PlusCircle className="mr-1" size={16} />
							Add Contact
						</button>
					</div>
				</div>
			)}
			<Pagination />
		</div>
	);
};

export default Contacts;
