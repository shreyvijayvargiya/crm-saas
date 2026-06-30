import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const globalsPath = path.resolve(__dirname, "globals.css");

/**
 * Dev-only route that serves processed Tailwind CSS as a real stylesheet.
 * Unlike Vite's /globals.css module URL, this works with <link rel="stylesheet">
 * and is not removed when TanStack Start strips dev SSR style tags on hydration.
 */
export function appCssPlugin(): Plugin {
	return {
		name: "app-css-plugin",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const pathname = req.url?.split("?")[0];
				if (pathname !== "/app.css") return next();

				try {
					const source = fs.readFileSync(globalsPath, "utf8");
					const result = await postcss([
						tailwindcss(),
						autoprefixer(),
					]).process(source, { from: globalsPath });

					res.statusCode = 200;
					res.setHeader("Content-Type", "text/css; charset=utf-8");
					res.setHeader("Cache-Control", "no-store");
					res.end(result.css);
				} catch (error) {
					next(error);
				}
			});
		},
	};
}
