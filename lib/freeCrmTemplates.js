/**
 * Free CRM templates catalog (AST-backed).
 * Slim vertical starters — full 60+ screen kit is on GitHub (MIT).
 */

import { getVerticalAstById, listVerticalAsts } from "../asts/crm-verticals";

/** Preview images in /public — add matching files anytime. */
const PREVIEW_BY_ID = {
	"clinic": "/screenshots-marketing-page/saas-crm-dashboard.png",
	"indie-stripe": "/inkgest-crm.png",
	freelancer: "/freelance-crm.png",
	agency: "/screenshots-marketing-page/saas-crm-leads.png",
	"content-creator": "/screenshots-marketing-page/saas-crm-scheduler.png",
	"digital-store": "/screenshots-marketing-page/saas-crm-sales.png",
	"ecommerce-cms": "/e-commerce-cms.png",
};

const GUIDE_BY_ID = {
	clinic: {
		headline: "Run OPD without a paper register",
		steps: [
			"Open /demo/template/clinic",
			"Walk Today → Live queue → Appointments",
			"Book a slot with mock UPI, issue an Rx from the drug catalog",
			"Mark a WhatsApp follow-up as sent",
			"Swap seed patients in app/Clinic/clinicSeedData.js",
		],
		customize: [
			"Rename CarePoint Clinic in CLINIC_META",
			"Add doctors and slots for your OPD hours",
			"Wire WhatsApp / UPI later — UI is already there",
		],
	},
	"indie-stripe": {
		headline: "Ship a Stripe-shaped billing admin",
		steps: [
			"Unzip and run npm install && npm run dev",
			"Open localhost — the CRM loads from pages/index.js",
			"Swap seed rows for your customers, plans, and charges",
			"Wire Stripe keys later using the Connect Stripe empty state in Settings patterns",
			"Rebrand colors in globals.css / Tailwind tokens",
		],
		customize: [
			"Edit SIDEBAR and SEED in pages/index.js",
			"Add columns to the table for MRR, plan, or past_due",
			"Point links at your real /api routes when you add a backend",
		],
	},
	freelancer: {
		headline: "Run clients, invoices, and tasks in one screen",
		steps: [
			"npm install && npm run dev",
			"Use the sidebar to jump Clients / Invoices / Payments / Tasks",
			"Replace seed clients with your real roster",
			"Export or hook invoices to PDF later",
		],
		customize: [
			"Rename Clients → whatever you call buyers",
			"Add a Calendar section using the same layout pattern",
			"Keep the ZIP small — extend pages/index.js before adding routes",
		],
	},
	agency: {
		headline: "Agency sales + delivery starter",
		steps: [
			"Install deps and start the Next.js app",
			"Walk Leads → Pipeline → Invoices → Projects in the sidebar",
			"Replace seed leads with your pipeline stages",
		],
		customize: [
			"Map stages to your agency process",
			"Add a Projects board section when you need delivery tracking",
		],
	},
	"content-creator": {
		headline: "Blogs, newsletters, and audience admin",
		steps: [
			"Run the template locally",
			"Use CMS / Analytics / Users nav groups",
			"Swap blog & newsletter seed rows for your content calendar",
		],
		customize: [
			"Hook the table to your CMS API or markdown folder",
			"Add subscriber counts from your email provider",
		],
	},
	"digital-store": {
		headline: "Digital products, orders, and payouts UI",
		steps: [
			"Start the app and open Products as home",
			"Browse Products → Orders → Invoices → Payments",
			"Replace seed SKUs with ebooks, PDFs, and icon packs",
		],
		customize: [
			"Add a type badge for ebook | pdf | icon-pack | asset",
			"Connect Stripe Checkout when you go live",
		],
	},
	"ecommerce-cms": {
		headline: "Run store ops + content in one admin",
		steps: [
			"npm install && npm run dev",
			"Open Storefront, then Products → Inventory → Orders → Shipping",
			"Track raw materials for manufacturing/fulfillment",
			"Use CMS for blogs & newsletters and Scheduler for social posts",
			"Close the loop with Invoices and Payments",
		],
		customize: [
			"Map warehouses and carriers to your real logistics partners",
			"Extend inventory rows with bin locations or lots",
			"Hook CMS posts to your storefront blog or headless CMS",
		],
	},
};

/** Free downloads only — full-kit stays behind the paid wall. */
export const FREE_CRM_IDS = [
	"clinic",
	"indie-stripe",
	"agency",
	"freelancer",
	"content-creator",
	"digital-store",
	"ecommerce-cms",
];

export function listFreeCrmTemplates() {
	return FREE_CRM_IDS.map((id) => getFreeCrmTemplate(id)).filter(Boolean);
}

export function getFreeCrmTemplate(id) {
	if (!FREE_CRM_IDS.includes(id)) return null;
	const ast = getVerticalAstById(id);
	if (!ast || ast.id !== id) return null;
	const guide = GUIDE_BY_ID[id] || {
		headline: ast.meta.tagline,
		steps: ["npm install && npm run dev", "Edit pages/index.js", "Ship"],
		customize: ["Update seed data", "Adjust sidebar labels"],
	};
	return {
		id: ast.id,
		ast,
		name: ast.meta.name,
		tagline: ast.meta.tagline,
		description: ast.meta.description,
		badge: ast.meta.badge,
		accent: ast.meta.accent,
		audience: ast.meta.audience || [],
		icon: ast.meta.icon,
		image: PREVIEW_BY_ID[id] || "/templates-page.png",
		homeRoute: ast.homeRoute || "/dashboard",
		/** Opens /demo/template/[id] then the CRM shell for this vertical */
		demoUrl: `/demo/template/${ast.id}`,
		guide,
		slug: ast.id,
		zipName: `${ast.id}-crm-template`,
	};
}

export function isFreeCrmId(id) {
	return FREE_CRM_IDS.includes(id);
}

/** For AI / docs — all verticals that exist; mark which are free. */
export function listVerticalsWithAccess() {
	return listVerticalAsts().map((ast) => ({
		id: ast.id,
		name: ast.meta.name,
		free: FREE_CRM_IDS.includes(ast.id),
	}));
}
