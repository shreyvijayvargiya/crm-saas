import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Building2, MapPin, Star, User } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { useCrmData } from "../../utils/CrmDataContext";
import { findById } from "../../utils/crmRecordHelpers";
import EntityDetailShell from "../CRM/EntityDetailShell";
import EntityRecordTabs from "../CRM/EntityRecordTabs";

const CompanyDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const { companies } = useCrmData();

	const company = useMemo(() => {
		if (!id) return null;
		return findById(companies, id);
	}, [id, companies]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	if (!company) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Company not found.</p>
			</div>
		);
	}

	const sidebar = (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-6`}
		>
			<div className="flex flex-col items-center text-center gap-4">
				<img
					src={company.logo}
					alt=""
					className={`w-20 h-20 rounded-full border-2 ${colors.border} object-cover`}
				/>
				<div>
					<h1 className={`text-xl font-semibold ${colors.foreground}`}>
						{company.name}
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-1`}>
						{company.industry}
					</p>
				</div>
				<div className="flex items-center gap-1">
					<Star className="w-4 h-4 text-amber-500 fill-amber-500" />
					<span className={`text-sm font-medium ${colors.foreground}`}>
						{company.rating}
					</span>
				</div>
			</div>

			<ul
				className={`mt-6 space-y-3 text-sm pt-6`}
			>
				<li className="flex items-center gap-2">
					<User className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{company.owner}</span>
				</li>
				<li className="flex items-center gap-2">
					<Building2 className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{company.industry}</span>
				</li>
				<li className="flex items-center gap-2">
					<MapPin className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{company.location}</span>
				</li>
			</ul>

			<p className={`text-xs mt-6 pt-6 ${colors.mutedForeground}`}>
				<Link href="/deals" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						View related deals
					</a>
				</Link>
				{" · "}
				<Link href="/contacts" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						View contacts
					</a>
				</Link>
			</p>
		</div>
	);

	return (
		<EntityDetailShell
			backHref="/companies"
			backLabel="Back to companies"
			sidebar={sidebar}
		>
			<EntityRecordTabs kind="company" id={company.id} />
		</EntityDetailShell>
	);
};

export default CompanyDetail;
