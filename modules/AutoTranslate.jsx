import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const AutoTranslate = ({ children }) => {
	const { i18n } = useTranslation();
	const rootRef = useRef(null);
	const originalTextMapRef = useRef(new WeakMap());
	const originalAttrMapRef = useRef(new WeakMap());
	const isTranslatingRef = useRef(false);
	const rafIdRef = useRef(null);
	const missingKeysRef = useRef(new Set());
	const missingLogTimerRef = useRef(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return undefined;
		const isDev = process.env.NODE_ENV !== "production";

		const queueMissingLog = () => {
			if (!isDev) return;
			if (missingLogTimerRef.current) return;

			missingLogTimerRef.current = window.setTimeout(() => {
				const missing = Array.from(missingKeysRef.current).sort();
				if (missing.length > 0) {
					const langCodes = Object.keys(i18n.options?.resources || {});
					const templates = {};
					langCodes.forEach((code) => {
						templates[code] = {};
					});
					missing.forEach((key) => {
						langCodes.forEach((code) => {
							templates[code][key] = key;
						});
					});

					console.groupCollapsed(
						`[i18n] Missing translation keys (${missing.length}) - add to locales/en.json`
					);
					console.table(missing.map((key) => ({ key })));
					langCodes.forEach((code) => {
						console.log(`[i18n] Copy-ready ${code.toUpperCase()} template:`, templates[code]);
					});
					console.groupEnd();
					window.__CRM_I18N_MISSING_KEYS__ = missing;
					window.__CRM_I18N_MISSING_TEMPLATES__ = templates;
				}
				missingLogTimerRef.current = null;
			}, 1200);
		};

		const trackMissingKey = (input, translations) => {
			if (!isDev || !input || typeof input !== "string") return;
			const normalized = input.trim().replace(/\s+/g, " ");
			if (!normalized) return;
			if (normalized.length < 2) return;
			if (/^\d+([.,:/-]\d+)*$/.test(normalized)) return;
			if (/[{}[\]<>]/.test(normalized)) return;
			if (translations[normalized]) return;

			missingKeysRef.current.add(normalized);
			queueMissingLog();
		};

		const isInsideNoTranslate = (el) => {
			if (!el || el.nodeType !== 1) return false;
			return el.closest?.("[data-no-translate], [translate='no']") != null;
		};

		const getTranslatedValue = (input, translations) => {
			if (!input || typeof input !== "string") return input;
			const trimmed = input.trim();
			if (!trimmed) return input;
			const translated = translations[trimmed];
			if (!translated) {
				trackMissingKey(trimmed, translations);
			}
			return translated && translated !== trimmed
				? input.replace(trimmed, translated)
				: input;
		};

		const translateAttributes = (translations) => {
			const selectors = "input, textarea, button, option, [title], [aria-label], [alt]";
			const nodes = root.querySelectorAll(selectors);
			const attrsToTranslate = ["placeholder", "title", "aria-label", "alt"];

			nodes.forEach((el) => {
				if (isInsideNoTranslate(el)) return;
				if (!originalAttrMapRef.current.has(el)) {
					const initialAttrs = {};
					attrsToTranslate.forEach((attr) => {
						const value = el.getAttribute(attr);
						if (value) initialAttrs[attr] = value;
					});
					originalAttrMapRef.current.set(el, initialAttrs);
				}

				const originalAttrs = originalAttrMapRef.current.get(el) || {};
				attrsToTranslate.forEach((attr) => {
					const originalValue = originalAttrs[attr];
					if (!originalValue) return;
					const nextValue = getTranslatedValue(originalValue, translations);
					if (el.getAttribute(attr) !== nextValue) {
						el.setAttribute(attr, nextValue);
					}
				});
			});
		};

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
						if (isInsideNoTranslate(parent)) {
							return NodeFilter.FILTER_REJECT;
						}
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
				const nextValue = getTranslatedValue(originalText, translations);

				if (currentNode.nodeValue !== nextValue) {
					currentNode.nodeValue = nextValue;
				}
				currentNode = walker.nextNode();
			}

			translateAttributes(translations);
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
			characterData: true,
			attributes: true,
			attributeFilter: ["placeholder", "title", "aria-label", "alt", "value"],
		});

		return () => {
			observer.disconnect();
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
			if (missingLogTimerRef.current) clearTimeout(missingLogTimerRef.current);
		};
	}, [i18n, i18n.language]);

	return <div ref={rootRef}>{children}</div>;
};

export default AutoTranslate;
