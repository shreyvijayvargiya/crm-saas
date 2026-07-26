import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useAuth } from "./AuthContext";
import { useCrmVertical } from "./CrmVerticalContext";
import { touchUserProject } from "@/lib/projectsApi";

const STORAGE_KEY = "saas-crm-active-project";

const ProjectContext = createContext(null);

function readStored() {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed?.userId && parsed?.crmType) return parsed;
	} catch {
		/* ignore */
	}
	return null;
}

export function ProjectProvider({ children }) {
	const { user } = useAuth();
	const { setVerticalId } = useCrmVertical();
	const [activeCrmType, setActiveCrmTypeState] = useState(null);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const stored = readStored();
		if (stored && user?.uid && stored.userId === user.uid) {
			setActiveCrmTypeState(stored.crmType);
			setVerticalId(stored.crmType);
		} else if (!user) {
			setActiveCrmTypeState(null);
		}
		setHydrated(true);
	}, [user, setVerticalId]);

	const setActiveProject = useCallback(
		async (crmType) => {
			if (!crmType || !user?.uid) {
				setActiveCrmTypeState(null);
				try {
					window.localStorage.removeItem(STORAGE_KEY);
				} catch {
					/* ignore */
				}
				return;
			}
			setActiveCrmTypeState(crmType);
			setVerticalId(crmType);
			try {
				window.localStorage.setItem(
					STORAGE_KEY,
					JSON.stringify({ userId: user.uid, crmType })
				);
			} catch {
				/* ignore */
			}
			try {
				await touchUserProject(user.uid, crmType);
			} catch (err) {
				console.warn("[project] touch failed", err);
			}
		},
		[user, setVerticalId]
	);

	const clearActiveProject = useCallback(() => {
		setActiveCrmTypeState(null);
		try {
			window.localStorage.removeItem(STORAGE_KEY);
		} catch {
			/* ignore */
		}
	}, []);

	const value = useMemo(
		() => ({
			activeCrmType,
			activeProjectId: activeCrmType,
			setActiveProject,
			clearActiveProject,
			hydrated,
			userId: user?.uid || null,
		}),
		[activeCrmType, setActiveProject, clearActiveProject, hydrated, user]
	);

	return (
		<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
	);
}

export function useProject() {
	const ctx = useContext(ProjectContext);
	if (!ctx) {
		throw new Error("useProject must be used within ProjectProvider");
	}
	return ctx;
}
