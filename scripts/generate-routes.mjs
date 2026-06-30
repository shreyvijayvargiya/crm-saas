/**
 * Generates TanStack Router file routes from legacy Next.js pages/.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "pages");
const ROUTES_DIR = path.join(ROOT, "src/routes");

const SKIP = new Set(["_app.js", "about.js"]);
const AGENCY = new Set(["index.js", "contact.js", "faq.js", "pricing.js"]);

function toRoutePath(relativePath) {
	const base = relativePath.replace(/\.js$/, "");
	if (base === "index") return "/";
	return (
		"/" +
		base
			.split("/")
			.map((seg) =>
				seg.startsWith("[") && seg.endsWith("]") ? `$${seg.slice(1, -1)}` : seg
			)
			.join("/")
	);
}

function toRouteFile(relativePath) {
	const base = relativePath.replace(/\.js$/, "");
	if (base === "index") return "index.tsx";
	return (
		base
			.split("/")
			.map((seg) =>
				seg.startsWith("[") && seg.endsWith("]") ? `$${seg.slice(1, -1)}` : seg
			)
			.join("/") + ".tsx"
	);
}

function rewriteImports(raw) {
	return raw
		.split("\n")
		.filter((line) => line.startsWith("import "))
		.map((line) =>
			line.replace(
				/from\s+["'](?:\.\.\/)+app([^"']*)["']/g,
				'from "@/app$1"'
			)
		)
		.join("\n");
}

function walk(dir, base = "") {
	const out = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const rel = base ? `${base}/${entry.name}` : entry.name;
		if (entry.isDirectory()) {
			if (entry.name === "api") continue;
			out.push(...walk(path.join(dir, entry.name), rel));
		} else if (entry.name.endsWith(".js") && !SKIP.has(rel)) {
			out.push(rel);
		}
	}
	return out;
}

function buildPageModule(relativePath) {
	const raw = fs.readFileSync(path.join(PAGES_DIR, relativePath), "utf8");
	const imports = rewriteImports(raw);

	if (relativePath === "cms.js") {
		return `${imports}

function Page() {
  return (
    <CmsLayout>
      <ContentManagementSystem />
    </CmsLayout>
  );
}`;
	}

	if (relativePath === "files.js") {
		return `${imports}

function Page() {
  return (
    <FilesLayout>
      <Files />
    </FilesLayout>
  );
}`;
	}

	const direct = raw.match(/^export default (\w+);?\s*$/m);
	if (direct && !raw.includes("export default function") && !raw.includes("export default ()")) {
		return `${imports}

const Page = ${direct[1]};`;
	}

	const fn = raw.match(/export default function (\w+)\(\) {\s*([\s\S]*?)}/);
	if (fn) {
		return `${imports}

function Page() {
${fn[2].trim()}
}`;
	}

	const arrow = raw.match(/export default \(\) => (.+);/s);
	if (arrow) {
		return `${imports}

function Page() {
  return ${arrow[1].trim()};
}`;
	}

	throw new Error(`Unparsed page: ${relativePath}`);
}

for (const rel of walk(PAGES_DIR).sort()) {
	const routePath = toRoutePath(rel);
	const routeFile = toRouteFile(rel);
	const out = path.join(ROUTES_DIR, routeFile);
	fs.mkdirSync(path.dirname(out), { recursive: true });

	const pageModule = buildPageModule(rel);
	const skip = AGENCY.has(rel) ? "\n  staticData: { skipLayout: true }," : "";

	const file = `import { createFileRoute } from "@tanstack/react-router";
${pageModule}

export const Route = createFileRoute("${routePath}")({${skip}
  component: Page,
});
`;

	fs.writeFileSync(out, file);
}

console.log("Routes generated.");
