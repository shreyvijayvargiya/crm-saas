import React, { useState } from "react";
import { useRouter } from "next/router";
import { MapPin, MoreVertical, User } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DELIVERY_ORDERS } from "../ecommerceSeedData";

const TAB_KEYS = ["New", "Pending", "Shipping"];

const OrdersTrackingCard = () => {
	const router = useRouter();
	const { colors } = useTheme();
	const [activeTab, setActiveTab] = useState("New");
	const orders = DELIVERY_ORDERS[activeTab] ?? [];

	const totalDeliveries = Object.values(DELIVERY_ORDERS).reduce(
		(sum, list) => sum + list.length,
		0
	);

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-2">
				<div>
					<CardTitle className="text-lg">Orders</CardTitle>
					<CardDescription>{totalDeliveries} Deliveries in progress</CardDescription>
				</div>
				<Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</CardHeader>

			<CardContent className="flex-1 pt-0">
				<div className={`flex gap-4 border-b ${colors.border} mb-4`}>
					{TAB_KEYS.map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className={cn(
								"pb-2 text-sm font-medium transition-colors border-b-2 -mb-px",
								activeTab === tab
									? "border-primary text-foreground"
									: `border-transparent ${colors.mutedForeground}`
							)}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="space-y-4">
					{orders.map((order) => (
						<button
							key={order.id}
							type="button"
							onClick={() => router.push(`/e-commerce/products/${order.productId}`)}
							className={cn(
								"w-full text-left rounded-xl border p-4 transition-colors",
								colors.border,
								colors.hoverSecondary
							)}
						>
							<div className="flex gap-3">
								<div className="flex flex-col items-center">
									<span className={`flex h-8 w-8 items-center justify-center rounded-full ${colors.muted}`}>
										<User className="h-4 w-4" />
									</span>
									<div className={`my-1 w-px flex-1 border-l border-dashed ${colors.border}`} />
									<span className={`flex h-8 w-8 items-center justify-center rounded-full ${colors.muted}`}>
										<MapPin className="h-4 w-4" />
									</span>
								</div>
								<div className="flex-1 space-y-4 min-w-0">
									<div>
										<p className={`text-sm font-medium ${colors.foreground}`}>
											{order.sender.name}
										</p>
										<p className={`text-xs mt-0.5 ${colors.mutedForeground}`}>
											{order.sender.address}
										</p>
									</div>
									<div>
										<p className={`text-sm font-medium ${colors.foreground}`}>
											{order.receiver.name}
										</p>
										<p className={`text-xs mt-0.5 ${colors.mutedForeground}`}>
											{order.receiver.address}
										</p>
									</div>
								</div>
							</div>
						</button>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default OrdersTrackingCard;
