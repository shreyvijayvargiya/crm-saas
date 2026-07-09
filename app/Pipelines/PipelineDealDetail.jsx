import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Building2,
	Calendar,
	DollarSign,
	Handshake,
	Activity,
	Clock,
	Flame,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import EntityDetailShell from "../CRM/EntityDetailShell";
import EntityRecordTabs from "../CRM/EntityRecordTabs";
import { findPipelineDeal } from "../CRM/pipelineDealsSeedData";
import { STAGE_META } from "../CRM/dealsSeedData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PRIORITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

const PipelineDealDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const deal = useMemo(() => {
		if (!id) return null;
		return findPipelineDeal(id);
	}, [id]);

	if (!router.isReady || !deal) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	const sm = STAGE_META[deal.stage] || STAGE_META.prospect;

	const sidebar = (
		<Card className={colors.shadow}>
			<CardContent className="p-6">
			<div className="flex items-center gap-3 mb-4">
				<span className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
					<Handshake className="w-6 h-6" />
				</span>
				<div className="min-w-0">
					<h1 className={`text-xl font-semibold ${colors.foreground} break-words`}>
						{deal.title}
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-0.5`}>
						{deal.company}
					</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				<Badge className={cn("border", sm.className)}>
					{sm.label}
				</Badge>
				{deal.tag && (
					<Badge variant="secondary">
						{deal.tag}
					</Badge>
				)}
			</div>

			<ul className={`mt-6 space-y-3 text-sm  pt-6`}>
				<li className="flex items-center gap-2">
					<DollarSign className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.foreground}>
						${deal.value.toLocaleString()}
					</span>
				</li>
				<li className="flex items-center gap-2">
					<Building2 className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{deal.company}</span>
				</li>
				<li className="flex items-center gap-2">
					<Flame className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>
						{PRIORITY_LABEL[deal.priority] || deal.priority} priority
					</span>
				</li>
				<li className="flex items-center gap-2">
					<Activity className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>
						{deal.daysInStage}d in stage
					</span>
				</li>
				<li className="flex items-center gap-2">
					<Clock className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{deal.lastActivity}</span>
				</li>
				<li className="flex items-center gap-2">
					<Calendar className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>Owner {deal.owner}</span>
				</li>
			</ul>

			<p className={`text-xs mt-6 pt-6  ${colors.mutedForeground}`}>
				<Link href="/deals" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						View in deals table
					</a>
				</Link>
				{" · "}
				<Link href="/pipelines" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						Pipeline board
					</a>
				</Link>
			</p>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell
			backHref="/pipelines"
			backLabel="Back to pipeline"
			sidebar={sidebar}
		>
			<EntityRecordTabs kind="deal" id={deal.id} />
		</EntityDetailShell>
	);
};

export default PipelineDealDetail;
