import React from "react";
import { FilesProvider } from "./FilesContext";

export default function FilesLayout({ children }) {
	return <FilesProvider>{children}</FilesProvider>;
}
