import fs from "node:fs";
import path from "node:path";

function readUtf8(relativePath) {
	try {
		return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
	} catch {
		return "";
	}
}

function loadSchemaDir(relativeDir) {
	try {
		const dir = path.join(process.cwd(), relativeDir);
		return fs
			.readdirSync(dir, { withFileTypes: true })
			.filter((e) => e.isFile() && !e.name.startsWith("."))
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((e) => ({
				name: e.name,
				content: fs.readFileSync(path.join(dir, e.name), "utf8"),
			}));
	} catch {
		return [];
	}
}

export function loadAboutProps() {
	let zodSchemas = [];
	try {
		const zodDir = path.join(process.cwd(), "schemas/zod-schemas");
		const names = fs.readdirSync(zodDir).filter((f) => f.endsWith(".js")).sort();
		zodSchemas = names.map((name) => ({
			name,
			content: fs.readFileSync(path.join(zodDir, name), "utf8"),
		}));
	} catch {
		zodSchemas = [];
	}

	return {
		designMd: readUtf8("Design.md"),
		dataJson: readUtf8("data.json"),
		firestoreSchemas: loadSchemaDir("schemas/firestore-schemas"),
		supabaseSchemas: loadSchemaDir("schemas/supabase-schemas"),
		zodSchemas,
		sqlSchema: readUtf8("schemas/sql-schemas/drizzle/schema.ts"),
	};
}
