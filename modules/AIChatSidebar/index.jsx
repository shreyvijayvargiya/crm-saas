import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
	Bot,
	Check,
	ChevronDown,
	History,
	Image as ImageIcon,
	Mic,
	MicOff,
	Paperclip,
	Send,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const MODELS = [
	{ id: "gpt-4o", label: "GPT-4o" },
	{ id: "claude-3-5", label: "Claude 3.5" },
	{ id: "gemini-pro", label: "Gemini Pro" },
	{ id: "llama-3", label: "Llama 3" },
];

const SAMPLE_PROMPTS = [
	"Summarize pipeline deals closing this week",
	"Draft a follow-up for cold leads",
	"List overdue tasks for my team",
	"Next steps for the ACME Corp deal",
];

const INITIAL_CHATS = [
	{
		id: "chat-1",
		title: "Pipeline this week",
		preview: "Summarize deals closing this week…",
		updatedAt: "Today",
		messages: [
			{
				id: "m1",
				role: "user",
				content: "Summarize pipeline deals closing this week",
			},
			{
				id: "m2",
				role: "assistant",
				content:
					"You have 4 deals closing this week totaling $128k. ACME Corp ($42k) and Northwind ($31k) are most likely to close. Want a follow-up draft for either?",
			},
		],
	},
	{
		id: "chat-2",
		title: "Cold lead follow-ups",
		preview: "Draft a follow-up for cold leads…",
		updatedAt: "Yesterday",
		messages: [
			{
				id: "m3",
				role: "user",
				content: "Draft a follow-up for cold leads",
			},
			{
				id: "m4",
				role: "assistant",
				content:
					"Subject: Quick check-in on your goals\n\nHi {{name}},\nI wanted to reconnect and see if now is a better time to explore how we can help with {{pain_point}}. Happy to share a short overview or book 15 minutes.\n\nBest,\n{{sender}}",
			},
		],
	},
	{
		id: "chat-3",
		title: "Overdue tasks",
		preview: "List overdue tasks for my team…",
		updatedAt: "Mon",
		messages: [
			{
				id: "m5",
				role: "user",
				content: "List overdue tasks for my team",
			},
			{
				id: "m6",
				role: "assistant",
				content:
					"3 overdue tasks: (1) Send proposal to Globex — Alex, 2 days late. (2) Update Q2 forecast — Sam, 1 day late. (3) Schedule demo with Initech — Jordan, 4 days late.",
			},
		],
	},
];

function createId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function useSpeechToText({ onResult, onError }) {
	const recognitionRef = useRef(null);
	const onResultRef = useRef(onResult);
	const onErrorRef = useRef(onError);
	const [listening, setListening] = useState(false);
	const [supported, setSupported] = useState(false);

	useEffect(() => {
		onResultRef.current = onResult;
		onErrorRef.current = onError;
	}, [onResult, onError]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		setSupported(Boolean(SpeechRecognition));
		if (!SpeechRecognition) return;

		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = true;
		recognition.lang = "en-US";

		recognition.onresult = (event) => {
			let finalText = "";
			let interimText = "";
			for (let i = 0; i < event.results.length; i++) {
				const chunk = event.results[i][0].transcript;
				if (event.results[i].isFinal) finalText += chunk;
				else interimText += chunk;
			}
			const text = (finalText || interimText).trim();
			if (text) onResultRef.current?.(text, Boolean(finalText));
		};
		recognition.onerror = (event) => {
			setListening(false);
			onErrorRef.current?.(event.error);
		};
		recognition.onend = () => setListening(false);

		recognitionRef.current = recognition;
		return () => {
			recognition.abort();
			recognitionRef.current = null;
		};
	}, []);

	const toggle = useCallback(() => {
		const recognition = recognitionRef.current;
		if (!recognition) {
			onErrorRef.current?.("unsupported");
			return;
		}
		if (listening) {
			recognition.stop();
			setListening(false);
			return;
		}
		try {
			recognition.start();
			setListening(true);
		} catch {
			setListening(false);
		}
	}, [listening]);

	return { listening, supported, toggle };
}

