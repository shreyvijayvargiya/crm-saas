/**
 * Browser Firebase (Auth + Firestore).
 * Config comes from next.config.js env bridge (FIREBASE_* → NEXT_PUBLIC_*).
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let initError = null;

function getClientConfig() {
	const apiKey = (process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "").trim();
	const authDomain = (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "").trim();
	const projectId = (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "").trim();
	const storageBucket = (
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ""
	).trim();
	const messagingSenderId = (
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ""
	).trim();
	const appId = (process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "").trim();

	if (!apiKey || !projectId || !appId) {
		initError =
			"Missing Firebase web config. Set FIREBASE_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_APP_ID in .env.local and restart.";
		return null;
	}

	return {
		apiKey,
		authDomain: authDomain || `${projectId}.firebaseapp.com`,
		projectId,
		storageBucket: storageBucket || `${projectId}.appspot.com`,
		messagingSenderId,
		appId,
	};
}

export function getFirebaseClientApp() {
	if (typeof window === "undefined") return null;
	const config = getClientConfig();
	if (!config) return null;
	try {
		if (getApps().length) return getApp();
		initError = null;
		return initializeApp(config);
	} catch (err) {
		initError = err?.message || String(err);
		return null;
	}
}

export function getFirebaseClientAuth() {
	const app = getFirebaseClientApp();
	return app ? getAuth(app) : null;
}

export function getFirebaseClientDb() {
	const app = getFirebaseClientApp();
	return app ? getFirestore(app) : null;
}

export function getGoogleAuthProvider() {
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	return provider;
}

export function getFirebaseClientInitError() {
	getClientConfig();
	return initError;
}
