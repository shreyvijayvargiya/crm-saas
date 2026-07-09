import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { buildActionLinks } from "@/lib/ai/actionLinks";
import { useCrmData } from "@/utils/CrmDataContext";

const STORAGE_KEY = "crm-ai-chats-v1";

function createId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadStoredChats() {
	if (typeof window === "undefined") return { chats: [], activeChatId: null };
	try {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return { chats: [], activeChatId: null };
		const parsed = JSON.parse(raw);
		return {
			chats: Array.isArray(parsed.chats) ? parsed.chats : [],
			activeChatId: parsed.activeChatId ?? null,
		};
	} catch {
		return { chats: [], activeChatId: null };
	}
}

const AIChatContext = createContext(null);

export function AIChatProvider({ children }) {
	const { getSnapshot, applySnapshot } = useCrmData();
	const [chats, setChats] = useState([]);
	const [activeChatId, setActiveChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const stored = loadStoredChats();
		setChats(stored.chats);
		setActiveChatId(stored.activeChatId);
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated || typeof window === "undefined") return;
		sessionStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ chats, activeChatId })
		);
	}, [chats, activeChatId, hydrated]);

	const activeChat = useMemo(
		() => chats.find((c) => c.id === activeChatId) ?? null,
		[chats, activeChatId]
	);

	const sendToApi = useCallback(
		async (chatId, text, priorMessages) => {
			const userMsg = { id: createId("msg"), role: "user", content: text };
			const history = [
				...priorMessages
					.filter((m) => m.role === "user" || m.role === "assistant")
					.map((m) => ({ role: m.role, content: m.content })),
				{ role: "user", content: text },
			];

			setChats((prev) =>
				prev.map((chat) => {
					if (chat.id !== chatId) return chat;
					return {
						...chat,
						title:
							chat.messages.length === 0
								? text.slice(0, 40) + (text.length > 40 ? "…" : "")
								: chat.title,
						preview: text.slice(0, 48) + (text.length > 48 ? "…" : ""),
						updatedAt: "Just now",
						messages: [...chat.messages, userMsg],
					};
				})
			);

			setLoading(true);

			try {
				const pageContext =
					typeof window !== "undefined"
						? { path: window.location.pathname }
						: {};

				const res = await fetch("/api/ai/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						messages: history,
						crmSnapshot: getSnapshot(),
						pageContext,
					}),
				});

				const data = await res.json().catch(() => ({}));

				if (!res.ok) {
					throw new Error(data.error || "Failed to get a response");
				}

				if (data.crmSnapshot) {
					applySnapshot(data.crmSnapshot);
				}

				const actions = buildActionLinks(data.toolCalls);

				const assistantMsg = {
					id: createId("msg"),
					role: "assistant",
					content: data.content,
					actions,
				};

				setChats((prev) =>
					prev.map((chat) => {
						if (chat.id !== chatId) return chat;
						return {
							...chat,
							messages: [...chat.messages, assistantMsg],
						};
					})
				);
			} catch (err) {
				const errorMsg = {
					id: createId("msg"),
					role: "error",
					content:
						err?.message ||
						"Something went wrong. Add OPENROUTER_API_KEY to your server env and try again.",
				};
				setChats((prev) =>
					prev.map((chat) => {
						if (chat.id !== chatId) return chat;
						return {
							...chat,
							messages: [...chat.messages, errorMsg],
						};
					})
				);
			} finally {
				setLoading(false);
			}
		},
		[getSnapshot, applySnapshot]
	);

	const handleNewChat = useCallback(() => {
		const chat = {
			id: createId("chat"),
			title: "New chat",
			preview: "Empty conversation",
			updatedAt: "Just now",
			messages: [],
		};
		setChats((prev) => [chat, ...prev]);
		setActiveChatId(chat.id);
		setMessage("");
	}, []);

	const handleSelectChat = useCallback((chatId) => {
		setActiveChatId(chatId);
		setMessage("");
	}, []);

	const handleSend = useCallback(() => {
		const text = message.trim();
		if (!text || loading) return;

		let chatId = activeChatId;
		let priorMessages = activeChat?.messages ?? [];

		if (!chatId) {
			chatId = createId("chat");
			const chat = {
				id: chatId,
				title: text.slice(0, 40) + (text.length > 40 ? "…" : ""),
				preview: text.slice(0, 48) + (text.length > 48 ? "…" : ""),
				updatedAt: "Just now",
				messages: [],
			};
			setChats((prev) => [chat, ...prev]);
			setActiveChatId(chatId);
			priorMessages = [];
		}

		setMessage("");
		sendToApi(chatId, text, priorMessages);
	}, [message, loading, activeChatId, activeChat, sendToApi]);

	const value = useMemo(
		() => ({
			chats,
			activeChatId,
			activeChat,
			message,
			setMessage,
			loading,
			handleNewChat,
			handleSelectChat,
			handleSend,
		}),
		[
			chats,
			activeChatId,
			activeChat,
			message,
			loading,
			handleNewChat,
			handleSelectChat,
			handleSend,
		]
	);

	return (
		<AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>
	);
}

export function useAIChat() {
	const ctx = useContext(AIChatContext);
	if (!ctx) {
		throw new Error("useAIChat must be used within AIChatProvider");
	}
	return ctx;
}
