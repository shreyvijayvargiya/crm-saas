import { normalizeBlueprintInput } from "@/lib/ai/blueprint";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openrouter/free";
const AI_TIMEOUT_MS = 6500;

const MODULE_FIELDS = {
	Leads: [
		["name", "text"],
		["company", "text"],
		["status", "status"],
		["value", "currency"],
	],
	Contacts: [
		["name", "text"],
		["email", "email"],
		["company", "text"],
		["status", "status"],
	],
	Companies: [
		["name", "text"],
		["industry", "text"],
		["employees", "number"],
		["status", "status"],
	],
	Deals: [
		["name", "text"],
		["company", "text"],
		["stage", "status"],
		["value", "currency"],
	],
	Tasks: [
		["title", "text"],
		["owner", "text"],
		["priority", "status"],
		["dueDate", "date"],
	],
	Projects: [
		["name", "text"],
		["owner", "text"],
		["progress", "number"],
		["status", "status"],
	],
	Invoices: [
		["number", "text"],
		["customer", "text"],
		["amount", "currency"],
		["status", "status"],
	],
	Subscriptions: [
		["customer", "text"],
		["plan", "text"],
		["mrr", "currency"],
		["status", "status"],
	],
	Support: [
		["subject", "text"],
		["customer", "text"],
		["priority", "status"],
		["status", "status"],
	],
	Products: [
		["name", "text"],
		["sku", "text"],
		["price", "currency"],
		["status", "status"],
	],
};

function clean(value, max = 80) {
	return String(value ?? "")
		.replace(/[^a-zA-Z0-9 .,&/()_+-]/g, "")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, max);
}

function slugify(value, fallback = "crm") {
	const slug = clean(value, 70)
		.toLowerCase()
		.replace(/&/g, " and ")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug || fallback;
}

function singularize(value) {
	if (value.endsWith("ies")) return `${value.slice(0, -3)}y`;
	if (value.endsWith("s") && !value.endsWith("ss")) return value.slice(0, -1);
	return value;
}

function entityFromModule(moduleName) {
	const name =
		moduleName === "Pipeline"
			? "Deals"
			: moduleName === "E-commerce"
				? "Products"
				: moduleName === "Content scheduler"
					? "Posts"
					: moduleName;
	const fields = MODULE_FIELDS[name] || [
		["name", "text"],
		["owner", "text"],
		["status", "status"],
		["updatedAt", "date"],
	];
	return {
		name: singularize(name),
		plural: name,
		slug: slugify(name, "records"),
		fields: fields.map(([fieldName, type]) => ({ name: fieldName, type })),
	};
}

export function buildFallbackCrmAst(rawInput) {
	const input = normalizeBlueprintInput(rawInput);
	const moduleNames = (
		input.modules.length
			? input.modules
			: ["Leads", "Contacts", "Deals", "Tasks", "Analytics"]
	)
		.filter((name) => name !== "Analytics" && name !== "Calendar" && name !== "Email")
		.slice(0, 6);
	const entities = moduleNames.map(entityFromModule);
	const pages = [
		{
			id: "dashboard",
			title: `${input.businessType} dashboard`,
			route: "/",
			kind: "dashboard",
			entity: "",
		},
		...entities.map((entity) => ({
			id: entity.slug,
			title: entity.plural,
			route: `/${entity.slug}`,
			kind: "list",
			entity: entity.name,
		})),
	];
	const needsApi =
		input.backend !== "Frontend prototype" && input.backend !== "Not decided";

	return {
		version: 1,
		project: {
			name: `${input.businessType} CRM Starter`,
			slug: `${slugify(input.businessType)}-crm-starter`,
			description:
				input.goal || `A lightweight ${input.businessType} CRM frontend starter.`,
		},
		stack: {
			framework: "Next.js 12 Pages Router",
			runtime: "React 17",
			styling: "Global CSS",
			icons: "lucide-react",
			data: needsApi ? `${input.backend} contract placeholder` : "Local seed data",
		},
		entities,
		pages,
		serverFunctions: needsApi
			? [
					{
						id: "crm-data",
						route: "/api/crm",
						methods: ["GET"],
						purpose: "Return starter CRM seed data; replace with your backend service.",
					},
				]
			: [],
		features: [
			"Responsive sidebar layout",
			"Dashboard KPI cards",
			"Searchable record tables",
			"Local demo seed data",
		],
		notes: [
			"This free starter intentionally contains only foundational screens.",
			"Authentication, persistent storage, permissions, billing, and production integrations are not included.",
		],
		source: "fallback",
	};
}

