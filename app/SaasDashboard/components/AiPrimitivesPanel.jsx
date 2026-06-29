import React, { useEffect, useRef, useState } from "react";
import {
	Coins,
	Cpu,
	GitCompare,
	Info,
	Play,
	RotateCcw,
	Sparkles,
	Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	MODEL_OPTIONS,
	PROMPT_PAIRS,
	STREAM_DEMO_CHUNKS,
	USAGE_METERS,
} from "../saasDashboardSeedData";

function TokenBudgetIndicator() {
	const { used, limit } = USAGE_METERS.tokens;
	const pct = Math.round((used / limit) * 100);
	const remaining = limit - used;

	return (
		<Card className="border-primary/20">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Sparkles className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Token budget</CardTitle>
					</div>
					<Badge variant="outline" className="text-[10px]">
						This month
					</Badge>
				</div>
				<CardDescription>Per-user quota — you've used X of Y tokens</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-baseline justify-between">
					<div>
						<span className="text-3xl font-bold tabular-nums">
							{(used / 1000).toFixed(1)}k
						</span>
						<span className="text-muted-foreground">
							{" "}
							/ {(limit / 1000).toFixed(0)}k tokens
						</span>
					</div>
					<span
						className={cn(
							"text-sm font-medium",
							pct >= 85 ? "text-red-600" : pct >= 70 ? "text-amber-600" : "text-emerald-600"
						)}
					>
						{pct}% used
					</span>
				</div>
				<div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
					<div
						className={cn(
							"h-full rounded-full transition-all",
							pct >= 85 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-primary"
						)}
						style={{ width: `${pct}%` }}
					/>
				</div>
				<p className="mt-3 text-xs text-muted-foreground">
					<span className="font-medium text-foreground">
						{(remaining / 1000).toFixed(1)}k tokens
					</span>{" "}
					remaining · Resets Jul 1 · Overage billed at $0.002/1K
				</p>
			</CardContent>
		</Card>
	);
}

