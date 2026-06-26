import React from "react";
import { Check, ChevronDown, CornerDownRight, Palette, Type, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeCustomizer } from "../../utils/ThemeCustomizerContext";
import {
	stylePresets,
	baseColorPresets,
	accentPresets,
	chartColorPresets,
	radiusPresets,
	fontPresets,
	fontSizePresets,
	uiScalePresets,
} from "../../utils/themeCustomizer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PANEL_WIDTH = 300;

const dropdownContentProps = {
	side: "left",
	align: "start",
	sideOffset: 8,
	className:
		"z-[250] w-52 border-zinc-200 bg-white text-zinc-900 shadow-lg",
};

function CustomizerDropdownContent({ className, children, ...props }) {
	return (
		<DropdownMenuContent
			{...dropdownContentProps}
			{...props}
			className={cn(dropdownContentProps.className, className)}
		>
			{children}
		</DropdownMenuContent>
	);
}

function CustomizerDropdownItem({ className, ...props }) {
	return (
		<DropdownMenuItem
			className={cn(
				"text-zinc-900 focus:bg-zinc-100 focus:text-zinc-900",
				className
			)}
			{...props}
		/>
	);
}

function CustomizerRow({ label, value, icon, children }) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
			<p className="text-[11px] font-medium text-zinc-500">{label}</p>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						className="mt-2 h-auto w-full justify-between gap-2 rounded-lg px-1 py-1 font-normal hover:bg-zinc-50"
					>
						<span className="flex min-w-0 items-center gap-2.5">
							{icon}
							<span className="truncate text-sm font-medium text-zinc-900">
								{value}
							</span>
						</span>
						<ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
					</Button>
				</DropdownMenuTrigger>
				{children}
			</DropdownMenu>
		</div>
	);
}

function SwatchIcon({ color, className }) {
	return (
		<span
			className={cn("inline-block h-5 w-5 shrink-0 rounded-full border border-black/10", className)}
			style={{ backgroundColor: color }}
		/>
	);
}

function FontIcon() {
	return (
		<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-[10px] font-semibold text-zinc-700">
			Aa
		</span>
	);
}

function RadiusIcon({ radiusKey }) {
	const radius = radiusPresets[radiusKey]?.value ?? "0.5rem";
	return (
		<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
			<CornerDownRight
				className="h-3.5 w-3.5 text-zinc-600"
				style={{ borderBottomRightRadius: radius }}
			/>
		</span>
	);
}

function FontSizeIcon({ fontSizeKey }) {
	const size = fontSizePresets[fontSizeKey]?.value ?? "16px";
	return (
		<span
			className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 font-semibold text-zinc-700"
			style={{ fontSize: `calc(${size} * 0.55)` }}
		>
			Aa
		</span>
	);
}

function UiScaleIcon({ uiScaleKey }) {
	const scale = Number(uiScalePresets[uiScaleKey]?.value ?? 1);
	return (
		<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
			<span
				className="rounded-sm bg-zinc-600"
				style={{
					width: `${Math.round(14 * scale)}px`,
					height: `${Math.round(8 * scale)}px`,
				}}
			/>
		</span>
	);
}

