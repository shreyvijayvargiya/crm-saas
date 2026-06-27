import React from "react";
import { useRouter } from "next/router";
import { ShoppingCart, Package } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import MetricCardsRow from "./components/MetricCardsRow";
import EarningInsightsCard from "./components/EarningInsightsCard";
import OrderStatusCard from "./components/OrderStatusCard";
import OrdersTrackingCard from "./components/OrdersTrackingCard";
import PopularProductsCard from "./components/PopularProductsCard";
import ProductsTable from "./components/ProductsTable";

const ECommerce = () => {
	const router = useRouter();
	const { colors } = useTheme();

	return (
		<div className="min-h-screen pb-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div className="flex items-start gap-3">
						<span className="hidden sm:flex p-2.5 rounded-xl bg-primary text-primary-foreground shrink-0">
							<ShoppingCart className="w-6 h-6" />
						</span>
						<div>
							<h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}>
								E-commerce
							</h1>
							<p className={`text-sm mt-1 max-w-2xl ${colors.textSecondary}`}>
								Store metrics, order tracking, and product catalog — click any product row to open
								its detail page.
							</p>
						</div>
					</div>
					<Button variant="outline" onClick={() => router.push("/e-commerce/orders")}>
						<Package className="h-4 w-4" />
						View all orders
					</Button>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
					<div className="xl:col-span-1">
						<MetricCardsRow />
					</div>
					<div className="xl:col-span-2">
						<EarningInsightsCard />
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<OrderStatusCard />
					<OrdersTrackingCard />
					<PopularProductsCard />
				</div>

				<ProductsTable />
			</div>
		</div>
	);
};

export default ECommerce;
