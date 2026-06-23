import React, { createContext, useContext, useEffect, useState } from "react";
import {
	initialBlogs,
	initialNewsletters,
	initialSubscribers,
} from "./cmsSeedData";

const CMS_STORAGE_KEY = "cms-data";

function loadStored() {
	if (typeof window === "undefined") {
		return {
			blogs: initialBlogs,
			newsletters: initialNewsletters,
		};
	}
	try {
		const raw = localStorage.getItem(CMS_STORAGE_KEY);
		if (!raw) return { blogs: initialBlogs, newsletters: initialNewsletters };
		const parsed = JSON.parse(raw);
		return {
			blogs: parsed.blogs ?? initialBlogs,
			newsletters: parsed.newsletters ?? initialNewsletters,
		};
	} catch {
		return { blogs: initialBlogs, newsletters: initialNewsletters };
	}
}

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
	const [hydrated, setHydrated] = useState(false);
	const [blogs, setBlogs] = useState(initialBlogs);
	const [newsletters, setNewsletters] = useState(initialNewsletters);
	const [subscribers] = useState(initialSubscribers);

	useEffect(() => {
		const stored = loadStored();
		setBlogs(stored.blogs);
		setNewsletters(stored.newsletters);
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		localStorage.setItem(
			CMS_STORAGE_KEY,
			JSON.stringify({ blogs, newsletters })
		);
	}, [blogs, newsletters, hydrated]);

	const getBlog = (id) => blogs.find((b) => b.id === Number(id)) ?? null;

	const getNewsletter = (id) =>
		newsletters.find((n) => n.id === Number(id)) ?? null;

	const updateBlog = (id, patch) => {
		setBlogs((prev) =>
			prev.map((b) => (b.id === Number(id) ? { ...b, ...patch } : b))
		);
	};

	const addBlog = (blog) => {
		setBlogs((prev) => [blog, ...prev]);
	};

	const updateNewsletter = (id, patch) => {
		setNewsletters((prev) =>
			prev.map((n) => (n.id === Number(id) ? { ...n, ...patch } : n))
		);
	};

	return (
		<CmsContext.Provider
			value={{
				blogs,
				newsletters,
				subscribers,
				hydrated,
				getBlog,
				getNewsletter,
				updateBlog,
				addBlog,
				updateNewsletter,
			}}
		>
			{children}
		</CmsContext.Provider>
	);
}

export function useCms() {
	const ctx = useContext(CmsContext);
	if (!ctx) throw new Error("useCms must be used within CmsProvider");
	return ctx;
}
