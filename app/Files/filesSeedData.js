export const FILE_CATEGORIES = [
	{
		id: "documents",
		label: "Documents",
		count: 1390,
		usedLabel: "2.1 GB used",
		percent: 35,
		color: "blue",
		icon: "FileText",
	},
	{
		id: "images",
		label: "Images",
		count: 842,
		usedLabel: "1.4 GB used",
		percent: 28,
		color: "green",
		icon: "Image",
	},
	{
		id: "videos",
		label: "Videos",
		count: 126,
		usedLabel: "890 MB used",
		percent: 18,
		color: "red",
		icon: "Video",
	},
	{
		id: "others",
		label: "Others",
		count: 312,
		usedLabel: "420 MB used",
		percent: 12,
		color: "yellow",
		icon: "File",
	},
];

export const FILE_FOLDERS = [
	{
		id: "fld_documents",
		name: "Documents",
		itemCount: 1390,
		lastUpdate: "Apr 15, 2025",
		starred: true,
	},
	{
		id: "fld_images",
		name: "Images",
		itemCount: 842,
		lastUpdate: "Apr 14, 2025",
		starred: false,
	},
	{
		id: "fld_downloads",
		name: "Downloads",
		itemCount: 218,
		lastUpdate: "Apr 12, 2025",
		starred: false,
	},
];

export const STORAGE_SUMMARY = {
	usedGb: 1.8,
	totalGb: 3,
	label: "Storage Space Used",
	subtitle: "See your remaining file storage.",
};

export const MONTHLY_TRANSFER = [
	{ month: "Jan", desktop: 42, mobile: 28 },
	{ month: "Feb", desktop: 38, mobile: 32 },
	{ month: "Mar", desktop: 55, mobile: 41 },
	{ month: "Apr", desktop: 48, mobile: 36 },
	{ month: "May", desktop: 62, mobile: 44 },
	{ month: "Jun", desktop: 58, mobile: 52 },
	{ month: "Jul", desktop: 71, mobile: 48 },
	{ month: "Aug", desktop: 65, mobile: 55 },
	{ month: "Sep", desktop: 54, mobile: 42 },
	{ month: "Oct", desktop: 60, mobile: 38 },
	{ month: "Nov", desktop: 72, mobile: 46 },
	{ month: "Dec", desktop: 68, mobile: 50 },
];

export const INITIAL_FILES = [
	{
		id: "file_001",
		name: "Q2-Sales-Proposal.docx",
		size: "2.38 MB",
		sizeBytes: 2495616,
		category: "documents",
		folder: "Documents",
		type: "docx",
		uploadDate: "Apr 15, 2025",
		uploadedBy: "Sarah Chen",
		description: "Enterprise sales proposal for Q2 pipeline review.",
	},
	{
		id: "file_002",
		name: "Product-Hero-Banner.png",
		size: "1.12 MB",
		sizeBytes: 1174405,
		category: "images",
		folder: "Images",
		type: "png",
		uploadDate: "Apr 14, 2025",
		uploadedBy: "Marcus Webb",
		description: "Landing page hero asset for marketing campaign.",
	},
	{
		id: "file_003",
		name: "Onboarding-Walkthrough.mp4",
		size: "48.6 MB",
		sizeBytes: 50960793,
		category: "videos",
		folder: "Downloads",
		type: "mp4",
		uploadDate: "Apr 13, 2025",
		uploadedBy: "John Doe",
		description: "Customer onboarding screen recording.",
	},
	{
		id: "file_004",
		name: "Invoice-Template.pdf",
		size: "540 KB",
		sizeBytes: 552960,
		category: "documents",
		folder: "Documents",
		type: "pdf",
		uploadDate: "Apr 12, 2025",
		uploadedBy: "Elena Rossi",
		description: "Standard invoice PDF template for finance team.",
	},
	{
		id: "file_005",
		name: "Team-Offsite-2025.jpg",
		size: "3.84 MB",
		sizeBytes: 4026531,
		category: "images",
		folder: "Images",
		type: "jpg",
		uploadDate: "Apr 11, 2025",
		uploadedBy: "Jordan Lee",
		description: "Team offsite photo album cover.",
	},
	{
		id: "file_006",
		name: "API-Integration-Notes.zip",
		size: "890 KB",
		sizeBytes: 911360,
		category: "others",
		folder: "Downloads",
		type: "zip",
		uploadDate: "Apr 10, 2025",
		uploadedBy: "Alex Kim",
		description: "Archived integration setup notes and Postman collections.",
	},
];

export function findFile(id) {
	return INITIAL_FILES.find((f) => f.id === id) ?? null;
}

export const CATEGORY_OPTIONS = ["documents", "images", "videos", "others"];
export const FOLDER_OPTIONS = ["Documents", "Images", "Downloads"];