const ThemeCustomizer = () => {
	const { settings, updateSetting, resetSettings, open, setOpen } =
		useThemeCustomizer();

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						key="customizer-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[199] bg-black/20"
						onClick={() => setOpen(false)}
						aria-hidden
					/>
					<motion.aside
						key="customizer-panel"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
						className="fixed right-0 top-0 z-[200] flex h-screen flex-col border-l border-zinc-200 bg-zinc-50/95 backdrop-blur-sm"
						style={{ width: PANEL_WIDTH }}
						data-theme-customizer
						aria-label="Theme customizer"
					>
						<div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
							<div>
								<p className="text-sm font-semibold text-zinc-900">Theme</p>
								<p className="text-[11px] text-zinc-500">Customize design tokens</p>
							</div>
							<div className="flex items-center gap-1">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={resetSettings}
									className="h-auto px-2 py-1 text-[11px] font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
								>
									Reset
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => setOpen(false)}
									className="h-8 w-8 text-zinc-500 hover:bg-zinc-100"
									aria-label="Close theme customizer"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</div>

						<div className="flex-1 space-y-3 overflow-y-auto p-3 hidescrollbar">
							<CustomizerRow
								label="Style"
								value={stylePresets[settings.style]?.label}
								icon={
									<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100">
										<Palette className="h-3 w-3 text-zinc-600" />
									</span>
								}
							>
								<CustomizerDropdownContent>
									{Object.entries(stylePresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("style", key)}
											className="justify-between"
										>
											{preset.label}
											{settings.style === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Base Color"
								value={baseColorPresets[settings.baseColor]?.label}
								icon={<SwatchIcon color={baseColorPresets[settings.baseColor]?.swatch} />}
							>
								<CustomizerDropdownContent>
									{Object.entries(baseColorPresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("baseColor", key)}
											className="justify-between gap-2"
										>
											<span className="flex items-center gap-2">
												<SwatchIcon color={preset.swatch} />
												{preset.label}
											</span>
											{settings.baseColor === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Theme"
								value={accentPresets[settings.accent]?.label}
								icon={<SwatchIcon color={accentPresets[settings.accent]?.swatch} />}
							>
								<CustomizerDropdownContent className="max-h-72 overflow-y-auto">
									{Object.entries(accentPresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("accent", key)}
											className="justify-between gap-2"
										>
											<span className="flex items-center gap-2">
												<SwatchIcon color={preset.swatch} />
												{preset.label}
											</span>
											{settings.accent === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Chart Color"
								value={chartColorPresets[settings.chartColor]?.label}
								icon={<SwatchIcon color={chartColorPresets[settings.chartColor]?.swatch} />}
							>
								<CustomizerDropdownContent>
									{Object.entries(chartColorPresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("chartColor", key)}
											className="justify-between gap-2"
										>
											<span className="flex items-center gap-2">
												<SwatchIcon color={preset.swatch} />
												{preset.label}
											</span>
											{settings.chartColor === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Heading"
								value={fontPresets[settings.headingFont]?.label}
								icon={<FontIcon />}
							>
								<CustomizerDropdownContent className="max-h-72 overflow-y-auto">
									{Object.entries(fontPresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("headingFont", key)}
											className="justify-between"
										>
											{preset.label}
											{settings.headingFont === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Font"
								value={fontPresets[settings.bodyFont]?.label}
								icon={
									<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
										<Type className="h-3 w-3 text-zinc-600" />
									</span>
								}
							>
								<CustomizerDropdownContent className="max-h-72 overflow-y-auto">
									{Object.entries(fontPresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("bodyFont", key)}
											className="justify-between"
										>
											{preset.label}
											{settings.bodyFont === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Font Size"
								value={fontSizePresets[settings.fontSize]?.label}
								icon={<FontSizeIcon fontSizeKey={settings.fontSize} />}
							>
								<CustomizerDropdownContent>
									{Object.entries(fontSizePresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("fontSize", key)}
											className="justify-between gap-2"
										>
											<span className="flex items-center gap-2">
												<FontSizeIcon fontSizeKey={key} />
												{preset.label}
											</span>
											{settings.fontSize === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="UI Density"
								value={uiScalePresets[settings.uiScale]?.label}
								icon={<UiScaleIcon uiScaleKey={settings.uiScale} />}
							>
								<CustomizerDropdownContent>
									{Object.entries(uiScalePresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("uiScale", key)}
											className="justify-between gap-2"
										>
											<span className="flex min-w-0 flex-col gap-0.5">
												<span className="flex items-center gap-2">
													<UiScaleIcon uiScaleKey={key} />
													{preset.label}
												</span>
												<span className="pl-7 text-[10px] text-zinc-500">
													{preset.description}
												</span>
											</span>
											{settings.uiScale === key && <Check className="h-4 w-4 shrink-0" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>

							<CustomizerRow
								label="Radius"
								value={radiusPresets[settings.radius]?.label}
								icon={<RadiusIcon radiusKey={settings.radius} />}
							>
								<CustomizerDropdownContent>
									{Object.entries(radiusPresets).map(([key, preset]) => (
										<CustomizerDropdownItem
											key={key}
											onClick={() => updateSetting("radius", key)}
											className="justify-between"
										>
											{preset.label}
											{settings.radius === key && <Check className="h-4 w-4" />}
										</CustomizerDropdownItem>
									))}
								</CustomizerDropdownContent>
							</CustomizerRow>
						</div>

						<div className="border-t border-zinc-200 bg-white px-4 py-3">
							<p className="text-[10px] leading-relaxed text-zinc-400">
								Changes apply to CSS variables on{" "}
								<code className="rounded bg-zinc-100 px-1 text-zinc-600">:root</code>{" "}
								and persist in localStorage.
							</p>
						</div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
};

export default ThemeCustomizer;
