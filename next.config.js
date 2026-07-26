const path = require("path");

/** Expose server FIREBASE_* to the browser as NEXT_PUBLIC_* (client auth + Firestore). */
function firebasePublicEnv() {
	const pick = (publicKey, serverKey) =>
		process.env[publicKey] || process.env[serverKey] || "";
	return {
		NEXT_PUBLIC_FIREBASE_API_KEY: pick(
			"NEXT_PUBLIC_FIREBASE_API_KEY",
			"FIREBASE_API_KEY"
		),
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: pick(
			"NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
			"FIREBASE_AUTH_DOMAIN"
		),
		NEXT_PUBLIC_FIREBASE_PROJECT_ID: pick(
			"NEXT_PUBLIC_FIREBASE_PROJECT_ID",
			"FIREBASE_PROJECT_ID"
		),
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: pick(
			"NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
			"FIREBASE_STORAGE_BUCKET"
		),
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: pick(
			"NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
			"FIREBASE_MESSAGING_SENDER_ID"
		),
		NEXT_PUBLIC_FIREBASE_APP_ID: pick(
			"NEXT_PUBLIC_FIREBASE_APP_ID",
			"FIREBASE_APP_ID"
		),
	};
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: firebasePublicEnv(),
	images: {
		domains: ["ovevcjixqq.ufs.sh", "utfs.io"],
	},
	webpack: (config) => {
		config.resolve.alias["@"] = path.resolve(__dirname);
		return config;
	},
};

module.exports = nextConfig;
