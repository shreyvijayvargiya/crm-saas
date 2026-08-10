import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowUp,
	AudioLines,
	Check,
	ChevronDown,
	Code2,
	FileText,
	Globe,
	Image as ImageIcon,
	Mic,
	Paperclip,
	Plug,
	Plus,
	Square,
	Volume2,
	Wrench,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TOOLS = [
	{ id: "search", label: "Web search", hint: "Look up live info" },
	{ id: "canvas", label: "Canvas", hint: "Draft long-form side by side" },
	{ id: "research", label: "Deep research", hint: "Multi-step investigation" },
];

const CONNECTORS = [
	{ id: "github", label: "GitHub", connected: true },
	{ id: "notion", label: "Notion", connected: false },
	{ id: "slack", label: "Slack", connected: false },
	{ id: "drive", label: "Google Drive", connected: true },
];

function Menu({ open, onClose, align = "left", children }) {
	if (!open) return null;
	return (
		<>
			<button type="button" className="fixed inset-0 z-30 cursor-default" onClick={onClose} aria-label="Close menu" />
			<motion.div
				initial={{ opacity: 0, y: 6, scale: 0.98 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 4, scale: 0.98 }}
				transition={{ duration: 0.16 }}
				className={cn(
					"absolute bottom-[calc(100%+8px)] z-40 min-w-[14rem] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl",
					align === "right" ? "right-0" : "left-0"
				)}
			>
				{children}
			</motion.div>
		</>
	);
}

function MenuItem({ icon: Icon, label, hint, onClick, trailing }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-zinc-800 hover:bg-zinc-100"
		>
			{Icon ? <Icon className="h-4 w-4 shrink-0 text-zinc-500" /> : null}
			<span className="min-w-0 flex-1">
				<span className="block font-medium">{label}</span>
				{hint ? <span className="block text-[11px] text-zinc-400">{hint}</span> : null}
			</span>
			{trailing}
		</button>
	);
}

/**
 * HeroClaudeChatInput — Claude-style composer: attach, code, TTS/STT,
 * connectors, tools, and send. Frontend-only.
 */
