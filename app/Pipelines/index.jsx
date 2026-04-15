import React, { useState, useMemo } from "react";
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	useDraggable,
	useDroppable,
} from "@dnd-kit/core";
import {
	GripVertical,
	Building2,
	Plus,
	Clock,
	Activity,
	Flame,
	Zap,
	CircleDot,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const STAGES = [
	{
		id: "prospect",
		label: "Prospect",
		accent: "border-l-sky-500",
		badge: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/20",
		ring: "ring-sky-500/20",
	},
	{
		id: "qualified",
		label: "Qualified",
		accent: "border-l-blue-500",
		badge: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/20",
		ring: "ring-blue-500/20",
	},
	{
		id: "proposal",
		label: "Proposal",
		accent: "border-l-amber-500",
		badge: "bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-500/20",
		ring: "ring-amber-500/20",
	},
	{
		id: "won",
		label: "Won",
		accent: "border-l-emerald-500",
		badge: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/20",
		ring: "ring-emerald-500/20",
	},
	{
		id: "lost",
		label: "Lost",
		accent: "border-l-rose-500",
		badge: "bg-rose-500/15 text-rose-800 dark:text-rose-200 border-rose-500/20",
		ring: "ring-rose-500/20",
	},
];

const PRIORITY_META = {
	high: {
		label: "High",
		icon: Flame,
		className: "bg-rose-500/12 text-rose-700 dark:text-rose-300 border-rose-500/25",
		bar: "bg-rose-500",
	},
	medium: {
		label: "Med",
		icon: Zap,
		className: "bg-amber-500/12 text-amber-800 dark:text-amber-200 border-amber-500/25",
		bar: "bg-amber-500",
	},
	low: {
		label: "Low",
		icon: CircleDot,
		className: "bg-zinc-500/12 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
		bar: "bg-zinc-400",
	},
};

const INITIAL_DEALS = [
	{
		id: "d1",
		title: "Northwind expansion",
		company: "Northwind Ltd",
		value: 42000,
		owner: "AC",
		stage: "qualified",
		priority: "high",
		lastActivity: "Apr 14 · Call logged",
		daysInStage: 5,
		tag: "Enterprise",
	},
	{
		id: "d2",
		title: "API enterprise tier",
		company: "Cloud Corp",
		value: 89000,
		owner: "SR",
		stage: "prospect",
		priority: "high",
		lastActivity: "Apr 15 · Email opened",
		daysInStage: 2,
		tag: "Hot",
	},
	{
		id: "d3",
		title: "Retail rollout",
		company: "ShopCo",
		value: 120000,
		owner: "JL",
		stage: "qualified",
		priority: "medium",
		lastActivity: "Apr 12 · Deck sent",
		daysInStage: 8,
		tag: "Q2",
	},
	{
		id: "d4",
		title: "Manufacturing pilot",
		company: "Fabrikam",
		value: 54000,
		owner: "MP",
		stage: "prospect",
		priority: "low",
		lastActivity: "Apr 10 · Intro",
		daysInStage: 12,
		tag: null,
	},
	{
		id: "d5",
		title: "FinTech integration",
		company: "Stripe-ish",
		value: 210000,
		owner: "AC",
		stage: "proposal",
		priority: "high",
		lastActivity: "Apr 15 · Legal review",
		daysInStage: 3,
		tag: "Legal",
	},
	{
		id: "d6",
		title: "Healthcare RFP",
		company: "Medline",
		value: 175000,
		owner: "SR",
		stage: "proposal",
		priority: "medium",
		lastActivity: "Apr 11 · RFP submitted",
		daysInStage: 14,
		tag: "RFP",
	},
	{
		id: "d7",
		title: "Logistics Q4",
		company: "FastShip",
		value: 67000,
		owner: "JL",
		stage: "won",
		priority: "medium",
		lastActivity: "Apr 9 · Closed won",
		daysInStage: 0,
		tag: "Closed",
	},
	{
		id: "d8",
		title: "Startup pilot",
		company: "TinyApps",
		value: 8000,
		owner: "MP",
		stage: "lost",
		priority: "low",
		lastActivity: "Apr 8 · No budget",
		daysInStage: 0,
		tag: "Nurture",
	},
];

function formatMoney(n) {
	if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1000) return `$${Math.round(n / 1000)}k`;
	return `$${n.toLocaleString()}`;
}

function formatMoneyFull(n) {
	return `$ ${n.toLocaleString()}`;
}

