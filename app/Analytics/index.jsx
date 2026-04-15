import React, { useMemo, useState } from "react";
import { FileBarChart } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import DateRangeFilter from "./components/DateRangeFilter";
import RevenueForecastSection from "./components/RevenueForecastSection";
import LeadSourceSection from "./components/LeadSourceSection";
import RepPerformanceSection from "./components/RepPerformanceSection";
import SalesFunnelSection from "./components/SalesFunnelSection";
import {
	getForecastSeries,
	getLeadSources,
	getRepPerformance,
	getExecutiveKpis,
	getFunnelSteps,
	RANGE_LABELS,
} from "./reportData";

const Analytics = () => {
	const { colors, scheme } = useTheme();
	const [range, setRange] = useState("30d");
	const [showCustom, setShowCustom] = useState(false);
	const [customFrom, setCustomFrom] = useState("");
	const [customTo, setCustomTo] = useState("");

	const rangeLabel = useMemo(() => {
		if (showCustom && customFrom && customTo) return `${customFrom} → ${customTo}`;
		return RANGE_LABELS[range] || RANGE_LABELS["30d"];
	}, [range, showCustom, customFrom, customTo]);

	const forecastData = useMemo(() => getForecastSeries(range), [range]);
	const leadSources = useMemo(() => getLeadSources(range), [range]);
	const repRows = useMemo(() => getRepPerformance(range), [range]);
	const kpis = useMemo(() => getExecutiveKpis(range), [range]);
	const funnelSteps = useMemo(() => getFunnelSteps(range), [range]);

	const onCustomChange = (field, value) => {
		if (field === "from") setCustomFrom(value);
		else setCustomTo(value);
	};

	const fmtMoney = (n) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(n);

	return (
		<div className={`min-h-screen transition-all duration-100 ease-in pb-12`}>
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
					<div className="flex items-start gap-3">
						<span
							className={`hidden sm:flex p-2.5 rounded-xl ${scheme.primary} ${scheme.primaryForeground} shrink-0`}
						>
							<FileBarChart className="w-6 h-6" />
						</span>
						<div>
							<h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}>
								Reports & analytics
							</h1>
							<p className={`text-sm mt-1 max-w-2xl ${colors.textSecondary}`}>
								Executive revenue forecast, channel attribution, and rep performance — filter by period
								to match how buyers evaluate CRM templates.
							</p>
						</div>
					</div>
				</div>

				<DateRangeFilter
					value={range}
					onChange={setRange}
					showCustom={showCustom}
					onToggleCustom={setShowCustom}
					customFrom={customFrom}
					customTo={customTo}
					onCustomChange={onCustomChange}
				/>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
					{[
						{ label: "Revenue (period)", value: fmtMoney(kpis.totalRevenue), hint: "Closed-won" },
						{ label: "Open pipeline", value: fmtMoney(kpis.pipeline), hint: "Weighted" },
						{ label: "New leads", value: String(kpis.newLeads), hint: "Attributed" },
						{
							label: "Forecast accuracy",
							value: `${kpis.forecastAccuracy}%`,
							hint: "vs plan",
						},
					].map((k) => (
						<div
							key={k.label}
							className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-4 md:p-5`}
						>
							<p className={`text-[11px] font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
								{k.label}
							</p>
							<p className={`text-xl md:text-2xl font-bold tabular-nums mt-1 ${colors.foreground}`}>
								{k.value}
							</p>
							<p className={`text-xs mt-0.5 ${colors.textMuted}`}>{k.hint}</p>
						</div>
					))}
				</div>

				<RevenueForecastSection data={forecastData} rangeLabel={rangeLabel} />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
					<LeadSourceSection data={leadSources} />
					<SalesFunnelSection steps={funnelSteps} />
				</div>

				<RepPerformanceSection rows={repRows} />
			</div>
		</div>
	);
};

export default Analytics;