export default function HeroClaudeChatInput({ isLight = true, className }) {
	const fileRef = useRef(null);
	const taRef = useRef(null);
	const recRef = useRef(null);

	const [text, setText] = useState("");
	const [files, setFiles] = useState([]);
	const [codeOpen, setCodeOpen] = useState(false);
	const [code, setCode] = useState("function hello() {\n  return \"world\";\n}");
	const [menu, setMenu] = useState(null);
	const [tools, setTools] = useState(["search"]);
	const [connectors, setConnectors] = useState(
		CONNECTORS.filter((c) => c.connected).map((c) => c.id)
	);
	const [listening, setListening] = useState(false);
	const [speaking, setSpeaking] = useState(false);
	const [sent, setSent] = useState([]);
	const [toast, setToast] = useState("");

	const ping = (msg) => {
		setToast(msg);
		window.setTimeout(() => setToast(""), 1600);
	};

	useEffect(() => {
		const el = taRef.current;
		if (!el) return;
		el.style.height = "0px";
		el.style.height = `${Math.min(180, Math.max(52, el.scrollHeight))}px`;
	}, [text]);

	const addFiles = (list) => {
		const next = Array.from(list || []).map((f) => ({
			id: `${f.name}-${f.size}-${Date.now()}`,
			name: f.name,
			size: f.size,
			type: f.type || "file",
		}));
		if (!next.length) return;
		setFiles((prev) => [...prev, ...next]);
	};

	const addFakeFile = (kind) => {
		const map = {
			doc: { name: "brief.pdf", type: "application/pdf", size: 182000 },
			image: { name: "moodboard.png", type: "image/png", size: 640000 },
			code: { name: "schema.ts", type: "text/typescript", size: 4200 },
		};
		const f = map[kind];
		setFiles((prev) => [...prev, { id: `${f.name}-${Date.now()}`, ...f }]);
		setMenu(null);
	};

	const toggleTool = (id) => {
		setTools((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
	};

	const toggleConnector = (id) => {
		setConnectors((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
		);
	};

	const speak = () => {
		if (typeof window === "undefined" || !window.speechSynthesis) {
			ping("Speech synthesis not available");
			return;
		}
		window.speechSynthesis.cancel();
		const payload = [text, codeOpen ? code : ""].filter(Boolean).join("\n");
		if (!payload.trim()) {
			ping("Nothing to read");
			return;
		}
		const u = new SpeechSynthesisUtterance(payload);
		u.onend = () => setSpeaking(false);
		u.onerror = () => setSpeaking(false);
		setSpeaking(true);
		window.speechSynthesis.speak(u);
	};

	const stopSpeak = () => {
		window.speechSynthesis?.cancel();
		setSpeaking(false);
	};

	const toggleListen = () => {
		const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SR) {
			ping("Speech recognition not available");
			return;
		}
		if (listening && recRef.current) {
			recRef.current.stop();
			setListening(false);
			return;
		}
		const rec = new SR();
		rec.lang = "en-US";
		rec.interimResults = true;
		rec.onresult = (e) => {
			const chunk = Array.from(e.results)
				.map((r) => r[0].transcript)
				.join(" ");
			setText((prev) => (prev ? `${prev} ${chunk}` : chunk).replace(/\s+/g, " "));
		};
		rec.onend = () => setListening(false);
		rec.onerror = () => setListening(false);
		recRef.current = rec;
		rec.start();
		setListening(true);
	};

	const send = () => {
		const body = text.trim();
		if (!body && !files.length && !codeOpen) return;
		setSent((prev) => [
			{
				id: String(Date.now()),
				body,
				files: files.map((f) => f.name),
				code: codeOpen ? code : null,
				tools: [...tools],
				connectors: [...connectors],
			},
			...prev,
		].slice(0, 4));
		setText("");
		setFiles([]);
		setCodeOpen(false);
		ping("Sent");
	};

	return (
		<section
			className={cn("mx-auto w-full max-w-2xl px-4 py-10", className)}
			aria-label="Claude-style chat input"
		>
			{sent.length ? (
				<div className="mb-4 space-y-2">
					{sent.map((m) => (
						<div
							key={m.id}
							className={cn(
								"rounded-2xl border px-3 py-2 text-sm",
								isLight ? "border-zinc-200 bg-white text-zinc-700" : "border-zinc-800 bg-zinc-900 text-zinc-200"
							)}
						>
							<p className="whitespace-pre-wrap">{m.body || "(attachments only)"}</p>
							{m.files.length ? (
								<p className="mt-1 text-[11px] text-zinc-400">{m.files.join(" · ")}</p>
							) : null}
						</div>
					))}
				</div>
			) : null}

			<div
				className={cn(
					"relative rounded-[1.6rem] border shadow-sm",
					isLight ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-950"
				)}
			>
				{files.length ? (
					<div className="flex flex-wrap gap-1.5 px-3 pt-3">
						{files.map((f) => (
							<span
								key={f.id}
								className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-700"
							>
								<FileText className="h-3 w-3" />
								{f.name}
								<button type="button" onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))}>
									<X className="h-3 w-3 text-zinc-400" />
								</button>
							</span>
						))}
					</div>
				) : null}

				{codeOpen ? (
					<div className="px-3 pt-3">
						<div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950">
							<div className="flex items-center justify-between px-3 py-1.5 text-[11px] text-zinc-400">
								<span>code snippet</span>
								<button type="button" onClick={() => setCodeOpen(false)} className="hover:text-white">
									Remove
								</button>
							</div>
							<textarea
								value={code}
								onChange={(e) => setCode(e.target.value)}
								spellCheck={false}
								className="h-28 w-full resize-none bg-transparent px-3 pb-3 font-mono text-xs text-zinc-100 outline-none"
							/>
						</div>
					</div>
				) : null}

				<textarea
					ref={taRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							send();
						}
					}}
					placeholder="How can I help you today?"
					rows={2}
					className={cn(
						"w-full resize-none bg-transparent px-4 pb-2 pt-3 text-[15px] outline-none",
						isLight ? "text-zinc-900 placeholder:text-zinc-400" : "text-zinc-50 placeholder:text-zinc-500"
					)}
				/>

				<div className="flex items-center gap-1 px-2 pb-2">
					<div className="relative">
						<button
							type="button"
							onClick={() => setMenu((m) => (m === "add" ? null : "add"))}
							className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
							aria-label="Add"
						>
							<Plus className="h-4 w-4" />
						</button>
						<AnimatePresence>
							{menu === "add" ? (
								<Menu open onClose={() => setMenu(null)}>
									<MenuItem
										icon={Paperclip}
										label="Upload file"
										hint="PDF, images, docs"
										onClick={() => {
											fileRef.current?.click();
											setMenu(null);
										}}
									/>
									<MenuItem
										icon={ImageIcon}
										label="Attach image"
										onClick={() => addFakeFile("image")}
									/>
									<MenuItem
										icon={FileText}
										label="Attach document"
										onClick={() => addFakeFile("doc")}
									/>
									<MenuItem
										icon={Code2}
										label="Add code snippet"
										onClick={() => {
											setCodeOpen(true);
											setMenu(null);
										}}
									/>
								</Menu>
							) : null}
						</AnimatePresence>
					</div>

					<div className="relative">
						<button
							type="button"
							onClick={() => setMenu((m) => (m === "plugins" ? null : "plugins"))}
							className={cn(
								"inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium",
								connectors.length
									? "bg-zinc-900 text-white"
									: "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
							)}
						>
							<Plug className="h-3.5 w-3.5" />
							Connect
							<ChevronDown className="h-3 w-3 opacity-70" />
						</button>
						<AnimatePresence>
							{menu === "plugins" ? (
								<Menu open onClose={() => setMenu(null)}>
									{CONNECTORS.map((c) => {
										const on = connectors.includes(c.id);
										return (
											<MenuItem
												key={c.id}
												icon={Plug}
												label={c.label}
												hint={on ? "Connected" : "Click to connect"}
												onClick={() => toggleConnector(c.id)}
												trailing={on ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : null}
											/>
										);
									})}
								</Menu>
							) : null}
						</AnimatePresence>
					</div>

					<div className="relative">
						<button
							type="button"
							onClick={() => setMenu((m) => (m === "tools" ? null : "tools"))}
							className={cn(
								"inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium",
								tools.length
									? "bg-zinc-100 text-zinc-900"
									: "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
							)}
						>
							<Wrench className="h-3.5 w-3.5" />
							Tools
							<ChevronDown className="h-3 w-3 opacity-70" />
						</button>
						<AnimatePresence>
							{menu === "tools" ? (
								<Menu open onClose={() => setMenu(null)}>
									{TOOLS.map((t) => {
										const on = tools.includes(t.id);
										return (
											<MenuItem
												key={t.id}
												icon={t.id === "search" ? Globe : Wrench}
												label={t.label}
												hint={t.hint}
												onClick={() => toggleTool(t.id)}
												trailing={on ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : null}
											/>
										);
									})}
								</Menu>
							) : null}
						</AnimatePresence>
					</div>

					<div className="ml-auto flex items-center gap-0.5">
						<button
							type="button"
							onClick={toggleListen}
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-full",
								listening ? "bg-rose-500 text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
							)}
							aria-label="Speech to text"
						>
							{listening ? <AudioLines className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
						</button>
						<button
							type="button"
							onClick={speaking ? stopSpeak : speak}
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-full",
								speaking ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
							)}
							aria-label="Text to speech"
						>
							{speaking ? <Square className="h-3.5 w-3.5" /> : <Volume2 className="h-4 w-4" />}
						</button>
						<button
							type="button"
							onClick={send}
							disabled={!text.trim() && !files.length && !codeOpen}
							className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white disabled:opacity-30"
							aria-label="Send"
						>
							<ArrowUp className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			<input
				ref={fileRef}
				type="file"
				multiple
				hidden
				onChange={(e) => {
					addFiles(e.target.files);
					e.target.value = "";
				}}
			/>

			<p className="mt-3 text-center text-[11px] text-zinc-400">
				Enter to send · Shift+Enter for newline · mic + speaker use the Web Speech API
			</p>

			<AnimatePresence>
				{toast ? (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-white"
					>
						{toast}
					</motion.div>
				) : null}
			</AnimatePresence>
		</section>
	);
}