function ChatInput({
	message,
	onMessageChange,
	onSend,
	model,
	onModelChange,
	onPromptClick,
	showPrompts = false,
	disabled = false,
	className,
}) {
	const speechBaseRef = useRef("");

	const handleSpeechResult = useCallback(
		(transcript) => {
			const base = speechBaseRef.current.trim();
			onMessageChange(base ? `${base} ${transcript}` : transcript);
		},
		[onMessageChange]
	);

	const { listening, supported, toggle: toggleSpeech } = useSpeechToText({
		onResult: handleSpeechResult,
	});

	const toggle = () => {
		if (!listening) speechBaseRef.current = message;
		toggleSpeech();
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend?.();
		}
	};

	const canSend = message.trim().length > 0 && !disabled;

	return (
		<div className={cn("shrink-0 space-y-2 border-t border-border bg-background p-3", className)}>
			{showPrompts ? (
				<div className="flex flex-nowrap gap-1.5 overflow-x-auto hidescrollbar pb-0.5">
					{SAMPLE_PROMPTS.map((text) => (
						<Button
							key={text}
							type="button"
							variant="outline"
							size="sm"
							onClick={() => onPromptClick?.(text)}
							className="h-auto max-w-[200px] shrink-0 rounded-full px-2.5 py-1 text-left text-[10px] font-normal leading-tight text-muted-foreground"
						>
							{text}
						</Button>
					))}
				</div>
			) : null}

			<div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/40 p-2 focus-within:ring-2 focus-within:ring-ring">
				<Textarea
					rows={3}
					value={message}
					onChange={(e) => onMessageChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={listening ? "Listening…" : "Message AI assistant…"}
					disabled={disabled}
					className="min-h-[72px] resize-none border-0 bg-transparent px-2 py-1.5 text-xs shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
				<div className="flex items-center justify-between gap-1 border-t border-border pt-2">
					<div className="flex min-w-0 flex-1 items-center gap-0.5">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0"
							aria-label="Add image"
							disabled={disabled}
						>
							<ImageIcon className="h-4 w-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0"
							aria-label="Attach file"
							disabled={disabled}
						>
							<Paperclip className="h-4 w-4" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="h-8 max-w-full gap-1 px-2 text-[10px] font-normal"
									disabled={disabled}
								>
									<span className="truncate">
										{MODELS.find((m) => m.id === model)?.label}
									</span>
									<ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-40">
								<DropdownMenuLabel className="text-xs">Model</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{MODELS.map((m) => (
									<DropdownMenuItem
										key={m.id}
										onClick={() => onModelChange(m.id)}
										className="justify-between text-xs"
									>
										{m.label}
										{model === m.id ? <Check className="h-3.5 w-3.5" /> : null}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex shrink-0 items-center gap-1">
						<Button
							type="button"
							variant={listening ? "default" : "outline"}
							size="icon"
							className={cn(
								"h-9 w-9",
								listening && "animate-pulse bg-destructive text-destructive-foreground hover:bg-destructive/90"
							)}
							onClick={toggle}
							disabled={disabled || !supported}
							aria-label={listening ? "Stop listening" : "Speak message"}
							aria-pressed={listening}
							title={
								supported
									? listening
										? "Stop listening"
										: "Speak to type"
									: "Speech input not supported in this browser"
							}
						>
							{listening ? (
								<MicOff className="h-4 w-4" />
							) : (
								<Mic className="h-4 w-4" />
							)}
						</Button>
						<Button
							type="button"
							size="icon"
							className="h-9 w-9"
							onClick={onSend}
							disabled={!canSend}
							aria-label="Send message"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function MessageList({ messages, emptyTitle, emptyDescription }) {
	const endRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	if (!messages?.length) {
		return (
			<div className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-border px-4 text-center">
				<Bot className="mb-2 h-8 w-8 text-muted-foreground" />
				<p className="text-xs font-medium text-foreground">{emptyTitle}</p>
				{emptyDescription ? (
					<p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
						{emptyDescription}
					</p>
				) : null}
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={cn(
						"flex",
						msg.role === "user" ? "justify-end" : "justify-start"
					)}
				>
					<div
						className={cn(
							"max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap",
							msg.role === "user"
								? "bg-primary text-primary-foreground"
								: "border border-border bg-card text-card-foreground"
						)}
					>
						{msg.content}
					</div>
				</div>
			))}
			<div ref={endRef} />
		</div>
	);
}

function ChatHistoryMenu({ chats, activeChatId, onSelectChat, onNewChat }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					aria-label="Chat history"
				>
					<History className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-72">
				<DropdownMenuLabel className="flex items-center justify-between gap-2">
					<span>Chat history</span>
					<Badge variant="secondary" className="text-[10px] font-normal">
						{chats.length}
					</Badge>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onNewChat} className="text-xs font-medium">
					<Bot className="h-3.5 w-3.5" />
					New chat
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{chats.length === 0 ? (
					<div className="px-2 py-4 text-center text-xs text-muted-foreground">
						No chats yet
					</div>
				) : (
					chats.map((chat) => (
						<DropdownMenuItem
							key={chat.id}
							onClick={() => onSelectChat(chat.id)}
							className={cn(
								"flex flex-col items-start gap-0.5 py-2",
								activeChatId === chat.id && "bg-accent"
							)}
						>
							<div className="flex w-full items-center justify-between gap-2">
								<span className="truncate text-xs font-medium text-foreground">
									{chat.title}
								</span>
								<span className="shrink-0 text-[10px] text-muted-foreground">
									{chat.updatedAt}
								</span>
							</div>
							<span className="w-full truncate text-[10px] text-muted-foreground">
								{chat.preview}
							</span>
						</DropdownMenuItem>
					))
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ChatOverlay({ chat, model, onModelChange, onSend, onClose }) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!chat) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [chat]);

	if (!chat || typeof document === "undefined") return null;

	const handleSend = () => {
		const text = message.trim();
		if (!text) return;
		onSend(chat.id, text);
		setMessage("");
	};

	return createPortal(
		<div
			className="fixed inset-0 z-[80] flex flex-col bg-background"
			role="dialog"
			aria-modal="true"
			aria-label={chat.title}
		>
			<header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3">
				<div className="flex min-w-0 items-center gap-2">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
						<Bot className="h-4 w-4" />
					</div>
					<div className="min-w-0">
						<p className="truncate text-sm font-semibold text-foreground">
							{chat.title}
						</p>
						<p className="text-[10px] text-muted-foreground">
							{chat.updatedAt} · {MODELS.find((m) => m.id === model)?.label}
						</p>
					</div>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onClose}
					aria-label="Close chat"
				>
					<X className="h-4 w-4" />
				</Button>
			</header>

			<div className="min-h-0 flex-1 overflow-y-auto bg-muted/30 px-4 py-4 hidescrollbar">
				<div className="mx-auto max-w-2xl">
					<MessageList
						messages={chat.messages}
						emptyTitle="Start the conversation"
						emptyDescription="Send a message below to continue this chat."
					/>
				</div>
			</div>

			<div className="mx-auto w-full max-w-2xl">
				<ChatInput
					message={message}
					onMessageChange={setMessage}
					onSend={handleSend}
					model={model}
					onModelChange={onModelChange}
					onPromptClick={(text) =>
						setMessage((prev) => (prev ? `${prev} ${text}` : text))
					}
					showPrompts={!chat.messages?.length}
				/>
			</div>
		</div>,
		document.body
	);
}

const AIChatSidebar = ({ onClose }) => {
	const [chats, setChats] = useState(INITIAL_CHATS);
	const [activeChatId, setActiveChatId] = useState(null);
	const [overlayChatId, setOverlayChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [model, setModel] = useState(MODELS[0].id);

	const activeChat = chats.find((c) => c.id === activeChatId) ?? null;
	const overlayChat = chats.find((c) => c.id === overlayChatId) ?? null;

	const appendMessage = useCallback((chatId, text) => {
		const userMsg = {
			id: createId("msg"),
			role: "user",
			content: text,
		};
		const assistantMsg = {
			id: createId("msg"),
			role: "assistant",
			content:
				"Thanks — this is a demo reply. Connect a model to get live CRM answers for: “" +
				text.slice(0, 120) +
				(text.length > 120 ? "…" : "") +
				"”.",
		};

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
					messages: [...chat.messages, userMsg, assistantMsg],
				};
			})
		);
	}, []);

	const handleNewChat = () => {
		const chat = {
			id: createId("chat"),
			title: "New chat",
			preview: "Empty conversation",
			updatedAt: "Just now",
			messages: [],
		};
		setChats((prev) => [chat, ...prev]);
		setActiveChatId(chat.id);
		setOverlayChatId(chat.id);
		setMessage("");
	};

	const handleSelectChat = (chatId) => {
		setActiveChatId(chatId);
		setOverlayChatId(chatId);
	};

	const handleSidebarSend = () => {
		const text = message.trim();
		if (!text) return;

		let chatId = activeChatId;
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
		}

		appendMessage(chatId, text);
		setMessage("");
		setOverlayChatId(chatId);
	};

	return (
		<>
			<div className="flex h-full w-full min-w-0 flex-col bg-background text-foreground">
				<header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
					<div className="flex min-w-0 items-center gap-2">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
							<Bot className="h-4 w-4" />
						</div>
						<div className="min-w-0">
							<p className="truncate text-sm font-semibold text-foreground">
								AI Assistant
							</p>
							<p className="text-[10px] text-muted-foreground">
								CRM &amp; sales help
							</p>
						</div>
					</div>
					<div className="flex shrink-0 items-center gap-0.5">
						<ChatHistoryMenu
							chats={chats}
							activeChatId={activeChatId}
							onSelectChat={handleSelectChat}
							onNewChat={handleNewChat}
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8"
							onClick={onClose}
							aria-label="Close AI chat"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</header>

				<div className="min-h-0 flex-1 overflow-y-auto bg-muted/30 px-3 py-3 hidescrollbar">
					{activeChat ? (
						<button
							type="button"
							onClick={() => setOverlayChatId(activeChat.id)}
							className="mb-3 w-full rounded-xl border border-border bg-card p-3 text-left shadow-sm transition hover:bg-accent/40"
						>
							<div className="flex items-center justify-between gap-2">
								<p className="truncate text-xs font-semibold text-foreground">
									{activeChat.title}
								</p>
								<span className="shrink-0 text-[10px] text-muted-foreground">
									Open
								</span>
							</div>
							<p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">
								{activeChat.preview}
							</p>
						</button>
					) : null}
					<MessageList
						messages={activeChat?.messages}
						emptyTitle="Ask about leads, deals, and tasks"
						emptyDescription="Pick a chat from history or send a message to start. Connection to a live model is not configured."
					/>
				</div>

				<ChatInput
					message={message}
					onMessageChange={setMessage}
					onSend={handleSidebarSend}
					model={model}
					onModelChange={setModel}
					onPromptClick={(text) =>
						setMessage((prev) => (prev ? `${prev} ${text}` : text))
					}
					showPrompts={!activeChat?.messages?.length}
				/>
			</div>

			{overlayChat ? (
				<ChatOverlay
					chat={overlayChat}
					model={model}
					onModelChange={setModel}
					onSend={appendMessage}
					onClose={() => setOverlayChatId(null)}
				/>
			) : null}
		</>
	);
};

export default AIChatSidebar;
