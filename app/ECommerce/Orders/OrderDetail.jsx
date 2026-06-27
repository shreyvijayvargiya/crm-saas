import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	MapPin,
	Mail,
	Package,
	CreditCard,
	Calendar,
	ShoppingBag,
} from "lucide-react";
import EntityDetailShell from "../../CRM/EntityDetailShell";
import { findEcommerceOrder, findEcommerceProduct } from "../ecommerceSeedData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "../../../utils/useTheme";

export default function OrderDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const order = useMemo(
		() => (id ? findEcommerceOrder(id) : null),
		[id]
	);

	const product = useMemo(
		() => (order ? findEcommerceProduct(order.productId) : null),
		[order]
	);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!order) {
		return (
			<div className="space-y-4 p-6">
				<p className="text-muted-foreground">Order not found.</p>
				<Button variant="outline" asChild>
					<Link href="/e-commerce/orders">Back to orders</Link>
				</Button>
			</div>
		);
	}

	const sidebar = (
		<Card className={colors.shadow}>
			<CardContent className="space-y-4 p-6">
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Order status
					</p>
					<Badge className="mt-2">{order.status}</Badge>
				</div>
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Payment
					</p>
					<Badge variant="outline" className="mt-2">{order.paymentStatus}</Badge>
				</div>
				<ul className="space-y-3 border-t pt-4 text-sm">
					<li className="flex items-center gap-2 text-muted-foreground">
						<ShoppingBag className="h-4 w-4" />
						{order.orderNumber}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<Calendar className="h-4 w-4" />
						{order.createdAt}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<CreditCard className="h-4 w-4" />
						${order.amount.toLocaleString()}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<Package className="h-4 w-4" />
						{order.items} item{order.items !== 1 ? "s" : ""}
					</li>
				</ul>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell backHref="/e-commerce/orders" backLabel="Orders" sidebar={sidebar}>
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Customer</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm">
						<p className="font-medium text-foreground">{order.customer}</p>
						<p className="flex items-center gap-2 text-muted-foreground">
							<Mail className="h-4 w-4" />
							{order.email}
						</p>
						<p className="flex items-start gap-2 text-muted-foreground">
							<MapPin className="mt-0.5 h-4 w-4 shrink-0" />
							{order.shippingAddress}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Line items</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4 rounded-lg border p-4">
							{product && (
								<img
									src={product.imageURL}
									alt=""
									className="h-16 w-16 rounded-lg border object-cover"
								/>
							)}
							<div className="flex-1">
								<p className="font-medium text-foreground">{order.productName}</p>
								{product && (
									<p className="text-sm text-muted-foreground">{product.brand} · {product.sku}</p>
								)}
							</div>
							<p className="text-lg font-semibold tabular-nums text-foreground">
								${order.amount.toLocaleString()}
							</p>
						</div>
						{product && (
							<Button variant="link" className="mt-3 px-0" asChild>
								<Link href={`/e-commerce/products/${product.id}`}>View product</Link>
							</Button>
						)}
					</CardContent>
				</Card>
			</div>
		</EntityDetailShell>
	);
}
