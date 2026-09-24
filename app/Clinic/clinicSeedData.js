/** Seed for the India clinic appointment CRM demo — in-memory only. */

export const CLINIC_META = {
	name: "CarePoint Clinic",
	city: "Pune",
	phone: "+91 20 4123 7788",
};

export const DOCTORS = [
	{ id: "doc-1", name: "Dr. Ananya Reddy", specialty: "General Physician", room: "1" },
	{ id: "doc-2", name: "Dr. Vikram Shah", specialty: "Pediatrics", room: "2" },
	{ id: "doc-3", name: "Dr. Meera Iyer", specialty: "Dermatology", room: "3" },
];

export const DRUG_CATALOG = [
	{ id: "d1", name: "Dolo 650", generic: "Paracetamol", strength: "650 mg", form: "Tablet" },
	{ id: "d2", name: "Azithral 500", generic: "Azithromycin", strength: "500 mg", form: "Tablet" },
	{ id: "d3", name: "Pantocid", generic: "Pantoprazole", strength: "40 mg", form: "Tablet" },
	{ id: "d4", name: "Augmentin 625", generic: "Amoxicillin + Clavulanate", strength: "625 mg", form: "Tablet" },
	{ id: "d5", name: "Cetrizine", generic: "Cetirizine", strength: "10 mg", form: "Tablet" },
	{ id: "d6", name: "Shelcal 500", generic: "Calcium + Vitamin D3", strength: "500 mg", form: "Tablet" },
	{ id: "d7", name: "Asthalin inhaler", generic: "Salbutamol", strength: "100 mcg", form: "Inhaler" },
	{ id: "d8", name: "Crocin Advance", generic: "Paracetamol", strength: "500 mg", form: "Tablet" },
	{ id: "d9", name: "Metformin 500", generic: "Metformin", strength: "500 mg", form: "Tablet" },
	{ id: "d10", name: "Amlodipine 5", generic: "Amlodipine", strength: "5 mg", form: "Tablet" },
	{ id: "d11", name: "ORS powder", generic: "Oral rehydration salts", strength: "21 g", form: "Sachet" },
	{ id: "d12", name: "Betadine gargle", generic: "Povidone iodine", strength: "2%", form: "Solution" },
];

export const APPOINTMENT_STATUSES = [
	"Booked",
	"Confirmed",
	"Waiting",
	"In consult",
	"Completed",
	"No-show",
	"Cancelled",
];

export const QUEUE_STATUSES = ["Waiting", "In consult", "Completed", "No-show"];

export const INITIAL_PATIENTS = [
	{
		id: "p1",
		name: "Priya Deshmukh",
		phone: "+91 98765 11001",
		age: 34,
		gender: "Female",
		city: "Kothrud, Pune",
		lastVisit: "2026-09-10",
		notes: "Seasonal allergy. Prefers WhatsApp updates.",
	},
	{
		id: "p2",
		name: "Rahul Patil",
		phone: "+91 98220 33421",
		age: 41,
		gender: "Male",
		city: "Baner, Pune",
		lastVisit: "2026-08-22",
		notes: "Hypertension follow-up.",
	},
	{
		id: "p3",
		name: "Aarav Kulkarni",
		phone: "+91 97654 88210",
		age: 7,
		gender: "Male",
		city: "Aundh, Pune",
		lastVisit: "2026-09-01",
		notes: "Pediatric — parent: Sneha Kulkarni.",
	},
	{
		id: "p4",
		name: "Fatima Shaikh",
		phone: "+91 90112 77890",
		age: 29,
		gender: "Female",
		city: "Camp, Pune",
		lastVisit: "2026-09-18",
		notes: "Dermatology consult for acne.",
	},
	{
		id: "p5",
		name: "Suresh Joshi",
		phone: "+91 98810 44567",
		age: 58,
		gender: "Male",
		city: "Hadapsar, Pune",
		lastVisit: "2026-07-14",
		notes: "Type 2 diabetes. Needs Rx refill.",
	},
	{
		id: "p6",
		name: "Neha Bhandari",
		phone: "+91 99224 10088",
		age: 26,
		gender: "Female",
		city: "Viman Nagar, Pune",
		lastVisit: "2026-09-20",
		notes: "First visit — fever and cough.",
	},
];

