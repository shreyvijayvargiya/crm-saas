#!/usr/bin/env node
/**
 * Builds a CRM-only distributable zip (no agency / marketing landing site).
 * Output: dist/crm-saas-template.zip
 *
 * Usage: npm run build-crm
 */

import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
const OUT_NAME = "crm-saas-template";
const OUT_FOLDER = path.join(DIST_DIR, OUT_NAME);
const ZIP_PATH = path.join(DIST_DIR, `${OUT_NAME}.zip`);

const EXCLUDED_PARTS = new Set([
	"node_modules",
	".git",
	".next",
	"dist",
	".env",
	".vercel",
	".cursor",
	"uploads",
	"agent-tools",
	"agent-transcripts",
]);

function shouldExclude(absPath) {
	const rel = path.relative(ROOT, absPath);
	if (!rel || rel === "") return false;
	if (rel.startsWith(`dist${path.sep}`) || rel === "dist") return true;
	if (rel.includes(".DS_Store")) return true;
	const base = path.basename(absPath);
	if (base === ".env" || base.startsWith(".env.")) return true;
	const parts = rel.split(path.sep);
	return parts.some((part) => EXCLUDED_PARTS.has(part));
}

async function pathExists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function rmIfExists(p) {
	if (await pathExists(p)) {
		await fs.rm(p, { recursive: true, force: true });
	}
}

async function copyProject(stagingDir) {
	await rmIfExists(stagingDir);

	await fs.cp(ROOT, stagingDir, {
		recursive: true,
		filter: (src) => !shouldExclude(src),
	});
}

async function removeAgencyArtifacts(workDir) {
	const toRemove = [
		path.join(workDir, "app", "AgencySite"),
		path.join(workDir, "app", "LandingPage"),
		path.join(workDir, "src"),
		path.join(workDir, "pages", "pricing.js"),
		path.join(workDir, "pages", "contact.js"),
		path.join(workDir, "pages", "faq.js"),
		path.join(workDir, "pages", "demo.js"),
	];

	for (const p of toRemove) {
		await rmIfExists(p);
	}

	const calendarDir = path.join(workDir, "app", "Calendar");
	if (await pathExists(calendarDir)) {
		const entries = await fs.readdir(calendarDir, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.isDirectory() && entry.name.includes("AgencySite")) {
				await rmIfExists(path.join(calendarDir, entry.name));
			}
		}
	}

	// Strip accidental .DS_Store files from the bundle
	async function walkDsStore(dir) {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const full = path.join(dir, entry.name);
			if (entry.name === ".DS_Store") {
				await fs.rm(full, { force: true });
			} else if (entry.isDirectory()) {
				await walkDsStore(full);
			}
		}
	}
	await walkDsStore(workDir);
}

async function patchCrmRoutes(workDir) {
	const indexPage = `import Home from "../app/Home";
export default Home;
`;
	await fs.writeFile(path.join(workDir, "pages", "index.js"), indexPage, "utf8");

	const navConfigPath = path.join(workDir, "modules", "navConfig.js");
	let navConfig = await fs.readFile(navConfigPath, "utf8");
	navConfig = navConfig.replace(
		'{ id: 1, label: "Dashboard", route: "/demo", icon: "Home" }',
		'{ id: 1, label: "Dashboard", route: "/", icon: "Home" }'
	);
	await fs.writeFile(navConfigPath, navConfig, "utf8");

	const layoutPath = path.join(workDir, "modules", "Layout", "index.jsx");
	let layout = await fs.readFile(layoutPath, "utf8");
	layout = layout.replace(
		/\s*<div className="fixed bottom-4 left-1\/2 z-40 -translate-x-1\/2">[\s\S]*?← Back to agency site[\s\S]*?<\/div>\s*/,
		"\n"
	);
	await fs.writeFile(layoutPath, layout, "utf8");
}

async function writeCrmReadme(workDir) {
	const note = `# CRM SaaS Template (app-only)

This package is the **CRM application** — no agency marketing site included.

## Quick start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3002](http://localhost:3002) — the dashboard loads at \`/\`.

## What's different from the full repo

- Agency site removed (\`app/AgencySite\`, landing pages, pricing/contact/faq routes)
- \`/\` serves the CRM dashboard (was \`/demo\` in the full template)
- "Back to agency site" bar removed from the CRM shell

See \`readme.md\` for design tokens, Zod schemas, and API integration.
`;
	await fs.writeFile(path.join(workDir, "CRM-README.md"), note, "utf8");
}

async function createZip() {
	await rmIfExists(ZIP_PATH);
	execSync(
		`zip -r "${ZIP_PATH}" "${OUT_NAME}" -x "*.DS_Store" -x "**/.DS_Store"`,
		{ cwd: DIST_DIR, stdio: "inherit" }
	);
}

async function main() {
	const stagingDir = path.join(os.tmpdir(), `crm-saas-build-${Date.now()}`);

	console.log("Building CRM-only package…");
	await copyProject(stagingDir);
	console.log("Removing agency / marketing artifacts…");
	await removeAgencyArtifacts(stagingDir);
	console.log("Patching routes for CRM-only entry…");
	await patchCrmRoutes(stagingDir);
	await writeCrmReadme(stagingDir);

	await fs.mkdir(DIST_DIR, { recursive: true });
	await rmIfExists(OUT_FOLDER);
	await fs.rename(stagingDir, OUT_FOLDER);

	console.log("Creating zip…");
	await createZip();

	const stat = await fs.stat(ZIP_PATH);
	const sizeMb = (stat.size / (1024 * 1024)).toFixed(2);
	console.log(`\nDone: ${ZIP_PATH} (${sizeMb} MB)`);
	console.log(`Unpacked folder: ${OUT_FOLDER}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
