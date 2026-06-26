import React from "react";
import { useRouter } from "next/router";
import { MoreVertical } from "lucide-react";
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
import { POPULAR_PRODUCTS } from "../ecommerceSeedData";

const PopularProductsCard = () => {
	const router = useRouter();
	const { colors } = useTheme();

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-2">
				<div>
					<CardTitle className="text-lg">Popular product</CardTitle>
					<CardDescription>Total 10.4K visitors</CardDescription>
				</div>
				<Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</CardHeader>

			<CardContent className="flex-1 pt-0 space-y-3">
				{POPULAR_PRODUCTS.map((product) => (
					<button
						key={product.id}
						type="button"
						onClick={() => router.push(`/e-commerce/products/${product.id}`)}
						className={cn(
							"w-full flex items-center gap-3 rounded-xl p-2 text-left transition-colors",
							colors.hoverSecondary
						)}
					>
						<img
							src={product.image}
							alt=""
							className="h-10 w-10 rounded-lg object-cover border border-border shrink-0"
						/>
						<div className="min-w-0 flex-1">
							<p className={`text-sm font-medium truncate ${colors.foreground}`}>
								{product.name}
							</p>
							<p className={`text-xs ${colors.mutedForeground}`}>
								${product.price.toLocaleString()}
							</p>
						</div>
						<span className={`text-sm font-medium tabular-nums shrink-0 ${colors.foreground}`}>
							{product.visitors}
						</span>
					</button>
				))}
			</CardContent>
		</Card>
	);
};

export default PopularProductsCard;
