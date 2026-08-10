import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Demo weather for top countries → cities → 5-day forecast.
 * Temps stored in °F; UI converts for °C.
 */
const WEATHER_DATA = [
	{
		country: "United States",
		code: "US",
		cities: [
			{
				name: "Chicago",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 97, condition: "sunny" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 88, condition: "clouds" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 76, condition: "rain" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 82, condition: "dust" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 91, condition: "sunny" },
				],
			},
			{
				name: "New York",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 84, condition: "clouds" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 79, condition: "rain" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 86, condition: "sunny" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 81, condition: "clouds" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 77, condition: "rain" },
				],
			},
			{
				name: "Los Angeles",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 92, condition: "sunny" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 90, condition: "sunny" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 85, condition: "dust" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 88, condition: "clouds" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 94, condition: "sunny" },
				],
			},
		],
	},
	{
		country: "India",
		code: "IN",
		cities: [
			{
				name: "Mumbai",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 86, condition: "rain" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 84, condition: "rain" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 88, condition: "clouds" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 90, condition: "sunny" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 87, condition: "clouds" },
				],
			},
			{
				name: "Delhi",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 102, condition: "dust" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 99, condition: "sunny" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 96, condition: "clouds" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 94, condition: "dust" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 101, condition: "sunny" },
				],
			},
			{
				name: "Bengaluru",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 78, condition: "clouds" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 75, condition: "rain" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 80, condition: "sunny" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 77, condition: "clouds" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 74, condition: "rain" },
				],
			},
		],
	},
	{
		country: "United Kingdom",
		code: "UK",
		cities: [
			{
				name: "London",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 68, condition: "clouds" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 64, condition: "rain" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 70, condition: "clouds" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 72, condition: "sunny" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 66, condition: "rain" },
				],
			},
			{
				name: "Manchester",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 62, condition: "rain" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 60, condition: "clouds" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 65, condition: "rain" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 68, condition: "clouds" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 63, condition: "sunny" },
				],
			},
		],
	},
	{
		country: "Japan",
		code: "JP",
		cities: [
			{
				name: "Tokyo",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 89, condition: "sunny" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 91, condition: "clouds" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 85, condition: "rain" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 87, condition: "sunny" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 90, condition: "clouds" },
				],
			},
			{
				name: "Osaka",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 92, condition: "sunny" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 88, condition: "rain" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 86, condition: "clouds" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 90, condition: "sunny" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 93, condition: "dust" },
				],
			},
		],
	},
	{
		country: "Australia",
		code: "AU",
		cities: [
			{
				name: "Sydney",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 64, condition: "clouds" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 61, condition: "rain" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 67, condition: "sunny" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 70, condition: "sunny" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 66, condition: "clouds" },
				],
			},
			{
				name: "Melbourne",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 58, condition: "rain" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 55, condition: "clouds" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 60, condition: "dust" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 63, condition: "sunny" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 57, condition: "rain" },
				],
			},
		],
	},
	{
		country: "Brazil",
		code: "BR",
		cities: [
			{
				name: "São Paulo",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 73, condition: "clouds" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 76, condition: "sunny" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 71, condition: "rain" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 74, condition: "clouds" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 78, condition: "sunny" },
				],
			},
			{
				name: "Rio de Janeiro",
				days: [
					{ label: "Mon 3", date: "Mon, Aug 3", tempF: 84, condition: "sunny" },
					{ label: "Tue 4", date: "Tue, Aug 4", tempF: 86, condition: "sunny" },
					{ label: "Wed 5", date: "Wed, Aug 5", tempF: 80, condition: "rain" },
					{ label: "Thu 6", date: "Thu, Aug 6", tempF: 82, condition: "clouds" },
					{ label: "Fri 7", date: "Fri, Aug 7", tempF: 85, condition: "sunny" },
				],
			},
		],
	},
];

const CONDITION = {
	sunny: {
		label: "Sunny",
		orb: "from-[#ff9a3c] via-[#ff6b1a] to-[#e85d04]",
		glow: "rgba(255, 140, 40, 0.55)",
		Icon: Sun,
	},
	rain: {
		label: "Rain",
		orb: "from-[#7dd3fc] via-[#38bdf8] to-[#0284c7]",
		glow: "rgba(56, 189, 248, 0.5)",
		Icon: CloudRain,
	},
	clouds: {
		label: "Cloudy",
		orb: "from-[#e2e8f0] via-[#94a3b8] to-[#64748b]",
		glow: "rgba(148, 163, 184, 0.55)",
		Icon: Cloud,
	},
	dust: {
		label: "Dusty",
		orb: "from-[#fcd34d] via-[#d97706] to-[#92400e]",
		glow: "rgba(217, 119, 6, 0.5)",
		Icon: Wind,
	},
};

