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
import EntityDetailShell from "../CRM/EntityDetailShell";
import EntityRecordTabs from "../CRM/EntityRecordTabs";
import { getDealRecord } from "../CRM/entityDetailData";
import { STAGE_META } from "../CRM/dealsSeedData";

const DealDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors, scheme } = useTheme();

	const deal = useMemo(() => {
		if (!id) return null;
		return getDealRecord(id);
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
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-6`}
		>
			<div className="flex items-center gap-3 mb-4">
				<span
					className={`w-12 h-12 rounded-xl flex items-center justify-center ${scheme.primary} ${scheme.primaryForeground}`}
				>
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

			<span
				className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-md border ${sm.className}`}
			>
				{sm.label}
			</span>

			<ul
				className={`mt-6 space-y-3 text-sm border-t ${colors.border} pt-6`}
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

			<p className={`text-xs mt-6 pt-6 border-t ${colors.border} ${colors.mutedForeground}`}>
				<Link href="/pipelines" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						View on pipeline board
					</a>
				</Link>
			</p>
		</div>
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
