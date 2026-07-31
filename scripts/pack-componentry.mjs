#!/usr/bin/env node
/**
 * pack-componentry.mjs
 *
 * Builds a Gumroad-ready ZIP of Componentry hero components into ./tmp
 *
 * Usage:
 *   npm run pack
 *   node scripts/pack-componentry.mjs
 *   node scripts/pack-componentry.mjs --out tmp --name componentry
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import JSZip from "jszip";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const COMPONENTS_DIR = path.join(ROOT, "app/AgencySite/components");
const CURSOR_TRAILS_DIR = path.join(COMPONENTS_DIR, "cursor-trails");
const LIB_UTILS = path.join(ROOT, "lib/utils.js");
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

function parseArgs(argv) {
	const args = { out: "tmp", name: "componentry", help: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === "--help" || a === "-h") args.help = true;
		else if (a === "--out" && argv[i + 1]) args.out = argv[++i];
		else if (a === "--name" && argv[i + 1]) args.name = argv[++i];
	}
	return args;
}

function listHeroFiles() {
	return fs
		.readdirSync(COMPONENTS_DIR)
		.filter((f) => /^Hero.+\.jsx$/.test(f))
		.sort();
}

function walkFiles(dir) {
	const out = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walkFiles(full));
		else out.push(full);
	}
	return out;
}

/** Rewrite project aliases so the ZIP is self-contained under components/ */
function rewriteImports(source, fromFile) {
	const dir = path.dirname(fromFile);
	const relToLib = path
		.relative(dir, path.join("lib", "utils.js"))
		.replace(/\\/g, "/");
	const relToUi = (name) =>
		path.relative(dir, path.join("components", "ui", name)).replace(/\\/g, "/");

	let next = source;
	next = next.replace(
		/from\s+["']@\/lib\/utils["']/g,
		`from "${relToLib.startsWith(".") ? relToLib : `./${relToLib}`}"`
	);
	next = next.replace(
		/from\s+["']@\/components\/ui\/button["']/g,
		`from "${relToUi("button.jsx").startsWith(".") ? relToUi("button.jsx") : `./${relToUi("button.jsx")}`}"`
	);
	next = next.replace(
		/from\s+["']@\/components\/ui\/card["']/g,
		`from "${relToUi("card.jsx").startsWith(".") ? relToUi("card.jsx") : `./${relToUi("card.jsx")}`}"`
	);
	return next;
}

function minimalButtonSource() {
	return `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-zinc-900 text-white hover:bg-zinc-800",
				destructive: "bg-red-600 text-white hover:bg-red-500",
				outline: "border border-zinc-200 bg-white hover:bg-zinc-50",
				secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
				ghost: "hover:bg-zinc-100",
				link: "text-zinc-900 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	}
);

const Button = React.forwardRef(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
`;
}

function minimalCardSource() {
	return `import * as React from "react";
import { cn } from "../../lib/utils.js";

const Card = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm",
			className
		)}
		{...props}
	/>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
	<h3 ref={ref} className={cn("text-sm font-semibold leading-none", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
	<p ref={ref} className={cn("text-sm text-zinc-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
`;
}

function buildReadme(heroes, version) {
	const list = heroes
		.map((f) => `- \`${f}\``)
		.join("\n");

	return `# Componentry v${version}

Sellable UI / motion hero components for Next.js + React + Tailwind + Framer Motion.

## What's included

\`\`\`
components/          Hero*.jsx demos
components/cursor-trails/
components/ui/       Minimal Button + Card used by a few heroes
lib/utils.js         cn() helper (clsx + tailwind-merge)
catalog.json         Manifest of packed files
\`\`\`

### Components (${heroes.length})

${list}

## Install into your app

1. Copy \`components/\` and \`lib/\` into your project (or merge into existing folders).
2. Ensure these dependencies are installed:

\`\`\`bash
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
\`\`\`

3. Import a hero:

\`\`\`jsx
import HeroIPhone from "./components/HeroIPhone";

export default function Page() {
  return <HeroIPhone />;
}
\`\`\`

4. Tailwind: use a standard Tailwind setup with content paths covering these files.

## Notes

- Paths inside the ZIP use relative imports (no \`@/\` alias required).
- Some demos load Unsplash images / DiceBear avatars over the network.
- Preview screenshot demos expect optional \`screenshots\` props — see each file.

Built for Gumroad distribution · ${new Date().toISOString().slice(0, 10)}
`;
}

function buildPackageJson(version) {
	return JSON.stringify(
		{
			name: "componentry",
			version,
			private: true,
			description: "Componentry — UI motion heroes for Next.js",
			peerDependencies: {
				react: ">=17",
				"react-dom": ">=17",
				"framer-motion": ">=6",
				"lucide-react": ">=0.400.0",
				clsx: ">=2",
				"tailwind-merge": ">=2",
				"class-variance-authority": ">=0.7",
				"@radix-ui/react-slot": ">=1",
			},
		},
		null,
		2
	);
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (args.help) {
		console.log(`Usage: node scripts/pack-componentry.mjs [--out tmp] [--name componentry]

Creates tmp/<name>-v<version>-<date>.zip with Hero components for Gumroad.`);
		process.exit(0);
	}

	const heroes = listHeroFiles();
	if (!heroes.length) {
		console.error("No Hero*.jsx files found in", COMPONENTS_DIR);
		process.exit(1);
	}

	const version = PKG.version || "1.0.0";
	const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const zipRoot = `${args.name}-v${version}`;
	const outDir = path.resolve(ROOT, args.out);
	const zipName = `${args.name}-v${version}-${date}.zip`;
	const zipPath = path.join(outDir, zipName);

	fs.mkdirSync(outDir, { recursive: true });

	const zip = new JSZip();
	const folder = zip.folder(zipRoot);

	// lib/utils.js
	folder.file("lib/utils.js", fs.readFileSync(LIB_UTILS, "utf8"));

	// minimal UI primitives
	folder.file("components/ui/button.jsx", minimalButtonSource());
	folder.file("components/ui/card.jsx", minimalCardSource());

	// Hero components
	for (const file of heroes) {
		const abs = path.join(COMPONENTS_DIR, file);
		const zipRel = path.join("components", file);
		const rewritten = rewriteImports(fs.readFileSync(abs, "utf8"), zipRel);
		folder.file(zipRel.replace(/\\/g, "/"), rewritten);
	}

	// cursor-trails helpers (used by HeroCursorTrails / HeroScrollReveal)
	if (fs.existsSync(CURSOR_TRAILS_DIR)) {
		for (const abs of walkFiles(CURSOR_TRAILS_DIR)) {
			const relFromComponents = path.relative(COMPONENTS_DIR, abs);
			const zipRel = path.join("components", relFromComponents);
			const rewritten = rewriteImports(fs.readFileSync(abs, "utf8"), zipRel);
			folder.file(zipRel.replace(/\\/g, "/"), rewritten);
		}
	}

	const catalog = {
		name: "componentry",
		version,
		builtAt: new Date().toISOString(),
		components: heroes.map((f) => ({
			file: `components/${f}`,
			id: f.replace(/^Hero/, "").replace(/\.jsx$/, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
		})),
		count: heroes.length,
	};

	folder.file("catalog.json", JSON.stringify(catalog, null, 2));
	folder.file("README.md", buildReadme(heroes, version));
	folder.file("package.json", buildPackageJson(version));

	const buffer = await zip.generateAsync({
		type: "nodebuffer",
		compression: "DEFLATE",
		compressionOptions: { level: 9 },
	});

	fs.writeFileSync(zipPath, buffer);

	const sizeKb = (buffer.length / 1024).toFixed(1);
	console.log(`Packed ${heroes.length} heroes → ${path.relative(ROOT, zipPath)} (${sizeKb} KB)`);
	console.log(`Upload this ZIP to Gumroad.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
