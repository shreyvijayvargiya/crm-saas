import React, { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_FILES } from "./filesSeedData";

const FILES_STORAGE_KEY = "crm-files";

function loadStored() {
	if (typeof window === "undefined") return INITIAL_FILES;
	try {
		const raw = localStorage.getItem(FILES_STORAGE_KEY);
		if (!raw) return INITIAL_FILES;
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : INITIAL_FILES;
	} catch {
		return INITIAL_FILES;
	}
}

const FilesContext = createContext(null);

export function FilesProvider({ children }) {
	const [hydrated, setHydrated] = useState(false);
	const [files, setFiles] = useState(INITIAL_FILES);

	useEffect(() => {
		setFiles(loadStored());
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		localStorage.setItem(FILES_STORAGE_KEY, JSON.stringify(files));
	}, [files, hydrated]);

	const getFile = (id) => files.find((f) => f.id === id) ?? null;

	const addFile = (file) => {
		setFiles((prev) => [file, ...prev]);
	};

	return (
		<FilesContext.Provider value={{ files, getFile, addFile, hydrated }}>
			{children}
		</FilesContext.Provider>
	);
}

export function useFiles() {
	const ctx = useContext(FilesContext);
	if (!ctx) throw new Error("useFiles must be used within FilesProvider");
	return ctx;
}
