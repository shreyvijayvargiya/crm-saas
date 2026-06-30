import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, transformWithEsbuild } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { appCssPlugin } from "./vite-app-css-plugin.mts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsxRoots = ["app", "components", "modules", "lib", "utils"];

function treatJsFilesAsJsx() {
	return {
		name: "treat-js-files-as-jsx",
		async transform(code, id) {
			if (!jsxRoots.some((root) => id.includes(`/${root}/`))) return null;
			if (!id.endsWith(".js")) return null;
			if (!/<[A-Za-z/]/.test(code)) return null;

			return transformWithEsbuild(code, id, {
				loader: "jsx",
				jsx: "automatic",
			});
		},
	};
}

export default defineConfig({
	server: {
		port: 3002,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "."),
			"next/link": path.resolve(__dirname, "lib/compat/next-link.jsx"),
			"next/router": path.resolve(__dirname, "lib/compat/next-router.js"),
			"next/image": path.resolve(__dirname, "lib/compat/next-image.jsx"),
		},
	},
	plugins: [
		treatJsFilesAsJsx(),
		appCssPlugin(),
		tanstackStart({
			srcDirectory: "src",
			router: {
				routesDirectory: "routes",
			},
			dev: {
				ssrStyles: {
					enabled: false,
				},
			},
		}),
		viteReact({
			include: /\.(jsx|js|tsx|ts)$/,
		}),
		nitro(),
	],
});
