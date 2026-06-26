import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Box,
	DollarSign,
	Package,
	Tag,
	TrendingUp,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { findEcommerceProduct } from "./ecommerceSeedData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const product = useMemo(() => {
		if (!id) return null;
		return findEcommerceProduct(id);
	}, [id]);

	if (!router.isReady || !product) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	const sidebar = (
		<Card className={colors.shadow}>
			<CardContent className="p-6">
				<div className="flex flex-col items-center text-center gap-4">
					<img
						src={product.imageURL}
						alt=""
						className={`w-24 h-24 rounded-xl border-2 object-cover ${colors.border}`}
					/>
					<div>
						<h1 className={`text-xl font-semibold ${colors.foreground}`}>
							{product.name}
						</h1>
						<p className={`text-sm ${colors.textSecondary} mt-1`}>{product.brand}</p>
					</div>
					<Badge
						variant="secondary"
						className={cn(
							"border-transparent",
							product.status === "Publish"
								? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
								: "bg-rose-500/15 text-rose-600 dark:text-rose-400"
						)}
					>
						{product.status}
					</Badge>
				</div>

				<ul className={`mt-6 space-y-3 text-sm border-t ${colors.border} pt-6`}>
					<li className="flex items-center gap-2">
						<DollarSign className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
						<span className={colors.foreground}>${product.price}</span>
					</li>
					<li className="flex items-center gap-2">
						<Box className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
						<span className={colors.textSecondary}>
							{product.quantity} units in catalog
						</span>
					</li>
					<li className="flex items-center gap-2">
						<Tag className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
						<span className={colors.textSecondary}>{product.category}</span>
					</li>
					<li className="flex items-center gap-2">
						<TrendingUp className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
						<span className={colors.textSecondary}>{product.visitors} visitors</span>
					</li>
				</ul>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell
			backHref="/e-commerce"
			backLabel="Back to e-commerce"
			sidebar={sidebar}
		>
			<Card className={colors.shadow}>
				<CardContent className="p-5 sm:p-6 space-y-6">
					<div>
						<h2 className={`text-sm font-semibold ${colors.foreground} mb-2`}>
							Description
						</h2>
						<p className={`text-sm leading-relaxed ${colors.textSecondary}`}>
							{product.description}
						</p>
					</div>

					<div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t ${colors.border}`}>
						<div>
							<p className={`text-xs font-medium uppercase tracking-wide ${colors.mutedForeground}`}>
								SKU
							</p>
							<p className={`mt-1 text-sm font-medium ${colors.foreground}`}>
								{product.sku}
							</p>
						</div>
						<div>
							<p className={`text-xs font-medium uppercase tracking-wide ${colors.mutedForeground}`}>
								Created
							</p>
							<p className={`mt-1 text-sm font-medium ${colors.foreground}`}>
								{product.createdAt}
							</p>
						</div>
						<div>
							<p className={`text-xs font-medium uppercase tracking-wide ${colors.mutedForeground}`}>
								Stock
							</p>
							<div className="mt-2 flex items-center gap-2">
								<Switch checked={product.inStock} disabled aria-label="Stock status" />
								<span className={`text-sm ${colors.textSecondary}`}>
									{product.inStock ? "In stock" : "Out of stock"}
								</span>
							</div>
						</div>
						<div>
							<p className={`text-xs font-medium uppercase tracking-wide ${colors.mutedForeground}`}>
								Product ID
							</p>
							<p className={`mt-1 text-sm font-mono ${colors.foreground}`}>{product.id}</p>
						</div>
					</div>

					<p className={`text-xs pt-4 border-t ${colors.border} ${colors.mutedForeground}`}>
						<Link href="/e-commerce" passHref>
							<a className={`font-medium ${colors.foreground} hover:underline`}>
								Return to catalog
							</a>
						</Link>
						{" · "}
						<span className="inline-flex items-center gap-1">
							<Package className="w-3 h-3 inline" />
							{product.brand} · {product.category}
						</span>
					</p>
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
};

export default ProductDetail;
