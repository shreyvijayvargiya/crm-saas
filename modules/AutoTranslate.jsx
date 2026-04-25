import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const AutoTranslate = ({ children }) => {
	const { i18n } = useTranslation();
	const rootRef = useRef(null);
	const originalTextMapRef = useRef(new WeakMap());
	const isTranslatingRef = useRef(false);
	const rafIdRef = useRef(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return undefined;

		const translateNodeTree = () => {
			if (isTranslatingRef.current) return;
			isTranslatingRef.current = true;

			const translations = i18n.getResourceBundle(i18n.language, "translation") || {};
			const walker = document.createTreeWalker(
				root,
				NodeFilter.SHOW_TEXT,
				{
					acceptNode: (node) => {
						if (!node?.nodeValue) return NodeFilter.FILTER_REJECT;
						const parent = node.parentElement;
						if (!parent) return NodeFilter.FILTER_REJECT;
						if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
							return NodeFilter.FILTER_REJECT;
						}
						if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
						return NodeFilter.FILTER_ACCEPT;
					},
				}
			);

			let currentNode = walker.nextNode();
			while (currentNode) {
				if (!originalTextMapRef.current.has(currentNode)) {
					originalTextMapRef.current.set(currentNode, currentNode.nodeValue);
				}

				const originalText = originalTextMapRef.current.get(currentNode);
				const trimmed = originalText.trim();
				const translated = translations[trimmed];

				const nextValue =
					translated && translated !== trimmed
						? originalText.replace(trimmed, translated)
						: originalText;

				if (currentNode.nodeValue !== nextValue) {
					currentNode.nodeValue = nextValue;
				}
				currentNode = walker.nextNode();
			}

			isTranslatingRef.current = false;
		};

		translateNodeTree();

		const observer = new MutationObserver(() => {
			if (isTranslatingRef.current) return;
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = requestAnimationFrame(() => {
				translateNodeTree();
			});
		});

		observer.observe(root, {
			childList: true,
			subtree: true,
		});

		return () => {
			observer.disconnect();
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
		};
	}, [i18n, i18n.language]);

	return <div ref={rootRef}>{children}</div>;
};

export default AutoTranslate;
