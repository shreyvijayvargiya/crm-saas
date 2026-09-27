const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["ovevcjixqq.ufs.sh", "utfs.io"],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "Vary", value: "Accept, Accept-Encoding" },
					{
						key: "Link",
						value: '</llms.txt>; rel="describedby"',
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/pricing",
				destination: "https://github.com/shreyvijayvargiya/crm-saas",
				permanent: true,
			},
		];
	},
	async rewrites() {
		const acceptMarkdownExact = {
			type: "header",
			key: "accept",
			value: "text/markdown",
		};
		const acceptMarkdownPreferred = {
			type: "header",
			key: "accept",
			value:
				"(?=.*(?:text/plain|text/markdown))(?!.*text/html.*(?:text/plain|text/markdown)).*",
		};
		const skipApi = "/:path((?!api|_next|_vercel).*)";
		return {
			beforeFiles: [
				{
					source: "/",
					destination: "/api/markdown",
					has: [acceptMarkdownExact],
				},
				{
					source: skipApi,
					destination: "/api/markdown/:path",
					has: [acceptMarkdownExact],
				},
				{
					source: "/",
					destination: "/api/markdown",
					has: [acceptMarkdownPreferred],
				},
				{
					source: skipApi,
					destination: "/api/markdown/:path",
					has: [acceptMarkdownPreferred],
				},
			],
		};
	},
	webpack: (config) => {
		config.resolve.alias["@"] = path.resolve(__dirname);
		return config;
	},
};

module.exports = nextConfig;