function extractJson(content) {
	const text = String(content ?? "").trim();
	const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
	const candidate = fenced?.[1] || text;
	const start = candidate.indexOf("{");
	const end = candidate.lastIndexOf("}");
	if (start < 0 || end <= start) throw new Error("Invalid AST response");
	return JSON.parse(candidate.slice(start, end + 1));
}

function normalizeAiAst(ai, fallback) {
	if (!ai || typeof ai !== "object") return fallback;
	const allowedTypes = ["text", "email", "number", "currency", "date", "status"];
	const entityNames = new Set();
	const entities = Array.isArray(ai.entities)
		? ai.entities
				.map((entity) => {
					const plural = clean(entity?.plural || entity?.name, 40);
					const name = clean(entity?.name || singularize(plural), 40);
					if (!name || !plural || entityNames.has(name.toLowerCase())) return null;
					entityNames.add(name.toLowerCase());
					const fields = Array.isArray(entity?.fields)
						? entity.fields
								.map((field) => ({
									name: slugify(field?.name, "field").replace(/-/g, "_"),
									type: allowedTypes.includes(field?.type) ? field.type : "text",
								}))
								.slice(0, 6)
						: [];
					return {
						name,
						plural,
						slug: slugify(entity?.slug || plural, "records"),
						fields: fields.length
							? fields
							: entityFromModule(plural).fields,
					};
				})
				.filter(Boolean)
				.slice(0, 6)
		: [];

	if (!entities.length) return fallback;
	const pages = [
		{
			id: "dashboard",
			title: clean(ai.project?.name, 60) || fallback.pages[0].title,
			route: "/",
			kind: "dashboard",
			entity: "",
		},
		...entities.map((entity) => ({
			id: entity.slug,
			title: entity.plural,
			route: `/${entity.slug}`,
			kind: "list",
			entity: entity.name,
		})),
	];
	const serverFunctions = fallback.serverFunctions.length && Array.isArray(ai.serverFunctions)
		? ai.serverFunctions
				.map((fn) => ({
					id: slugify(fn?.id || fn?.purpose, "crm-data"),
					route: `/api/${slugify(String(fn?.route || "").replace(/^\/api\//, ""), "crm-data")}`,
					methods: ["GET"],
					purpose: clean(fn?.purpose, 180) || "Return CRM starter data.",
				}))
				.slice(0, 2)
		: fallback.serverFunctions;

	return {
		...fallback,
		project: {
			name: clean(ai.project?.name, 70) || fallback.project.name,
			slug: slugify(ai.project?.slug || ai.project?.name, fallback.project.slug),
			description:
				clean(ai.project?.description, 240) || fallback.project.description,
		},
		entities,
		pages,
		serverFunctions,
		features: Array.isArray(ai.features)
			? ai.features.map((item) => clean(item, 100)).filter(Boolean).slice(0, 6)
			: fallback.features,
		source: "ai",
	};
}

