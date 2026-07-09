import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Package, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormSelect from "../../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { ORDER_STATUSES } from "../ecommerceSeedData";
import { useCrmData } from "../../../utils/CrmDataContext";

function orderStatusVariant(status) {
	if (status === "Delivered") return "default";
	if (status === "Cancelled") return "destructive";
	if (status === "Shipped") return "secondary";
	return "outline";
}

const Orders = () => {
	const { ecommerceOrders } = useCrmData();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const filtered = useMemo(() => {
		let list = [...ecommerceOrders];
		if (statusFilter !== "All") list = list.filter((o) => o.status === statusFilter);
		if (searchTerm.trim()) {
			const q = searchTerm.toLowerCase();
			list = list.filter(
				(o) =>
					o.orderNumber.toLowerCase().includes(q) ||
					o.customer.toLowerCase().includes(q) ||
					o.productName.toLowerCase().includes(q)
			);
		}
		return list;
	}, [searchTerm, statusFilter, ecommerceOrders]);

	const stats = useMemo(
		() => ({
			total: ecommerceOrders.length,
			revenue: ecommerceOrders.filter((o) => o.paymentStatus === "Paid").reduce(
				(s, o) => s + o.amount,
				0
			),
			pending: ecommerceOrders.filter((o) =>
				["Pending", "Processing"].includes(o.status)
			).length,
		}),
		[ecommerceOrders]
	);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center gap-3">
				<Button variant="outline" size="icon" asChild>
					<Link href="/e-commerce" aria-label="Back to E-commerce">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-2xl font-semibold text-foreground">Orders</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Store order catalog — click a row for fulfillment details.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{[
					{ label: "Total orders", value: stats.total, icon: Package },
					{ label: "Revenue (paid)", value: `$${stats.revenue.toLocaleString()}`, icon: Package },
					{ label: "Pending fulfillment", value: stats.pending, icon: Package },
				].map(({ label, value }) => (
					<Card key={label}>
						<CardContent className="p-6">
							<p className="text-sm font-medium text-muted-foreground">{label}</p>
							<p className="text-3xl font-bold text-foreground">{value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">All orders</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-3">
						<div className="relative max-w-sm flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search orders…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<FormSelect
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							options={["All", ...ORDER_STATUSES]}
							className="w-40"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Product</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Payment</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((order) => (
								<TableRow
									key={order.id}
									className="cursor-pointer"
									onClick={() => router.push(`/e-commerce/orders/${order.id}`)}
								>
									<TableCell className="font-medium text-foreground">
										{order.orderNumber}
									</TableCell>
									<TableCell>
										<p className="text-foreground">{order.customer}</p>
										<p className="text-xs text-muted-foreground">{order.email}</p>
									</TableCell>
									<TableCell className="text-muted-foreground">{order.productName}</TableCell>
									<TableCell className="tabular-nums">${order.amount.toLocaleString()}</TableCell>
									<TableCell>
										<Badge variant={orderStatusVariant(order.status)}>{order.status}</Badge>
									</TableCell>
									<TableCell>
										<Badge variant="outline">{order.paymentStatus}</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">{order.createdAt}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default Orders;
