/**
 * Build a slim Next.js + Tailwind + shadcn-style CRM ZIP.
 * Single CRM surface: pages/index.js (no Agency marketing site).
 */

function js(value) {
	return JSON.stringify(value, null, 2);
}

function buildIndexPage(template) {
	const ast = template.ast;
	const nav = (ast.sidebar || []).flatMap((cat) =>
		(cat.items || []).map((item) => ({
			id: String(item.id),
			label: item.label,
			group: cat.label,
			icon: item.icon || "Circle",
		}))
	);
	const firstTable =
		(ast.pages || []).find((p) =>
			(p.blocks || []).some((b) => b.type === "table")
		) || ast.pages?.[0];
	const tableBlock = (firstTable?.blocks || []).find((b) => b.type === "table");
	const columns = tableBlock?.columns || [
		{ id: "name", label: "Name" },
		{ id: "status", label: "Status" },
		{ id: "owner", label: "Owner" },
	];
	const entityKey = tableBlock?.entity || "records";

	return `import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Search,
  Menu,
  X,
  Circle,
} from "lucide-react";

/**
 * ${template.name} — free SaaSCRM starter
 * Entire CRM UI lives on this page (pages/index.js). Extend here first.
 */
const META = ${js({
	name: template.name,
	tagline: template.tagline,
	id: template.id,
})};

const NAV = ${js(nav)};

const COLUMNS = ${js(columns)};

const SEED = [
  { id: "1", name: "Alex Rivera", status: "Active", owner: "You", value: "$1,200", company: "Northwind", email: "alex@example.com" },
  { id: "2", name: "Jordan Lee", status: "Pending", owner: "Sam", value: "$840", company: "Acme", email: "jordan@example.com" },
  { id: "3", name: "Priya Shah", status: "Active", owner: "You", value: "$2,400", company: "Globex", email: "priya@example.com" },
  { id: "4", name: "Chris Park", status: "Closed", owner: "Alex", value: "$0", company: "Initech", email: "chris@example.com" },
];

export default function CrmHome() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(NAV[0]?.id || "home");
  const [q, setQ] = useState("");

  const activeNav = NAV.find((n) => n.id === active) || NAV[0];
  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return SEED;
    return SEED.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(query))
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex">
      <aside
        className={
          (open ? "w-60" : "w-16") +
          " shrink-0 border-r border-zinc-200 bg-white transition-all flex flex-col"
        }
      >
        <div className="flex items-center gap-2 px-3 py-4 border-b border-zinc-100">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white grid place-items-center">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {open ? (
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{META.name}</p>
              <p className="text-[10px] text-zinc-500 truncate">Free SaaSCRM template</p>
            </div>
          ) : null}
          <button
            type="button"
            className="ml-auto p-1.5 rounded-md hover:bg-zinc-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        <nav className="p-2 space-y-0.5 overflow-y-auto flex-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={
                "w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm " +
                (active === item.id
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100")
              }
            >
              <Circle className="h-3.5 w-3.5 shrink-0 opacity-70" />
              {open ? <span className="truncate">{item.label}</span> : null}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 border-b border-zinc-200 bg-white px-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-zinc-500">{activeNav?.group || "CRM"}</p>
            <h1 className="text-sm font-semibold">{activeNav?.label || META.name}</h1>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={"Search ${entityKey}…"}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-8 pr-3 py-1.5 text-sm outline-none focus:border-zinc-400"
            />
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Records", value: String(SEED.length) },
              { label: "Active", value: String(SEED.filter((r) => r.status === "Active").length) },
              { label: "Pending", value: String(SEED.filter((r) => r.status === "Pending").length) },
              { label: "Template", value: META.id },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs text-zinc-500">{kpi.label}</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
              <p className="text-sm font-medium">{activeNav?.label || "Records"} table</p>
              <p className="text-xs text-zinc-500">{rows.length} rows · seed data</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 text-zinc-500">
                  <tr>
                    {COLUMNS.map((col) => (
                      <th key={col.id || col.label} className="px-4 py-2.5 font-medium">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-t border-zinc-100 hover:bg-zinc-50/80">
                      {COLUMNS.map((col) => {
                        const key = col.id || "name";
                        const val = row[key] ?? row.name ?? "—";
                        return (
                          <td key={key} className="px-4 py-2.5">
                            {key === "status" ? (
                              <span className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium">
                                {val}
                              </span>
                            ) : (
                              val
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-zinc-500">
            Customize this file only at first — then split routes when your product grows.
            AST source: <code>crm-ast.json</code> in this ZIP.
          </p>
        </div>
      </main>
    </div>
  );
}
`;
}

export function buildFreeCrmFiles(template) {
	const pkgName = template.zipName || `${template.id}-crm`;
	const files = {
		"package.json": js({
			name: pkgName,
			version: "1.0.0",
			private: true,
			scripts: {
				dev: "next dev",
				build: "next build",
				start: "next start",
			},
			dependencies: {
				next: "12.3.4",
				react: "^17.0.2",
				"react-dom": "^17.0.2",
				"lucide-react": "^0.474.0",
				clsx: "^2.1.1",
				"tailwind-merge": "^3.0.1",
			},
			devDependencies: {
				autoprefixer: "^10.4.20",
				postcss: "^8.4.49",
				tailwindcss: "^3.4.17",
			},
		}),
		"next.config.js": `/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
`,
		"postcss.config.js": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
		"tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
`,
		"styles/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #__next {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
`,
		"pages/_app.js": `import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
`,
		"pages/index.js": buildIndexPage(template),
		"crm-ast.json": js(template.ast),
		"README.md": `# ${template.name}

Free CRM starter from [SaaSCRM](https://saascrm.site/templates/${template.id}).

## Stack

- Next.js 12 (Pages Router)
- React 17
- Tailwind CSS
- Lucide icons

**Important:** This ZIP is the CRM app only (\`pages/index.js\`). It does **not** include the SaaSCRM marketing site.

## Quick start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## Customize

1. Edit \`SEED\`, \`NAV\`, and \`COLUMNS\` in \`pages/index.js\`
2. Rebrand colors in \`styles/globals.css\` / Tailwind
3. When you outgrow one page, split routes under \`pages/\`
4. Use \`crm-ast.json\` as the source of truth for nav + entities (same AST as saascrm.site)

## ${template.guide?.headline || "Next steps"}

${(template.guide?.steps || []).map((s, i) => `${i + 1}. ${s}`).join("\n")}

### Ideas

${(template.guide?.customize || []).map((s) => `- ${s}`).join("\n")}

## License

MIT — free for personal and commercial use. Attribution to SaaSCRM appreciated.
`,
	};

	return files;
}

/**
 * @returns {Promise<Buffer>}
 */
export async function buildFreeCrmZipBuffer(template) {
	const JSZip = (await import("jszip")).default;
	const zip = new JSZip();
	const root = zip.folder(template.zipName || template.id);
	const files = buildFreeCrmFiles(template);
	Object.entries(files).forEach(([path, content]) => {
		root.file(path, content);
	});
	return zip.generateAsync({ type: "nodebuffer" });
}
