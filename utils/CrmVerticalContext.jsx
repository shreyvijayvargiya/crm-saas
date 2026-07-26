import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
	DEFAULT_VERTICAL_ID,
	getVerticalAstById,
	listVerticalAsts,
} from "../asts/crm-verticals";

const STORAGE_KEY = "saas-crm-vertical";

const CrmVerticalContext = createContext(null);

export function CrmVerticalProvider({ children }) {
	const [verticalId, setVerticalIdState] = useState(DEFAULT_VERTICAL_ID);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		try {
			const saved = window.localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const ast = getVerticalAstById(saved);
				// Only restore if the id actually resolves (not silent full-kit fallback)
				if (ast.id === saved) setVerticalIdState(saved);
			}
		} catch {
			/* ignore */
		}
		setHydrated(true);
	}, []);

	const setVerticalId = useCallback((id) => {
		const next = id || DEFAULT_VERTICAL_ID;
		const ast = getVerticalAstById(next);
		const resolved = ast.id === next ? next : DEFAULT_VERTICAL_ID;
		setVerticalIdState(resolved);
		try {
			window.localStorage.setItem(STORAGE_KEY, resolved);
		} catch {
			/* ignore */
		}
	}, []);

	const vertical = useMemo(() => getVerticalAstById(verticalId), [verticalId]);
	const verticals = useMemo(() => listVerticalAsts(), []);

	const value = useMemo(
		() => ({
			/** Always the selected id (not overwritten by AST fallback). */
			verticalId,
			vertical,
			verticals,
			setVerticalId,
			navCategories: vertical.sidebar,
			homeRoute: vertical.homeRoute,
			hydrated,
		}),
		[verticalId, vertical, verticals, setVerticalId, hydrated]
	);

	return (
		<CrmVerticalContext.Provider value={value}>{children}</CrmVerticalContext.Provider>
	);
}

export function useCrmVertical() {
	const ctx = useContext(CrmVerticalContext);
	if (!ctx) {
		throw new Error("useCrmVertical must be used within CrmVerticalProvider");
	}
	return ctx;
}