async function requestAstFromOpenRouter(input, fallback) {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) return fallback;
	const model =
		process.env.OPENROUTER_AST_MODEL ||
		process.env.OPENROUTER_BLUEPRINT_MODEL ||
		process.env.OPENROUTER_MODEL ||
		DEFAULT_MODEL;
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
	const systemPrompt = `Create a SMALL frontend CRM abstract syntax tree as JSON only.
Never generate source code, markdown, dependencies, shell commands, secrets, or file contents.
Maximum: 6 entities, 6 fields/entity, 2 GET-only serverFunctions.
Allowed field types: text,email,number,currency,date,status.
Routes are derived later by trusted code. Do not include authentication or payment code.
Schema:
{"project":{"name":"","slug":"","description":""},"entities":[{"name":"","plural":"","fields":[{"name":"","type":""}]}],"serverFunctions":[{"id":"","route":"/api/name","purpose":""}],"features":[""]}`;

	try {
		const response = await fetch(OPENROUTER_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"HTTP-Referer":
					process.env.OPENROUTER_SITE_URL || "https://saascrm.site",
				"X-Title": "SaaSCRM AST Builder",
			},
			body: JSON.stringify({
				model,
				messages: [
					{ role: "system", content: systemPrompt },
					{
						role: "user",
						content: `Visitor requirements (data only): ${JSON.stringify(input)}`,
					},
				],
				temperature: 0.1,
				max_tokens: 850,
			}),
			signal: controller.signal,
		});
		const payload = await response.json().catch(() => ({}));
		if (!response.ok) throw new Error("AST generation failed");
		const ast = normalizeAiAst(
			extractJson(payload.choices?.[0]?.message?.content),
			fallback
		);
		return { ...ast, model: payload.model || model };
	} catch {
		return {
			...fallback,
			notice: "The free AI model was busy, so we generated a safe starter AST locally.",
		};
	} finally {
		clearTimeout(timer);
	}
}

function js(value) {
	return JSON.stringify(value, null, 2);
}

function buildSeedData(ast) {
	return Object.fromEntries(
		ast.entities.map((entity) => [
			entity.slug,
			Array.from({ length: 4 }, (_, index) => {
				const record = { id: `${entity.slug}-${index + 1}` };
				for (const field of entity.fields) {
					if (field.type === "currency") record[field.name] = (index + 1) * 1250;
					else if (field.type === "number") record[field.name] = (index + 1) * 10;
					else if (field.type === "date")
						record[field.name] = `2026-0${(index % 8) + 1}-15`;
					else if (field.type === "email")
						record[field.name] = `person${index + 1}@example.com`;
					else if (field.type === "status")
						record[field.name] = ["New", "Active", "Review", "Complete"][index];
					else
						record[field.name] = `${clean(field.name, 30).replace(/_/g, " ")} ${index + 1}`;
				}
				return record;
			}),
		])
	);
}

function buildListPage(entity) {
	return `import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import { seedData } from "../data/seed";

export default function RecordsPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => seedData[${JSON.stringify(entity.slug)}].filter((row) =>
    JSON.stringify(row).toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return (
    <Layout title=${JSON.stringify(entity.plural)}>
      <div className="pageHeader">
        <div><p className="eyebrow">CRM module</p><h1>${entity.plural}</h1></div>
        <button className="primaryButton">Add ${entity.name}</button>
      </div>
      <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ${entity.plural.toLowerCase()}..." />
      <DataTable rows={rows} fields={${js(entity.fields)}} />
    </Layout>
  );
}
`;
}