function fToC(f) {
	return Math.round(((f - 32) * 5) / 9);
}

function MotionSelect({
	label,
	value,
	options,
	onChange,
	isLight,
	align = "left",
}) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef(null);

	useEffect(() => {
		if (!open) return undefined;
		const onDoc = (e) => {
			if (rootRef.current && !rootRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<div ref={rootRef} className="relative min-w-0">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open}
				className={cn(
					"inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-left text-xs font-medium transition",
					isLight
						? "bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/80"
						: "bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700"
				)}
			>
				<span className="truncate">
					<span
						className={cn(
							"mr-1 font-normal",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					>
						{label}
					</span>
					{value}
				</span>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2 }}
					className="shrink-0"
				>
					<ChevronDown className="h-3.5 w-3.5 opacity-60" />
				</motion.span>
			</button>

			<AnimatePresence>
				{open ? (
					<motion.ul
						role="listbox"
						initial={{ opacity: 0, y: -6, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
						className={cn(
							"absolute top-[calc(100%+6px)] z-40 max-h-52 min-w-[10.5rem] overflow-auto rounded-2xl border p-1.5 shadow-xl backdrop-blur-xl",
							align === "right" ? "right-0" : "left-0",
							isLight
								? "border-zinc-200/80 bg-white/95 text-zinc-900 shadow-zinc-200/60"
								: "border-zinc-700/80 bg-zinc-900/95 text-zinc-50 shadow-black/40"
						)}
					>
						{options.map((opt) => {
							const selected = opt === value;
							return (
								<li key={opt}>
									<button
										type="button"
										role="option"
										aria-selected={selected}
										onClick={() => {
											onChange(opt);
											setOpen(false);
										}}
										className={cn(
											"flex w-full items-center justify-between gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition",
											selected
												? isLight
													? "bg-zinc-100 font-medium"
													: "bg-zinc-800 font-medium"
												: isLight
													? "hover:bg-zinc-50"
													: "hover:bg-zinc-800/70"
										)}
									>
										{opt}
										{selected ? (
											<Check className="h-3.5 w-3.5 shrink-0 opacity-70" />
										) : null}
									</button>
								</li>
							);
						})}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</div>
	);
}

/**
 * HeroWeatherCard — glass weather widget with country/city MotionSelects,
 * °F/°C toggle, condition orbs, and day tabs.
 */
export default function HeroWeatherCard({ isLight = true, className }) {
	const [countryName, setCountryName] = useState(WEATHER_DATA[0].country);
	const [cityName, setCityName] = useState(WEATHER_DATA[0].cities[0].name);
	const [dayIndex, setDayIndex] = useState(0);
	const [unit, setUnit] = useState("F");

	const country = useMemo(
		() => WEATHER_DATA.find((c) => c.country === countryName) || WEATHER_DATA[0],
		[countryName]
	);

	const cityOptions = useMemo(
		() => country.cities.map((c) => c.name),
		[country]
	);

	const city = useMemo(
		() => country.cities.find((c) => c.name === cityName) || country.cities[0],
		[country, cityName]
	);

	const day = city.days[Math.min(dayIndex, city.days.length - 1)];
	const meta = CONDITION[day.condition] || CONDITION.sunny;
	const ConditionIcon = meta.Icon;
	const displayTemp = unit === "F" ? day.tempF : fToC(day.tempF);

	const onCountryChange = (next) => {
		setCountryName(next);
		const found = WEATHER_DATA.find((c) => c.country === next);
		const firstCity = found?.cities?.[0]?.name;
		if (firstCity) setCityName(firstCity);
		setDayIndex(0);
	};

	const onCityChange = (next) => {
		setCityName(next);
		setDayIndex(0);
	};

	return (
		<section
			className={cn(
				"flex w-full items-center justify-center px-4 py-10 sm:py-14",
				className
			)}
			aria-label="Weather card"
		>
			<div
				className={cn(
					"relative w-full max-w-[22rem] overflow-visible rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]",
					isLight ? "bg-[#f4f4f5]" : "bg-zinc-900"
				)}
			>
				{/* Soft card body */}
				<div
					className={cn(
						"relative overflow-hidden rounded-[2rem]",
						isLight ? "bg-[#f4f4f5]" : "bg-zinc-900"
					)}
				>
					{/* Header */}
					<div className="relative z-30 flex items-start justify-between gap-3 px-5 pt-5">
						<div className="min-w-0 space-y-2">
							<div className="flex flex-wrap items-center gap-1.5">
								<MotionSelect
									label="Country"
									value={country.country}
									options={WEATHER_DATA.map((c) => c.country)}
									onChange={onCountryChange}
									isLight={isLight}
								/>
								<MotionSelect
									label="City"
									value={city.name}
									options={cityOptions}
									onChange={onCityChange}
									isLight={isLight}
								/>
							</div>
							<div>
								<h3
									className={cn(
										"truncate text-xl font-semibold tracking-tight",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{city.name}
								</h3>
								<p
									className={cn(
										"text-sm",
										isLight ? "text-zinc-400" : "text-zinc-500"
									)}
								>
									{day.date}
								</p>
							</div>
						</div>

						{/* °F / °C toggle */}
						<div
							className={cn(
								"relative flex shrink-0 rounded-full p-1 text-xs font-semibold",
								isLight ? "bg-zinc-200/80 text-zinc-500" : "bg-zinc-800 text-zinc-400"
							)}
							role="group"
							aria-label="Temperature unit"
						>
							{["F", "C"].map((u) => {
								const active = unit === u;
								return (
									<button
										key={u}
										type="button"
										onClick={() => setUnit(u)}
										className={cn(
											"relative z-10 rounded-full px-2.5 py-1 transition",
											active
												? isLight
													? "text-zinc-900"
													: "text-zinc-900"
												: ""
										)}
									>
										{active ? (
											<motion.span
												layoutId="weather-unit-pill"
												className="absolute inset-0 rounded-full bg-white shadow-sm"
												transition={{ type: "spring", stiffness: 420, damping: 34 }}
											/>
										) : null}
										<span className="relative z-10">°{u}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Orb + glass band */}
					<div className="relative mt-2 h-[17.5rem]">
						<AnimatePresence exitBeforeEnter initial={false}>
							<motion.div
								key={`${city.name}-${day.condition}-${dayIndex}`}
								initial={{ opacity: 0, scale: 0.92 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 1.04 }}
								transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
								className="absolute inset-0"
							>
								<div
									className={cn(
										"absolute left-1/2 top-[2.75rem] h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br shadow-2xl",
										meta.orb
									)}
									style={{
										boxShadow: `0 24px 60px ${meta.glow}`,
									}}
								>
									<div className="absolute left-[18%] top-[16%] h-10 w-10 rounded-full bg-white/35 blur-[1px]" />
									<div className="absolute bottom-[22%] right-[20%] h-6 w-10 rounded-full bg-black/10 blur-[2px]" />
								</div>
							</motion.div>
						</AnimatePresence>

						{/* Frosted glass strip */}
						<div
							className={cn(
								"absolute inset-x-0 bottom-0 top-[48%] z-10 border-t backdrop-blur-2xl",
								isLight
									? "border-white/50 bg-white/45"
									: "border-zinc-700/40 bg-zinc-900/45"
							)}
						/>

						{/* Temp + condition */}
						<div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-6 pb-5 pt-8">
							<AnimatePresence exitBeforeEnter initial={false}>
								<motion.div
									key={`${city.name}-${dayIndex}-${unit}`}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -6 }}
									transition={{ duration: 0.25 }}
								>
									<p
										className={cn(
											"text-5xl font-semibold tracking-tight",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										{displayTemp}°
									</p>
									<p
										className={cn(
											"mt-0.5 text-base font-medium",
											isLight ? "text-zinc-800" : "text-zinc-200"
										)}
									>
										{meta.label}
									</p>
								</motion.div>
							</AnimatePresence>

							<AnimatePresence exitBeforeEnter initial={false}>
								<motion.div
									key={`icon-${day.condition}-${dayIndex}`}
									initial={{ opacity: 0, rotate: -12 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: 12 }}
									transition={{ duration: 0.25 }}
									className={cn(
										isLight ? "text-zinc-900" : "text-zinc-100"
									)}
								>
									<ConditionIcon
										className="h-9 w-9"
										strokeWidth={1.6}
										aria-hidden
									/>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					{/* Day tabs */}
					<div
						className={cn(
							"relative z-20 flex items-center gap-0.5 overflow-x-auto px-3 pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					>
						{city.days.map((d, i) => {
							const active = i === dayIndex;
							return (
								<button
									key={d.label}
									type="button"
									onClick={() => setDayIndex(i)}
									className={cn(
										"relative shrink-0 rounded-full px-3 py-2 text-[12px] font-medium transition",
										active
											? isLight
												? "text-zinc-900"
												: "text-zinc-900"
											: isLight
												? "hover:text-zinc-600"
												: "hover:text-zinc-300"
									)}
								>
									{active ? (
										<motion.span
											layoutId="weather-day-pill"
											className="absolute inset-0 rounded-full bg-white shadow-sm"
											transition={{
												type: "spring",
												stiffness: 420,
												damping: 34,
											}}
										/>
									) : null}
									<span className="relative z-10 whitespace-nowrap">
										{d.label}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
