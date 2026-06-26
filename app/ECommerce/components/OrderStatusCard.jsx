import React, { useState } from "react";
import { useTheme } from "../../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ORDER_STATUS_PROFILE, ORDER_STATUS_TABS } from "../ecommerceSeedData";

const TAB_KEYS = ["Packed", "Shipped", "Received"];

const OrderStatusCard = () => {
	const { colors } = useTheme();
	const [activeTab, setActiveTab] = useState("Packed");
	const rows = ORDER_STATUS_TABS[activeTab] ?? [];

	return (
		<Card className="h-full">
			<CardContent className="p-5">
				<div className="flex items-center gap-3 mb-5">
					<img
						src={ORDER_STATUS_PROFILE.avatar}
						alt=""
						className="h-10 w-10 rounded-full object-cover border border-border"
					/>
					<div>
						<p className={`text-sm font-semibold ${colors.foreground}`}>
							{ORDER_STATUS_PROFILE.handle}
						</p>
						<p className={`text-xs ${colors.mutedForeground}`}>{ORDER_STATUS_PROFILE.role}</p>
					</div>
				</div>

				<p className={`text-2xl font-bold ${colors.foreground}`}>
					{ORDER_STATUS_PROFILE.totalOrders.toLocaleString()} Orders
				</p>

				<div className={`mt-4 flex gap-1 rounded-lg border p-1 ${colors.border}`}>
					{TAB_KEYS.map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className={cn(
								"flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
								activeTab === tab
									? "bg-primary text-primary-foreground"
									: colors.mutedForeground
							)}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="mt-5 space-y-4">
					{rows.map((row) => (
						<div key={row.label}>
							<div className="flex items-center justify-between text-sm mb-1.5">
								<span className={colors.textSecondary}>{row.label}</span>
								<span className={`font-medium tabular-nums ${colors.foreground}`}>
									{row.value.toLocaleString()}
								</span>
							</div>
							<div className="h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
								<div
									className="h-full rounded-full bg-primary"
									style={{ width: `${row.pct * 100}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderStatusCard;