function DealCard({ deal, stageAccent, colors }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: deal.id,
	});

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
		: undefined;

	const p = PRIORITY_META[deal.priority] || PRIORITY_META.medium;
	const PIcon = p.icon;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={`group relative rounded-xl border ${colors.card} overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${
				isDragging ? "opacity-90 ring-2 ring-offset-2 ring-zinc-400/80 dark:ring-zinc-500 scale-[1.02] shadow-lg z-10" : ""
			} border-l-[3px] ${stageAccent} border-y border-r ${colors.border}`}
		>
			<div className="p-3">
				<div className="flex gap-2">
					<div
						className={`shrink-0 mt-0.5 p-1 rounded-md text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-400`}
						aria-hidden
					>
						<GripVertical className="w-4 h-4" />
					</div>
					<div className="min-w-0 flex-1 space-y-2">
						<div className="flex flex-wrap items-start gap-1.5">
							{deal.tag && (
								<span
									className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md border ${colors.muted} ${colors.foreground} border-zinc-200/80 dark:border-zinc-700`}
								>
									{deal.tag}
								</span>
							)}
							<span
								className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${p.className}`}
							>
								<PIcon className="w-3 h-3" />
								{p.label}
							</span>
						</div>
						<div>
							<p className={`text-sm font-semibold leading-snug ${colors.foreground} line-clamp-2`}>
								{deal.title}
							</p>
							<p className={`text-xs flex items-center gap-1 mt-1 ${colors.textSecondary}`}>
								<Building2 className="w-3 h-3 shrink-0 opacity-80" />
								<span className="truncate">{deal.company}</span>
							</p>
						</div>

						<div className={`flex items-end justify-between gap-2 pt-1 border-t ${colors.border} border-dashed`}>
							<div>
								<p className={`text-[10px] uppercase tracking-wider font-medium ${colors.mutedForeground}`}>
									Value
								</p>
								<p className={`text-base font-bold tabular-nums tracking-tight ${colors.foreground}`}>
									{formatMoneyFull(deal.value)}
								</p>
							</div>
							<div
								className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold border-2 ${colors.border} ${colors.muted} ${colors.foreground}`}
								title={`Owner ${deal.owner}`}
							>
								{deal.owner}
							</div>
						</div>

						<div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] ${colors.textMuted}`}>
							<span className="inline-flex items-center gap-1">
								<Activity className="w-3 h-3" />
								{deal.daysInStage}d in stage
							</span>
							<span className="inline-flex items-center gap-1 min-w-0">
								<Clock className="w-3 h-3 shrink-0" />
								<span className="truncate">{deal.lastActivity}</span>
							</span>
						</div>

						<div className={`h-1 rounded-full overflow-hidden ${colors.muted}`}>
							<div
								className={`h-full rounded-full transition-all ${p.bar}`}
								style={{
									width: `${deal.priority === "high" ? 85 : deal.priority === "medium" ? 55 : 30}%`,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function StageColumn({ stage, deals, colors, totalValue }) {
	const { setNodeRef, isOver } = useDroppable({ id: stage.id });

	return (
		<div className="flex flex-col w-[min(100%,288px)] shrink-0">
			<div className="mb-3 px-0.5 space-y-2">
				<div className="flex items-center justify-between gap-2">
					<span className={`text-[11px] font-bold uppercase tracking-wider ${colors.mutedForeground}`}>
						{stage.label}
					</span>
					<span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stage.badge}`}>
						{deals.length}
					</span>
				</div>
				<div
					className={`rounded-xl px-2.5 py-2 border ${colors.border} bg-gradient-to-br from-zinc-50/90 to-transparent dark:from-zinc-900/40 dark:to-transparent`}
				>
					<p className={`text-[10px] uppercase font-medium ${colors.mutedForeground}`}>Column total</p>
					<p className={`text-sm font-bold tabular-nums ${colors.foreground}`}>{formatMoney(totalValue)}</p>
				</div>
			</div>
			<div
				ref={setNodeRef}
				className={`flex-1 rounded-xl border-2 border-dashed p-2.5 space-y-2.5 min-h-[min(58vh,440px)] transition-all ${
					isOver
						? "border-zinc-400 dark:border-zinc-500 bg-zinc-50/90 dark:bg-zinc-900/50 ring-2 ring-offset-0 dark:ring-offset-zinc-950"
						: `${colors.border} ${colors.muted}/40 bg-zinc-50/30 dark:bg-zinc-950/20`
				}`}
			>
				{deals.map((deal) => (
					<DealCard key={deal.id} deal={deal} stageAccent={stage.accent} colors={colors} />
				))}
				{deals.length === 0 && (
					<div className={`flex flex-col items-center justify-center py-10 px-2 text-center`}>
						<p className={`text-xs ${colors.textMuted}`}>Drop deals here</p>
					</div>
				)}
				<button
					type="button"
					className={`w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border border-dashed ${colors.border} ${colors.hoverSecondary} ${colors.mutedForeground} transition-colors`}
				>
					<Plus className="w-3.5 h-3.5" />
					Add deal
				</button>
			</div>
		</div>
	);
}

const Pipelines = () => {
	const { colors } = useTheme();
	const [deals, setDeals] = useState(INITIAL_DEALS);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		}),
	);

	const byStage = useMemo(() => {
		const map = {};
		STAGES.forEach((s) => {
			map[s.id] = deals.filter((d) => d.stage === s.id);
		});
		return map;
	}, [deals]);

	const columnTotals = useMemo(() => {
		const totals = {};
		STAGES.forEach((s) => {
			totals[s.id] = (byStage[s.id] || []).reduce((sum, d) => sum + d.value, 0);
		});
		return totals;
	}, [byStage]);

	const pipelineTotal = useMemo(
		() => deals.filter((d) => d.stage !== "won" && d.stage !== "lost").reduce((s, d) => s + d.value, 0),
		[deals],
	);

	const openDeals = useMemo(() => deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length, [deals]);

	const findStageForOver = (overId) => {
		if (!overId) return null;
		const sid = String(overId);
		if (STAGES.some((s) => s.id === sid)) return sid;
		const deal = deals.find((d) => d.id === sid);
		return deal ? deal.stage : null;
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (!over) return;
		const targetStage = findStageForOver(over.id);
		if (!targetStage) return;
		const dealId = active.id;
		setDeals((prev) =>
			prev.map((d) =>
				d.id === dealId ? { ...d, stage: targetStage, daysInStage: 0 } : d,
			),
		);
	};

	return (
		<div className={`p-6 min-h-screen transition-all duration-100 ease-in`}>
			<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
				<div>
					<h1 className={`text-2xl font-semibold tracking-tight ${colors.foreground}`}>Pipeline</h1>
					<p className={`text-sm mt-1 max-w-xl ${colors.mutedForeground}`}>
						Drag deals between stages — Prospect → Qualified → Proposal → Won / Lost. Totals update as you
						move cards.
					</p>
				</div>
				<div
					className={`flex flex-wrap gap-3 rounded-xl border ${colors.border} ${colors.card} px-4 py-3 shadow-sm`}
				>
					<div>
						<p className={`text-[10px] uppercase font-semibold tracking-wide ${colors.mutedForeground}`}>
							Open pipeline
						</p>
						<p className={`text-lg font-bold tabular-nums ${colors.foreground}`}>{formatMoney(pipelineTotal)}</p>
					</div>
					<div className={`w-px bg-zinc-200 dark:bg-zinc-700 self-stretch min-h-[2.5rem]`} />
					<div>
						<p className={`text-[10px] uppercase font-semibold tracking-wide ${colors.mutedForeground}`}>
							Active deals
						</p>
						<p className={`text-lg font-bold ${colors.foreground}`}>{openDeals}</p>
					</div>
					<div className={`w-px bg-zinc-200 dark:bg-zinc-700 self-stretch min-h-[2.5rem]`} />
					<div>
						<p className={`text-[10px] uppercase font-semibold tracking-wide ${colors.mutedForeground}`}>
							Avg deal size
						</p>
						<p className={`text-lg font-bold tabular-nums ${colors.foreground}`}>
							{openDeals ? formatMoney(Math.round(pipelineTotal / openDeals)) : "—"}
						</p>
					</div>
				</div>
			</div>

			<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
				<div className="flex gap-5 overflow-x-auto pb-6 -mx-1 px-1 snap-x snap-mandatory md:snap-none">
					{STAGES.map((stage) => (
						<div key={stage.id} className="snap-start shrink-0">
							<StageColumn
								stage={stage}
								deals={byStage[stage.id] || []}
								colors={colors}
								totalValue={columnTotals[stage.id] || 0}
							/>
						</div>
					))}
				</div>
			</DndContext>
		</div>
	);
};

export default Pipelines;
