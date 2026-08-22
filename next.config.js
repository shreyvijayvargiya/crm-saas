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
	async rewrites() {
		const acceptMarkdown = {
			type: "header",
			key: "accept",
			value:
				"(?=.*(?:text/plain|text/markdown))(?!.*text/html.*(?:text/plain|text/markdown)).*",
		};
		return {
			beforeFiles: [
				{
					source: "/",
					destination: "/api/markdown",
					has: [acceptMarkdown],
				},
				{
					source: "/:path((?!api|_next).*)",
					destination: "/api/markdown/:path",
					has: [acceptMarkdown],
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
