import React, { createContext, useContext } from "react";
import { initialSubscribers } from "./cmsSeedData";
import { useCrmData } from "@/utils/CrmDataContext";

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
	const crm = useCrmData();
	const value = {
		blogs: crm.blogs,
		newsletters: crm.newsletters,
		subscribers: initialSubscribers,
		hydrated: true,
		getBlog: (id) => crm.blogs.find((b) => b.id === Number(id)) ?? null,
		getNewsletter: (id) => crm.newsletters.find((n) => n.id === Number(id)) ?? null,
		updateBlog: (id, patch) => {
			crm.setBlogs((prev) =>
				prev.map((b) => (b.id === Number(id) ? { ...b, ...patch } : b))
			);
		},
		addBlog: (blog) => crm.setBlogs((prev) => [blog, ...prev]),
		addNewsletter: (newsletter) => crm.setNewsletters((prev) => [newsletter, ...prev]),
		updateNewsletter: (id, patch) => {
			crm.setNewsletters((prev) =>
				prev.map((n) => (n.id === Number(id) ? { ...n, ...patch } : n))
			);
		},
	};
	return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
	const ctx = useContext(CmsContext);
	if (!ctx) throw new Error("useCms must be used within CmsProvider");
	return ctx;
}