export const INITIAL_APPOINTMENTS = [
	{
		id: "a1",
		patientId: "p1",
		doctorId: "doc-1",
		date: "2026-09-24",
		slot: "09:30",
		reason: "Allergy follow-up",
		status: "Waiting",
		token: 12,
		fee: 600,
		paid: true,
		upiRef: "UPI240924001",
		channel: "Online",
	},
	{
		id: "a2",
		patientId: "p3",
		doctorId: "doc-2",
		date: "2026-09-24",
		slot: "10:00",
		reason: "Vaccination + fever",
		status: "In consult",
		token: 13,
		fee: 800,
		paid: true,
		upiRef: "UPI240924002",
		channel: "Walk-in",
	},
	{
		id: "a3",
		patientId: "p6",
		doctorId: "doc-1",
		date: "2026-09-24",
		slot: "10:30",
		reason: "Fever and cough",
		status: "Confirmed",
		token: 14,
		fee: 600,
		paid: false,
		upiRef: "",
		channel: "WhatsApp",
	},
	{
		id: "a4",
		patientId: "p4",
		doctorId: "doc-3",
		date: "2026-09-24",
		slot: "11:00",
		reason: "Acne review",
		status: "Booked",
		token: 15,
		fee: 900,
		paid: true,
		upiRef: "UPI240924003",
		channel: "Online",
	},
	{
		id: "a5",
		patientId: "p2",
		doctorId: "doc-1",
		date: "2026-09-24",
		slot: "11:30",
		reason: "BP check",
		status: "No-show",
		token: 11,
		fee: 600,
		paid: false,
		upiRef: "",
		channel: "Phone",
	},
	{
		id: "a6",
		patientId: "p5",
		doctorId: "doc-1",
		date: "2026-09-25",
		slot: "09:00",
		reason: "Diabetes review + Rx",
		status: "Confirmed",
		token: 1,
		fee: 700,
		paid: true,
		upiRef: "UPI240923019",
		channel: "Online",
	},
	{
		id: "a7",
		patientId: "p2",
		doctorId: "doc-1",
		date: "2026-09-18",
		slot: "16:00",
		reason: "Hypertension",
		status: "Completed",
		token: 22,
		fee: 600,
		paid: true,
		upiRef: "UPI240918008",
		channel: "Walk-in",
	},
];

export const INITIAL_PRESCRIPTIONS = [
	{
		id: "rx1",
		patientId: "p2",
		doctorId: "doc-1",
		appointmentId: "a7",
		date: "2026-09-18",
		diagnosis: "Essential hypertension",
		status: "Issued",
		lines: [
			{ drugId: "d10", dose: "1-0-0", days: 30, notes: "After breakfast" },
			{ drugId: "d8", dose: "SOS", days: 5, notes: "If headache" },
		],
	},
	{
		id: "rx2",
		patientId: "p1",
		doctorId: "doc-1",
		appointmentId: "a1",
		date: "2026-09-10",
		diagnosis: "Allergic rhinitis",
		status: "Issued",
		lines: [{ drugId: "d5", dose: "0-0-1", days: 14, notes: "At night" }],
	},
];

export const INITIAL_PAYMENTS = [
	{
		id: "pay1",
		appointmentId: "a1",
		patientId: "p1",
		amount: 600,
		method: "UPI",
		status: "Paid",
		at: "2026-09-24 09:12",
		upiId: "priya@okaxis",
	},
	{
		id: "pay2",
		appointmentId: "a2",
		patientId: "p3",
		amount: 800,
		method: "UPI",
		status: "Paid",
		at: "2026-09-24 09:48",
		upiId: "sneha.k@ybl",
	},
	{
		id: "pay3",
		appointmentId: "a4",
		patientId: "p4",
		amount: 900,
		method: "UPI",
		status: "Paid",
		at: "2026-09-23 21:04",
		upiId: "fatima@ibl",
	},
	{
		id: "pay4",
		appointmentId: "a3",
		patientId: "p6",
		amount: 600,
		method: "UPI",
		status: "Pending",
		at: "2026-09-24 08:02",
		upiId: "neha@paytm",
	},
	{
		id: "pay5",
		appointmentId: "a5",
		patientId: "p2",
		amount: 600,
		method: "UPI",
		status: "Failed",
		at: "2026-09-24 08:40",
		upiId: "rahul.patil@oksbi",
	},
];

export const INITIAL_FOLLOW_UPS = [
	{
		id: "f1",
		patientId: "p2",
		due: "2026-09-25",
		channel: "WhatsApp",
		message: "Rahul, Dr. Reddy wants a BP reading in 7 days. Reply 1 to book.",
		status: "Scheduled",
	},
	{
		id: "f2",
		patientId: "p5",
		due: "2026-09-25",
		channel: "WhatsApp",
		message: "Suresh, fasting sugar reminder before tomorrow’s 9am slot.",
		status: "Scheduled",
	},
	{
		id: "f3",
		patientId: "p1",
		due: "2026-09-24",
		channel: "WhatsApp",
		message: "Priya, you are token 12. Two patients ahead.",
		status: "Sent",
	},
	{
		id: "f4",
		patientId: "p4",
		due: "2026-10-08",
		channel: "SMS",
		message: "Acne review in 2 weeks with Dr. Iyer.",
		status: "Scheduled",
	},
];

export function inr(n) {
	return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export function appointmentStatusClass(status) {
	const map = {
		Booked: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
		Confirmed: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300",
		Waiting: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
		"In consult": "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
		Completed: "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
		"No-show": "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
		Cancelled: "border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500",
	};
	return map[status] || map.Booked;
}

export function paymentStatusClass(status) {
	if (status === "Paid") {
		return "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
	}
	if (status === "Pending") {
		return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300";
	}
	return "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300";
}
