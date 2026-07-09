import React, { createContext, useContext } from "react";
import { useCrmData } from "@/utils/CrmDataContext";

const FilesContext = createContext(null);

export function FilesProvider({ children }) {
	return <>{children}</>;
}

export function useFiles() {
	const { files, setFiles } = useCrmData();
	const getFile = (id) => files.find((f) => f.id === id) ?? null;
	const addFile = (file) => setFiles((prev) => [file, ...prev]);
	return { files, getFile, addFile, hydrated: true };
}
