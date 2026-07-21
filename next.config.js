const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["ovevcjixqq.ufs.sh", "utfs.io"],
	},
	webpack: (config) => {
		config.resolve.alias["@"] = path.resolve(__dirname);
		return config;
	},
};

module.exports = nextConfig;