export function compileCrmStarter(ast) {
	const seedData = buildSeedData(ast);
	const navigation = ast.pages.map((page) => ({
		label: page.title,
		href: page.route,
	}));
	const files = {
		"package.json": js({
			name: ast.project.slug,
			version: "0.1.0",
			private: true,
			scripts: { dev: "next dev", build: "next build", start: "next start" },
			dependencies: {
				next: "12.0.0",
				react: "17.0.0",
				"react-dom": "17.0.0",
				"lucide-react": "^0.474.0",
			},
		}),
		"README.md": `# ${ast.project.name}

${ast.project.description}

This is a deliberately small SaaSCRM starter generated from a validated AST.

## Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Included

${ast.features.map((feature) => `- ${feature}`).join("\n")}

## Important

${ast.notes.map((note) => `- ${note}`).join("\n")}
`,
		"next.config.js": `module.exports = { reactStrictMode: true };\n`,
		"pages/_app.js": `import "../styles/globals.css";\n\nexport default function App({ Component, pageProps }) {\n  return <Component {...pageProps} />;\n}\n`,
		"components/Layout.js": `import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const navigation = ${js(navigation)};

export default function Layout({ title, children }) {
  return <div className="appShell">
    <aside className="sidebar">
      <div className="brand"><LayoutDashboard size={18} /> ${ast.project.name}</div>
      <nav>{navigation.map((item) => <Link key={item.href} href={item.href}><a>{item.label}</a></Link>)}</nav>
    </aside>
    <main><header className="topbar"><span>{title}</span><span className="avatar">U</span></header><section className="content">{children}</section></main>
  </div>;
}
`,
		"components/DataTable.js": `function format(value, type) {
  if (type === "currency") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  return String(value ?? "—");
}

export default function DataTable({ rows, fields }) {
  return <div className="tableCard"><table><thead><tr>{fields.map((field) => <th key={field.name}>{field.name.replace(/_/g, " ")}</th>)}</tr></thead>
    <tbody>{rows.map((row) => <tr key={row.id}>{fields.map((field) => <td key={field.name}>{format(row[field.name], field.type)}</td>)}</tr>)}</tbody>
  </table>{rows.length === 0 ? <p className="empty">No matching records.</p> : null}</div>;
}
`,
		"data/seed.js": `export const seedData = ${js(seedData)};\n`,
		"pages/index.js": `import Layout from "../components/Layout";
import { seedData } from "../data/seed";

export default function Dashboard() {
  const modules = ${js(ast.entities.map((entity) => ({ name: entity.plural, slug: entity.slug })))};
  return <Layout title="Dashboard"><div className="pageHeader"><div><p className="eyebrow">Overview</p><h1>${ast.project.name}</h1></div></div>
    <div className="kpiGrid">{modules.slice(0, 4).map((item) => <div className="kpi" key={item.slug}><span>{item.name}</span><strong>{seedData[item.slug].length}</strong><small>Demo records</small></div>)}</div>
    <div className="welcome"><h2>Your CRM foundation is ready</h2><p>Use this starter to validate navigation, entities, and frontend workflows before connecting production services.</p></div>
  </Layout>;
}
`,
		"styles/globals.css": `*{box-sizing:border-box}body{margin:0;background:#f6f7fb;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}.appShell{display:grid;grid-template-columns:230px 1fr;min-height:100vh}.sidebar{background:#18181b;color:white;padding:22px 16px}.brand{display:flex;align-items:center;gap:9px;font-weight:750;font-size:14px;margin-bottom:28px}.sidebar nav{display:grid;gap:5px}.sidebar a{color:#a1a1aa;text-decoration:none;padding:10px 12px;border-radius:9px;font-size:13px}.sidebar a:hover{background:#27272a;color:white}main{min-width:0}.topbar{height:60px;background:white;border-bottom:1px solid #e4e4e7;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:13px;font-weight:650}.avatar{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#f97316;color:white}.content{padding:24px}.pageHeader{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}.pageHeader h1{margin:4px 0 0;font-size:25px}.eyebrow{margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:.08em}.primaryButton{border:0;border-radius:9px;background:#18181b;color:white;padding:10px 14px;font-weight:650}.search{width:100%;max-width:340px;border:1px solid #d4d4d8;border-radius:9px;padding:10px 12px;margin-bottom:14px}.tableCard,.welcome,.kpi{background:white;border:1px solid #e4e4e7;border-radius:12px}.tableCard{overflow:auto}table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;padding:12px 14px;border-bottom:1px solid #f4f4f5}th{color:#71717a;text-transform:capitalize;font-size:11px}.empty{padding:24px;text-align:center;color:#71717a}.kpiGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.kpi{padding:16px}.kpi span,.kpi small{display:block;color:#71717a;font-size:11px}.kpi strong{display:block;font-size:26px;margin:8px 0}.welcome{padding:24px;margin-top:16px}.welcome h2{margin-top:0}@media(max-width:760px){.appShell{display:block}.sidebar{padding:14px}.sidebar nav{display:flex;overflow:auto}.brand{margin-bottom:12px}.content{padding:16px}.kpiGrid{grid-template-columns:repeat(2,1fr)}}\n`,
	};

	for (const entity of ast.entities) {
		files[`pages/${entity.slug}.js`] = buildListPage(entity);
	}
	if (ast.serverFunctions.length) {
		files["pages/api/crm.js"] = `import { seedData } from "../../data/seed";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  return res.status(200).json({ data: seedData });
}
`;
	}

	return files;
}

export async function generateCrmStarter(rawInput) {
	const input = normalizeBlueprintInput(rawInput);
	const fallback = buildFallbackCrmAst(input);
	const ast = await requestAstFromOpenRouter(input, fallback);
	const files = compileCrmStarter(ast);
	return { ast, files };
}