function ModelSelectorWithTooltip({ selectedModel, onSelect }) {
	const [hoveredId, setHoveredId] = useState(null);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center gap-2">
					<Cpu className="h-4 w-4 text-primary" />
					<CardTitle className="text-base font-semibold">Model selector</CardTitle>
				</div>
				<CardDescription>Hover for cost-per-token breakdown</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{MODEL_OPTIONS.map((model) => {
						const isSelected = selectedModel === model.id;
						const isHovered = hoveredId === model.id;
						return (
							<div key={model.id} className="relative">
								<button
									type="button"
									onClick={() => onSelect(model.id)}
									onMouseEnter={() => setHoveredId(model.id)}
									onMouseLeave={() => setHoveredId(null)}
									className={cn(
										"w-full rounded-xl border p-3 text-left transition-all",
										isSelected
											? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20"
											: "hover:border-muted-foreground/30 hover:bg-muted/30"
									)}
								>
									<p className="text-sm font-semibold">{model.label}</p>
									<p className="text-[10px] capitalize text-muted-foreground">
										{model.provider} · {model.context} context
									</p>
								</button>
								{isHovered && (
									<div className="absolute bottom-full left-0 z-10 mb-2 w-full rounded-lg border bg-popover p-3 shadow-lg">
										<p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
											<Coins className="h-3 w-3" />
											Cost per 1K tokens
										</p>
										<div className="mt-2 space-y-1 text-xs">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Input</span>
												<span className="font-mono font-medium">
													${model.inputPer1k.toFixed(5)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Output</span>
												<span className="font-mono font-medium">
													${model.outputPer1k.toFixed(5)}
												</span>
											</div>
											<div className="mt-1 border-t pt-1 flex justify-between">
												<span className="text-muted-foreground">Est. 1K in + 500 out</span>
												<span className="font-mono font-semibold text-primary">
													${(model.inputPer1k + model.outputPer1k * 0.5).toFixed(4)}
												</span>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
				<p className="mt-3 flex items-start gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
					<Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
					Production apps route automatically via complexity classifier — manual override
					available for admins.
				</p>
			</CardContent>
		</Card>
	);
}

function PromptSideBySideDiff() {
	const [left, right] = PROMPT_PAIRS;
	const leftLines = left.content.split("\n");
	const rightLines = right.content.split("\n");
	const maxLines = Math.max(leftLines.length, rightLines.length);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<GitCompare className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Prompt version diff</CardTitle>
					</div>
					<Badge variant="outline" className="gap-1 text-[10px]">
						Side-by-side
					</Badge>
				</div>
				<CardDescription>
					{right.version} → {left.version} · production rollout
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0">
				<div className="grid grid-cols-2 divide-x border-t">
					<div>
						<div className="border-b bg-red-500/10 px-3 py-2">
							<p className="text-xs font-semibold text-red-700 dark:text-red-300">
								{right.label} ({right.version})
							</p>
						</div>
						<div className="max-h-[220px] overflow-y-auto bg-zinc-950 p-3 font-mono text-[11px] leading-relaxed hidescrollbar">
							{leftLines.map((_, i) => {
								const l = rightLines[i];
								const r = leftLines[i];
								const changed = l !== r;
								if (l === undefined) return null;
								return (
									<div
										key={i}
										className={cn(
											"px-1 py-0.5",
											changed && "bg-red-950/40 text-red-300"
										)}
									>
										{l || " "}
									</div>
								);
							})}
						</div>
					</div>
					<div>
						<div className="border-b bg-emerald-500/10 px-3 py-2">
							<p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
								{left.label} ({left.version})
							</p>
						</div>
						<div className="max-h-[220px] overflow-y-auto bg-zinc-950 p-3 font-mono text-[11px] leading-relaxed hidescrollbar">
							{Array.from({ length: maxLines }).map((_, i) => {
								const l = rightLines[i];
								const r = leftLines[i];
								const changed = l !== r;
								if (r === undefined) return null;
								return (
									<div
										key={i}
										className={cn(
											"px-1 py-0.5",
											changed && "bg-emerald-950/40 text-emerald-300"
										)}
									>
										{r || " "}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function StreamingResponsePane() {
	const scrollRef = useRef(null);
	const [isStreaming, setIsStreaming] = useState(false);
	const [phase, setPhase] = useState("idle");
	const [content, setContent] = useState("");
	const [chunkIndex, setChunkIndex] = useState(0);
	const [showSkeleton, setShowSkeleton] = useState(false);

	const reset = () => {
		setIsStreaming(false);
		setPhase("idle");
		setContent("");
		setChunkIndex(0);
		setShowSkeleton(false);
	};

	const startStream = () => {
		reset();
		setIsStreaming(true);
		setPhase("connecting");
		setShowSkeleton(true);

		setTimeout(() => {
			setPhase("streaming");
			setShowSkeleton(false);
		}, 800);
	};

	useEffect(() => {
		if (phase !== "streaming") return undefined;

		const timer = setInterval(() => {
			setChunkIndex((prev) => {
				if (prev >= STREAM_DEMO_CHUNKS.length) {
					setPhase("done");
					setIsStreaming(false);
					clearInterval(timer);
					return prev;
				}
				setContent((c) => c + STREAM_DEMO_CHUNKS[prev]);
				return prev + 1;
			});
		}, 120);

		return () => clearInterval(timer);
	}, [phase]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [content, showSkeleton]);

	const renderContent = (text) => {
		return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				return (
					<strong key={i} className="font-semibold text-foreground">
						{part.slice(2, -2)}
					</strong>
				);
			}
			if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
				return (
					<em key={i} className="text-muted-foreground">
						{part.slice(1, -1)}
					</em>
				);
			}
			return part;
		});
	};

	return (
		<Card className="overflow-hidden">
			<CardHeader className="border-b pb-3">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div>
						<CardTitle className="text-base font-semibold">Streaming response (SSE)</CardTitle>
						<CardDescription>Skeleton → content — no blank screen</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						{phase !== "idle" && (
							<Badge
								variant="secondary"
								className={cn(
									"gap-1 text-[10px]",
									phase === "streaming" && "bg-emerald-500/15 text-emerald-600"
								)}
							>
								{phase === "connecting" && "Connecting…"}
								{phase === "streaming" && "Streaming"}
								{phase === "done" && "Complete"}
							</Badge>
						)}
						{isStreaming ? (
							<Button size="sm" variant="outline" onClick={reset}>
								<Square className="h-3 w-3" />
								Stop
							</Button>
						) : (
							<>
								{phase === "done" && (
									<Button size="sm" variant="ghost" onClick={reset}>
										<RotateCcw className="h-3 w-3" />
										Reset
									</Button>
								)}
								<Button size="sm" onClick={startStream}>
									<Play className="h-3 w-3" />
									Run demo stream
								</Button>
							</>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<div
					ref={scrollRef}
					className="min-h-[280px] max-h-[320px] overflow-y-auto bg-zinc-950 p-4 text-sm leading-relaxed text-zinc-200 hidescrollbar"
				>
					{phase === "idle" && (
						<p className="text-center text-zinc-500">
							Click "Run demo stream" to simulate SSE — skeleton loaders, then token-by-token
							content.
						</p>
					)}

					{showSkeleton && (
						<div className="space-y-3 animate-pulse">
							<div className="h-4 w-3/4 rounded bg-zinc-800" />
							<div className="h-4 w-full rounded bg-zinc-800" />
							<div className="h-4 w-5/6 rounded bg-zinc-800" />
							<div className="mt-4 h-4 w-2/3 rounded bg-zinc-800" />
							<div className="h-4 w-full rounded bg-zinc-800" />
						</div>
					)}

					{content && (
						<div className="whitespace-pre-wrap">{renderContent(content)}</div>
					)}

					{phase === "streaming" && (
						<span className="mt-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-emerald-400" />
					)}
				</div>
				<div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2 text-[10px] text-muted-foreground">
					<span>EventSource: /api/ai/stream</span>
					<span className="font-mono">
						{chunkIndex > 0 ? `${chunkIndex * 47} tokens · ~$0.012` : "—"}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}

export default function AiPrimitivesPanel() {
	const [selectedModel, setSelectedModel] = useState("gpt-4o");

	return (
		<div className="space-y-6">
			<div className="grid gap-4 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<StreamingResponsePane />
				</div>
				<TokenBudgetIndicator />
			</div>

			<ModelSelectorWithTooltip
				selectedModel={selectedModel}
				onSelect={setSelectedModel}
			/>

			<PromptSideBySideDiff />
		</div>
	);
}
