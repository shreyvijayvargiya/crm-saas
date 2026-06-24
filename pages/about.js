import fs from "fs";
import path from "path";
import { About } from "../app";

export async function getStaticProps() {
	const root = process.cwd();

	const readUtf8 = (relativePath) => {
		try {
			return fs.readFileSync(path.join(root, relativePath), "utf8");
		} catch {
			return "";
		}
	};

	const designMd = readUtf8("Design.md");
	const sqlSchema = readUtf8("schemas/sql-schemas/drizzle/schema.ts");
	const dataJson = readUtf8("data.json");

	const loadSchemaDir = (relativeDir) => {
		try {
			const dir = path.join(root, relativeDir);
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			return entries
				.filter((e) => e.isFile() && !e.name.startsWith("."))
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((e) => ({
					name: e.name,
					content: fs.readFileSync(path.join(dir, e.name), "utf8"),
				}));
		} catch {
			return [];
		}
	};

	const firestoreSchemas = loadSchemaDir("schemas/firestore-schemas");
	const supabaseSchemas = loadSchemaDir("schemas/supabase-schemas");

	let zodSchemas = [];
	try {
		const zodDir = path.join(root, "schemas/zod-schemas");
		const names = fs.readdirSync(zodDir).filter((f) => f.endsWith(".js")).sort();
		zodSchemas = names.map((name) => ({
			name,
			content: fs.readFileSync(path.join(zodDir, name), "utf8"),
		}));
	} catch {
		zodSchemas = [];
	}

	return {
		props: {
			designMd,
			dataJson,
			firestoreSchemas,
			supabaseSchemas,
			zodSchemas,
			sqlSchema,
		},
	};
}

export default function AboutPage(props) {
	return <About {...props} />;
}
