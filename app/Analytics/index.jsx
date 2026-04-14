import React from "react";
import { useTheme } from "../../utils/useTheme";
import MetricSummaryCards from "./components/MetricSummaryCards";
import EarningReportsCard from "./components/EarningReportsCard";
import TicketStatusCard from "./components/TicketStatusCard";
import WebsiteAnalyticsCard from "./components/WebsiteAnalyticsCard";
import AverageDailySalesCard from "./components/AverageDailySalesCard";
import SalesOverviewCard from "./components/SalesOverviewCard";

const Analytics = () => {
	const { colors } = useTheme();

	return (
		<div className={`${colors.background} min-h-screen transition-colors pb-10`}>
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1 className={`text-2xl font-bold tracking-tight ${colors.foreground}`}>
						Analytics
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Overview of traffic, revenue, and support metrics
					</p>
				</div>

				<MetricSummaryCards colors={colors} />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
					<div className="lg:col-span-2 min-h-[420px]">
						<EarningReportsCard />
					</div>
					<div className="min-h-[420px]">
						<TicketStatusCard />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
					<WebsiteAnalyticsCard />
					<AverageDailySalesCard />
					<SalesOverviewCard />
				</div>
			</div>
		</div>
	);
};

export default Analytics;
