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
			if (saved) setVerticalIdState(saved);
		} catch {
			/* ignore */
		}
		setHydrated(true);
	}, []);

	const setVerticalId = useCallback((id) => {
		const next = id || DEFAULT_VERTICAL_ID;
		setVerticalIdState(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			/* ignore */
		}
	}, []);

	const vertical = useMemo(() => getVerticalAstById(verticalId), [verticalId]);
	const verticals = useMemo(() => listVerticalAsts(), []);

	const value = useMemo(
		() => ({
			verticalId: vertical.id,
			vertical,
			verticals,
			setVerticalId,
			navCategories: vertical.sidebar,
			homeRoute: vertical.homeRoute,
			hydrated,
		}),
		[vertical, verticals, setVerticalId, hydrated]
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
