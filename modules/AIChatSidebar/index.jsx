import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
	Bot,
	ChevronDown,
	ExternalLink,
	History,
	Image as ImageIcon,
	Lightbulb,
	Link2,
	Loader2,
	Mic,
	MicOff,
	Paperclip,
	Plus,
	Send,
	Sparkles,
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
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChatMarkdown } from "@/components/ui/chat-markdown";
import { PROMPT_TEMPLATES } from "@/lib/ai/promptTemplates";
import { useAIChat } from "@/utils/AIChatContext";

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

function PromptsDropdown({ onSelect, disabled }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={disabled}
					className="h-8 gap-1.5 px-2.5 text-[10px] font-normal text-muted-foreground"
				>
					<Lightbulb className="h-3.5 w-3.5 shrink-0" />
					Suggested prompts
					<ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-72">
				<DropdownMenuLabel className="text-xs">CRM prompts</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{PROMPT_TEMPLATES.map((group) => (
					<DropdownMenuSub key={group.category}>
						<DropdownMenuSubTrigger className="text-xs">
							{group.category}
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent className="w-80">
							{group.prompts.map((prompt) => (
								<DropdownMenuItem
									key={prompt}
									onClick={() => onSelect?.(prompt)}
									className="whitespace-normal text-xs leading-snug"
								>
									{prompt}
								</DropdownMenuItem>
							))}
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ChatInput({
	message,
	onMessageChange,
	onSend,
	onPromptSelect,
	showPrompts = false,
	disabled = false,
	loading = false,
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

	const canSend = message.trim().length > 0 && !disabled && !loading;

	return (
		<div className={cn("shrink-0 space-y-2 bg-background p-3", className)}>
			{showPrompts ? (
				<div className="flex items-center gap-2">
					<PromptsDropdown
						onSelect={(text) => onPromptSelect?.(text)}
						disabled={disabled || loading}
					/>
				</div>
			) : null}

			<div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/40 p-2 focus-within:ring-2 focus-within:ring-ring">
				<Textarea
					rows={3}
					value={message}
					onChange={(e) => onMessageChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={listening ? "Listening…" : "Message AI assistant…"}
					disabled={disabled || loading}
					className="min-h-[72px] resize-none border-0 bg-transparent px-2 py-1.5 text-xs shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
				<div className="flex items-center justify-between gap-1 pt-2">
					<div className="flex min-w-0 flex-1 items-center gap-0.5">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 shrink-0"
							aria-label="Attach file"
							disabled={disabled || loading}
						>
							<Paperclip className="h-4 w-4" />
						</Button>
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
							disabled={disabled || loading || !supported}
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
							{loading ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Send className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function MessageList({ messages, emptyTitle, emptyDescription, loading }) {
	const endRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, loading]);

	if (!messages?.length && !loading) {
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
			{messages?.map((msg) => (
				<div
					key={msg.id}
					className={cn(
						"flex",
						msg.role === "user" ? "justify-end" : "justify-start"
					)}
				>
					<div
						className={cn(
							"max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
							msg.role === "user"
								? "bg-primary text-primary-foreground"
								: msg.role === "error"
									? "border border-destructive/40 bg-destructive/10 text-destructive whitespace-pre-wrap"
									: "border border-border bg-card text-card-foreground"
						)}
					>
						{msg.role === "error" ? (
							msg.content
						) : (
							<ChatMarkdown
								content={msg.content}
								inverted={msg.role === "user"}
							/>
						)}
						{msg.actions?.length > 0 ? (
							<div className="mt-2 flex flex-wrap gap-1.5 pt-2">
								{msg.actions.map((action) => (
									<Link key={action.href} href={action.href} passHref>
										<Button
											type="button"
											variant="secondary"
											size="sm"
											className="h-7 gap-1 px-2 text-[10px]"
										>
											<Link2 className="h-3 w-3" />
											{action.label}
										</Button>
									</Link>
								))}
							</div>
						) : null}
					</div>
				</div>
			))}
			{loading ? (
				<div className="flex justify-start">
					<div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
						<Loader2 className="h-3.5 w-3.5 animate-spin" />
						Thinking…
					</div>
				</div>
			) : null}
			<div ref={endRef} />
		</div>
	);
}

function ChatHistoryMenu({ chats, activeChatId, onSelectChat }) {
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
				{chats.length === 0 ? (
					<div className="px-2 py-4 text-center text-xs text-muted-foreground">
						No chats yet — start a new one
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

const AIChatSidebar = ({ onClose }) => {
	const {
		chats,
		activeChatId,
		activeChat,
		message,
		setMessage,
		loading,
		handleNewChat,
		handleSelectChat,
		handleSend,
	} = useAIChat();

	return (
		<div className="flex h-full w-full min-w-0 flex-col bg-background text-foreground">
			<header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
				<div className="flex min-w-0 items-center gap-2">
					<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
						<Bot className="h-4 w-4" />
					</div>
					<div className="min-w-0">
						<p className="truncate text-sm font-semibold text-foreground">
							{activeChat?.title ?? "AI Assistant"}
						</p>
						<p className="text-[10px] text-muted-foreground">
							Leads · Deals · Pipeline · Tasks · Activity
						</p>
					</div>
				</div>
				<div className="flex shrink-0 items-center gap-0.5">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={handleNewChat}
						aria-label="New chat"
						title="New chat"
					>
						<Plus className="h-4 w-4" />
					</Button>
					<ChatHistoryMenu
						chats={chats}
						activeChatId={activeChatId}
						onSelectChat={handleSelectChat}
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
				<MessageList
					messages={activeChat?.messages}
					emptyTitle="Ask about leads, deals, and tasks"
					emptyDescription="Start a new chat or pick one from history. Use suggested prompts or type a question."
					loading={loading}
				/>
			</div>

			<ChatInput
				message={message}
				onMessageChange={setMessage}
				onSend={handleSend}
				onPromptSelect={setMessage}
				showPrompts={!activeChat?.messages?.length}
				disabled={loading}
				loading={loading}
			/>
		</div>
	);
};

export default AIChatSidebar;
