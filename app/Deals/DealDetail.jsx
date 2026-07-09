import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Building2,
	Calendar,
	DollarSign,
	Handshake,
	User,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { useCrmData } from "../../utils/CrmDataContext";
import { findById } from "../../utils/crmRecordHelpers";
import EntityDetailShell from "../CRM/EntityDetailShell";
import EntityRecordTabs from "../CRM/EntityRecordTabs";
import { STAGE_META } from "../CRM/dealsSeedData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DealDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const { deals } = useCrmData();

	const deal = useMemo(() => {
		if (!id) return null;
		return findById(deals, id);
	}, [id, deals]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	if (!deal) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Deal not found.</p>
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
						{deal.name}
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-0.5`}>
						{deal.company}
					</p>
				</div>
			</div>

			<Badge className={cn("border", sm.className)}>
				{sm.label}
			</Badge>

			<ul
				className={`mt-6 space-y-3 text-sm pt-6`}
			>
				<li className="flex items-center gap-2">
					<DollarSign className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.foreground}>
						${deal.value.toLocaleString()}
					</span>
				</li>
				<li className="flex items-center gap-2">
					<Calendar className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>Close {deal.closeDate}</span>
				</li>
				<li className="flex items-center gap-2">
					<User className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{deal.rep}</span>
				</li>
				<li className="flex items-center gap-2">
					<Building2 className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{deal.company}</span>
				</li>
			</ul>

			<p className={`text-xs mt-6 pt-6 ${colors.mutedForeground}`}>
				<Link href="/pipelines" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						View on pipeline board
					</a>
				</Link>
			</p>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell
			backHref="/deals"
			backLabel="Back to deals"
			sidebar={sidebar}
		>
			<EntityRecordTabs kind="deal" id={deal.id} />
		</EntityDetailShell>
	);
};

export default DealDetail;
