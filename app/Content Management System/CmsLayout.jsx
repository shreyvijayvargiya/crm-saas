import React from "react";
import { CmsProvider } from "./CmsContext";

export default function CmsLayout({ children }) {
	return <CmsProvider>{children}</CmsProvider>;
}
