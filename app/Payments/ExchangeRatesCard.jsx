import React, { useMemo, useState } from "react";
import {
	ArrowUpDown,
	BarChart3,
	RefreshCw,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useChartTooltipProps } from "../../utils/chartTooltip";

const CURRENCIES = [
	{ code: "USD", name: "US Dollar", flag: "🇺🇸" },
	{ code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
	{ code: "EUR", name: "Euro", flag: "🇪🇺" },
	{ code: "GBP", name: "British Pound", flag: "🇬🇧" },
	{ code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
	{ code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
	{ code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
];

/** Hardcoded value of 1 unit in USD */
const TO_USD = {
	USD: 1,
	EUR: 1.08,
	JPY: 0.00637,
	GBP: 1.27,
	INR: 0.012,
	AUD: 0.66,
	CAD: 0.74,
};

const TIME_RANGES = [
	{ key: "1D", label: "1D", points: 24 },
	{ key: "7D", label: "7D", points: 7 },
	{ key: "30D", label: "30D", points: 30 },
	{ key: "90D", label: "90D", points: 15 },
	{ key: "1Y", label: "1Y", points: 12 },
];

function getCurrency(code) {
	return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

function getExchangeRate(from, to) {
	if (from === to) return 1;
	return TO_USD[from] / TO_USD[to];
}

function seededNoise(seed, index) {
	const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

function generateChartData(from, to, rangeKey) {
	const range = TIME_RANGES.find((r) => r.key === rangeKey) ?? TIME_RANGES[2];
	const baseRate = getExchangeRate(from, to);
	const seed = from.charCodeAt(0) * 100 + to.charCodeAt(0) + rangeKey.charCodeAt(0);
	const now = new Date();

	return Array.from({ length: range.points }, (_, i) => {
		const daysBack =
			range.key === "1D"
				? 0
				: Math.round(((range.points - 1 - i) / (range.points - 1)) * getDaysBack(range.key));
		const date = new Date(now);
		if (range.key === "1D") {
			date.setHours(now.getHours() - (range.points - 1 - i));
		} else {
			date.setDate(now.getDate() - daysBack);
		}

		const noise = (seededNoise(seed, i) - 0.5) * 0.04;
		const rate = baseRate * (1 + noise);

		return {
			date: date.toISOString(),
			label:
				range.key === "1D"
					? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
					: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
			tooltipLabel: date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
			rate: Number(rate.toFixed(range.key === "1Y" ? 4 : 3)),
		};
	});
}

function getDaysBack(rangeKey) {
	if (rangeKey === "7D") return 7;
	if (rangeKey === "30D") return 30;
	if (rangeKey === "90D") return 90;
	if (rangeKey === "1Y") return 365;
	return 1;
}

function formatUpdatedTime(date) {
	return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function CurrencySelect({ value, onChange, id }) {
	const currency = getCurrency(value);

	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger id={id} className="h-10">
				<SelectValue>
					<span className="flex items-center gap-2">
						<span className="text-base leading-none">{currency.flag}</span>
						<span className="font-medium">{currency.code}</span>
					</span>
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{CURRENCIES.map((c) => (
					<SelectItem key={c.code} value={c.code}>
						<span className="flex items-center gap-2">
							<span className="text-base leading-none">{c.flag}</span>
							<span>{c.code}</span>
							<span className="text-muted-foreground">— {c.name}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

function ExchangeTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;
	const point = payload[0].payload;

	return (
		<div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-md min-w-[160px]">
			<p className="text-xs text-muted-foreground mb-2">{point.tooltipLabel}</p>
			<div className="flex items-center justify-between gap-6">
				<span className="flex items-center gap-2 text-sm text-foreground">
					<span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-foreground" />
					Exchange Rate
				</span>
				<span className="text-sm font-semibold tabular-nums">{point.rate}</span>
			</div>
		</div>
	);
}

const ExchangeRatesCard = () => {
	const tooltipProps = useChartTooltipProps();
	const [fromCurrency, setFromCurrency] = useState("JPY");
	const [toCurrency, setToCurrency] = useState("USD");
	const [timeRange, setTimeRange] = useState("30D");
	const [lastUpdated, setLastUpdated] = useState(() => new Date());

	const chartData = useMemo(
		() => generateChartData(fromCurrency, toCurrency, timeRange),
		[fromCurrency, toCurrency, timeRange]
	);

	const currentRate = chartData[chartData.length - 1]?.rate ?? getExchangeRate(fromCurrency, toCurrency);

	const handleSwap = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	};

	const handleRefresh = () => {
		setLastUpdated(new Date());
		toast.success("Exchange rates refreshed (demo data)");
	};

	return (
		<Card>
			<CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-4">
				<CardTitle className="text-lg">Exchange rates</CardTitle>
				<div className="flex items-center gap-2 shrink-0">
					<p className="text-xs text-muted-foreground whitespace-nowrap">
						Last updated: {formatUpdatedTime(lastUpdated)}
					</p>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={handleRefresh}
						aria-label="Refresh rates"
					>
						<RefreshCw className="h-3.5 w-3.5" />
					</Button>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="flex items-center gap-2">
					<div className="flex-1 min-w-0">
						<CurrencySelect
							id="exchange-from"
							value={fromCurrency}
							onChange={setFromCurrency}
						/>
					</div>
					<Button
						type="button"
						variant="outline"
						size="icon"
						className="h-10 w-10 shrink-0"
						onClick={handleSwap}
						aria-label="Swap currencies"
					>
						<ArrowUpDown className="h-4 w-4" />
					</Button>
					<div className="flex-1 min-w-0">
						<CurrencySelect
							id="exchange-to"
							value={toCurrency}
							onChange={setToCurrency}
						/>
					</div>
				</div>

				<p className="text-sm text-muted-foreground">
					1 {fromCurrency} ={" "}
					<span className="font-semibold text-foreground tabular-nums">
						{currentRate}
					</span>{" "}
					{toCurrency}
				</p>

				<div className="flex flex-wrap gap-1.5">
					{TIME_RANGES.map(({ key, label }) => (
						<Button
							key={key}
							type="button"
							size="sm"
							variant={timeRange === key ? "default" : "secondary"}
							className={cn(
								"h-7 px-3 text-xs font-medium",
								timeRange !== key && "bg-muted text-muted-foreground hover:bg-muted/80"
							)}
							onClick={() => setTimeRange(key)}
						>
							{label}
						</Button>
					))}
				</div>

				<div className="h-[200px] w-full -mx-1">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={chartData}
							margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								className="stroke-border"
							/>
							<XAxis
								dataKey="label"
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
								interval="preserveStartEnd"
								minTickGap={24}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
								width={40}
								domain={["auto", "auto"]}
							/>
							<Tooltip
								content={<ExchangeTooltip />}
								cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
								{...tooltipProps}
							/>
							<Line
								type="monotone"
								dataKey="rate"
								stroke="hsl(var(--foreground))"
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 4, fill: "hsl(var(--foreground))" }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="space-y-2 pt-1">
					<Button
						type="button"
						className="w-full"
						onClick={() =>
							toast.info(
								`Demo: convert ${fromCurrency} → ${toCurrency} at ${currentRate}`
							)
						}
					>
						Convert currencies
					</Button>
					<Button
						type="button"
						variant="outline"
						className="w-full gap-2"
						onClick={() => toast.info("Rate alerts are demo-only in this template")}
					>
						<BarChart3 className="h-4 w-4 text-emerald-500" />
						Rate alerts
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ExchangeRatesCard;
