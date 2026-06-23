import React from "react";
import { useTheme } from "../../../utils/useTheme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const cells = [
	{ badge: "432", label: "Direct" },
	{ badge: "216", label: "Organic" },
	{ badge: "29%", label: "Sessions" },
	{ badge: "2.3K", label: "Page Views" },
	{ badge: "1.6K", label: "Leads" },
	{ badge: "8%", label: "Conversions" },
];

const WebsiteAnalyticsCard = () => {
	const { colors } = useTheme();

	return (
		<Card className="h-full">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg">Website Analytics</CardTitle>
				<CardDescription>Total 28.5% Conversion Rate</CardDescription>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="grid grid-cols-2 gap-3">
					{cells.map(({ badge, label }) => (
						<div
							key={label}
							className={cn(
								"rounded-xl border p-3 flex flex-col gap-1",
								colors.border
							)}
						>
							<Badge variant="secondary" className="w-fit">
								{badge}
							</Badge>
							<span className={`text-sm ${colors.textSecondary}`}>{label}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default WebsiteAnalyticsCard;
