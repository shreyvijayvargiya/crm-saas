import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
	getFirebaseClientAuth,
	getFirebaseClientInitError,
	getGoogleAuthProvider,
} from "@/lib/firebaseClient";
import { upsertUserProfile } from "@/lib/projectsApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loginOpen, setLoginOpen] = useState(false);
	const [authError, setAuthError] = useState("");

	useEffect(() => {
		const auth = getFirebaseClientAuth();
		if (!auth) {
			setLoading(false);
			return undefined;
		}
		const unsub = onAuthStateChanged(auth, async (next) => {
			setUser(next);
			setLoading(false);
			if (next) {
				try {
					await upsertUserProfile(next);
				} catch (err) {
					console.warn("[auth] profile upsert failed", err);
				}
			}
		});
		return () => unsub();
	}, []);

	const openLogin = useCallback(() => {
		setAuthError("");
		setLoginOpen(true);
	}, []);

	const closeLogin = useCallback(() => setLoginOpen(false), []);

	const signInWithGoogle = useCallback(async () => {
		setAuthError("");
		const auth = getFirebaseClientAuth();
		if (!auth) {
			const msg =
				getFirebaseClientInitError() ||
				"Firebase Auth is not configured. Check .env.local and restart the dev server.";
			setAuthError(msg);
			throw new Error(msg);
		}
		try {
			const result = await signInWithPopup(auth, getGoogleAuthProvider());
			await upsertUserProfile(result.user);
			setLoginOpen(false);
			return result.user;
		} catch (err) {
			const msg =
				err?.code === "auth/popup-closed-by-user"
					? "Sign-in cancelled."
					: err?.message || "Google sign-in failed.";
			setAuthError(msg);
			throw err;
		}
	}, []);

	const logOut = useCallback(async () => {
		const auth = getFirebaseClientAuth();
		if (auth) await signOut(auth);
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({
			user,
			loading,
			isAuthenticated: Boolean(user),
			loginOpen,
			openLogin,
			closeLogin,
			setLoginOpen,
			signInWithGoogle,
			logOut,
			authError,
			setAuthError,
		}),
		[
			user,
			loading,
			loginOpen,
			openLogin,
			closeLogin,
			signInWithGoogle,
			logOut,
			authError,
		]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}
