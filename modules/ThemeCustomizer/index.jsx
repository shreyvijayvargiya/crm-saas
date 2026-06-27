import React from "react";
import {
	Check,
	ChevronDown,
	CornerDownRight,
	Palette,
	Type,
	X,
	Minus,
	Sparkles,
	LayoutGrid,
} from "lucide-react";
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
	borderStylePresets,
	borderWidthPresets,
	shadowPresets,
	spacingPresets,
	lineHeightPresets,
	letterSpacingPresets,
	ringWidthPresets,
	backdropBlurPresets,
} from "../../utils/themeCustomizer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PANEL_WIDTH = 320;

const dropdownContentProps = {
	side: "left",
	align: "start",
	sideOffset: 8,
	className: "z-[250] w-56 border-zinc-200 bg-white text-zinc-900 shadow-lg",
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
			className={cn("text-zinc-900 focus:bg-zinc-100 focus:text-zinc-900", className)}
			{...props}
		/>
	);
}

function CustomizerSection({ title, children }) {
	return (
		<div className="space-y-2">
			<p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
				{title}
			</p>
			<div className="space-y-2">{children}</div>
		</div>
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
							<span className="truncate text-sm font-medium text-zinc-900">{value}</span>
						</span>
						<ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
					</Button>
				</DropdownMenuTrigger>
				{children}
			</DropdownMenu>
		</div>
	);
}

function PresetDropdown({ presets, value, onSelect, renderItem, className }) {
	return (
		<CustomizerDropdownContent className={className}>
			{Object.entries(presets).map(([key, preset]) => (
				<CustomizerDropdownItem
					key={key}
					onClick={() => onSelect(key)}
					className="justify-between gap-2"
				>
					{renderItem ? renderItem(key, preset) : preset.label}
					{value === key && <Check className="h-4 w-4 shrink-0" />}
				</CustomizerDropdownItem>
			))}
		</CustomizerDropdownContent>
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

function BorderStyleIcon({ styleKey }) {
	const style = borderStylePresets[styleKey]?.value ?? "solid";
	return (
		<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 p-0.5">
			<span
				className="h-full w-full rounded-sm border-zinc-500"
				style={{ borderStyle: style, borderWidth: style === "none" ? 0 : "2px" }}
			/>
		</span>
	);
}

function BorderWidthIcon({ widthKey }) {
	const width = borderWidthPresets[widthKey]?.value ?? "1px";
	return (
		<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
			<Minus className="text-zinc-600" style={{ strokeWidth: width === "0.5px" ? 1 : width === "3px" ? 3 : 2 }} />
		</span>
	);
}

function ShadowIcon({ shadowKey }) {
	const shadow = shadowPresets[shadowKey]?.value ?? shadowPresets.sm.value;
	return (
		<span
			className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-50"
			style={{ boxShadow: shadow === "none" ? "none" : shadow }}
		>
			<span className="h-2.5 w-2.5 rounded-sm bg-zinc-400" />
		</span>
	);
}

function LivePreview({ settings }) {
	const borderStyle = borderStylePresets[settings.borderStyle]?.value ?? "solid";
	const borderWidth = borderWidthPresets[settings.borderWidth]?.value ?? "1px";
	const shadow = shadowPresets[settings.shadow]?.value ?? shadowPresets.sm.value;
	const radius = radiusPresets[settings.radius]?.value ?? "0.5rem";
	const blur = backdropBlurPresets[settings.backdropBlur]?.value ?? "0px";

	return (
		<div
			className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-white p-3"
			style={{ backdropFilter: blur !== "0px" ? `blur(${blur})` : undefined }}
		>
			<p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
				Preview
			</p>
			<div
				className="rounded-lg bg-white p-3"
				style={{
					borderStyle,
					borderWidth,
					borderColor: "hsl(240 5.9% 90%)",
					borderRadius: radius,
					boxShadow: shadow === "none" ? "none" : shadow,
				}}
			>
				<p className="text-sm font-semibold text-zinc-900">Card surface</p>
				<p
					className="mt-1 text-xs text-zinc-500"
					style={{
						lineHeight: lineHeightPresets[settings.lineHeight]?.value,
						letterSpacing: letterSpacingPresets[settings.letterSpacing]?.value,
					}}
				>
					Borders, shadow, radius, and type tokens update live.
				</p>
				<div className="mt-3 flex gap-2">
					<span
						className="rounded-md px-2 py-1 text-[10px] font-medium text-white"
						style={{ background: "hsl(221 83% 53%)" }}
					>
						Primary
					</span>
					<span className="rounded-md border px-2 py-1 text-[10px] font-medium text-zinc-700" style={{ borderStyle, borderWidth }}>
						Outline
					</span>
				</div>
			</div>
		</div>
	);
}

const ThemeCustomizer = () => {
	const { settings, updateSetting, resetSettings, open, setOpen } = useThemeCustomizer();

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
						className="fixed inset-0 z-[199] bg-black/20 backdrop-themed"
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
								<p className="text-sm font-semibold text-zinc-900">Design tokens</p>
								<p className="text-[11px] text-zinc-500">Figma-style CSS variables</p>
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

						<div className="flex-1 space-y-4 overflow-y-auto p-3 hidescrollbar">
							<LivePreview settings={settings} />

							<CustomizerSection title="Colors">
								<CustomizerRow
									label="Style preset"
									value={stylePresets[settings.style]?.label}
									icon={
										<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100">
											<Palette className="h-3 w-3 text-zinc-600" />
										</span>
									}
								>
									<PresetDropdown
										presets={stylePresets}
										value={settings.style}
										onSelect={(key) => updateSetting("style", key)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Base color"
									value={baseColorPresets[settings.baseColor]?.label}
									icon={<SwatchIcon color={baseColorPresets[settings.baseColor]?.swatch} />}
								>
									<PresetDropdown
										presets={baseColorPresets}
										value={settings.baseColor}
										onSelect={(key) => updateSetting("baseColor", key)}
										renderItem={(key, preset) => (
											<span className="flex items-center gap-2">
												<SwatchIcon color={preset.swatch} />
												{preset.label}
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Accent"
									value={accentPresets[settings.accent]?.label}
									icon={<SwatchIcon color={accentPresets[settings.accent]?.swatch} />}
								>
									<PresetDropdown
										presets={accentPresets}
										value={settings.accent}
										onSelect={(key) => updateSetting("accent", key)}
										className="max-h-72 overflow-y-auto"
										renderItem={(key, preset) => (
											<span className="flex items-center gap-2">
												<SwatchIcon color={preset.swatch} />
												{preset.label}
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Chart color"
									value={chartColorPresets[settings.chartColor]?.label}
									icon={<SwatchIcon color={chartColorPresets[settings.chartColor]?.swatch} />}
								>
									<PresetDropdown
										presets={chartColorPresets}
										value={settings.chartColor}
										onSelect={(key) => updateSetting("chartColor", key)}
										renderItem={(key, preset) => (
											<span className="flex items-center gap-2">
												<SwatchIcon color={preset.swatch} />
												{preset.label}
											</span>
										)}
									/>
								</CustomizerRow>
							</CustomizerSection>

							<CustomizerSection title="Typography">
								<CustomizerRow
									label="Heading font"
									value={fontPresets[settings.headingFont]?.label}
									icon={<FontIcon />}
								>
									<PresetDropdown
										presets={fontPresets}
										value={settings.headingFont}
										onSelect={(key) => updateSetting("headingFont", key)}
										className="max-h-72 overflow-y-auto"
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Body font"
									value={fontPresets[settings.bodyFont]?.label}
									icon={
										<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
											<Type className="h-3 w-3 text-zinc-600" />
										</span>
									}
								>
									<PresetDropdown
										presets={fontPresets}
										value={settings.bodyFont}
										onSelect={(key) => updateSetting("bodyFont", key)}
										className="max-h-72 overflow-y-auto"
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Font size"
									value={fontSizePresets[settings.fontSize]?.label}
									icon={<FontSizeIcon fontSizeKey={settings.fontSize} />}
								>
									<PresetDropdown
										presets={fontSizePresets}
										value={settings.fontSize}
										onSelect={(key) => updateSetting("fontSize", key)}
										renderItem={(key, preset) => (
											<span className="flex items-center gap-2">
												<FontSizeIcon fontSizeKey={key} />
												{preset.label}
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Line height"
									value={lineHeightPresets[settings.lineHeight]?.label}
									icon={<FontIcon />}
								>
									<PresetDropdown
										presets={lineHeightPresets}
										value={settings.lineHeight}
										onSelect={(key) => updateSetting("lineHeight", key)}
										renderItem={(key, preset) => (
											<span className="flex min-w-0 flex-col gap-0.5">
												<span>{preset.label}</span>
												{preset.description && (
													<span className="text-[10px] text-zinc-500">{preset.description}</span>
												)}
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Letter spacing"
									value={letterSpacingPresets[settings.letterSpacing]?.label}
									icon={<FontIcon />}
								>
									<PresetDropdown
										presets={letterSpacingPresets}
										value={settings.letterSpacing}
										onSelect={(key) => updateSetting("letterSpacing", key)}
									/>
								</CustomizerRow>
							</CustomizerSection>

							<CustomizerSection title="Layout">
								<CustomizerRow
									label="UI density"
									value={uiScalePresets[settings.uiScale]?.label}
									icon={<UiScaleIcon uiScaleKey={settings.uiScale} />}
								>
									<PresetDropdown
										presets={uiScalePresets}
										value={settings.uiScale}
										onSelect={(key) => updateSetting("uiScale", key)}
										renderItem={(key, preset) => (
											<span className="flex min-w-0 flex-col gap-0.5">
												<span className="flex items-center gap-2">
													<UiScaleIcon uiScaleKey={key} />
													{preset.label}
												</span>
												<span className="pl-7 text-[10px] text-zinc-500">{preset.description}</span>
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Spacing scale"
									value={spacingPresets[settings.spacing]?.label}
									icon={
										<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
											<LayoutGrid className="h-3 w-3 text-zinc-600" />
										</span>
									}
								>
									<PresetDropdown
										presets={spacingPresets}
										value={settings.spacing}
										onSelect={(key) => updateSetting("spacing", key)}
										renderItem={(key, preset) => (
											<span className="flex min-w-0 flex-col gap-0.5">
												<span>{preset.label}</span>
												<span className="text-[10px] text-zinc-500">{preset.description}</span>
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Corner radius"
									value={radiusPresets[settings.radius]?.label}
									icon={<RadiusIcon radiusKey={settings.radius} />}
								>
									<PresetDropdown
										presets={radiusPresets}
										value={settings.radius}
										onSelect={(key) => updateSetting("radius", key)}
									/>
								</CustomizerRow>
							</CustomizerSection>

							<CustomizerSection title="Borders & effects">
								<CustomizerRow
									label="Border style"
									value={borderStylePresets[settings.borderStyle]?.label}
									icon={<BorderStyleIcon styleKey={settings.borderStyle} />}
								>
									<PresetDropdown
										presets={borderStylePresets}
										value={settings.borderStyle}
										onSelect={(key) => updateSetting("borderStyle", key)}
										renderItem={(key, preset) => (
											<span className="flex items-center gap-2">
												<BorderStyleIcon styleKey={key} />
												{preset.label}
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Border width"
									value={borderWidthPresets[settings.borderWidth]?.label}
									icon={<BorderWidthIcon widthKey={settings.borderWidth} />}
								>
									<PresetDropdown
										presets={borderWidthPresets}
										value={settings.borderWidth}
										onSelect={(key) => updateSetting("borderWidth", key)}
										renderItem={(key, preset) => (
											<span className="flex min-w-0 flex-col gap-0.5">
												<span className="flex items-center gap-2">
													<BorderWidthIcon widthKey={key} />
													{preset.label}
												</span>
												<span className="pl-7 text-[10px] text-zinc-500">{preset.description}</span>
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Shadow / elevation"
									value={shadowPresets[settings.shadow]?.label}
									icon={<ShadowIcon shadowKey={settings.shadow} />}
								>
									<PresetDropdown
										presets={shadowPresets}
										value={settings.shadow}
										onSelect={(key) => updateSetting("shadow", key)}
										renderItem={(key, preset) => (
											<span className="flex min-w-0 flex-col gap-0.5">
												<span className="flex items-center gap-2">
													<ShadowIcon shadowKey={key} />
													{preset.label}
												</span>
												<span className="pl-7 text-[10px] text-zinc-500">{preset.description}</span>
											</span>
										)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Backdrop blur"
									value={backdropBlurPresets[settings.backdropBlur]?.label}
									icon={
										<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
											<Sparkles className="h-3 w-3 text-zinc-600" />
										</span>
									}
								>
									<PresetDropdown
										presets={backdropBlurPresets}
										value={settings.backdropBlur}
										onSelect={(key) => updateSetting("backdropBlur", key)}
									/>
								</CustomizerRow>

								<CustomizerRow
									label="Focus ring width"
									value={ringWidthPresets[settings.ringWidth]?.label}
									icon={<BorderWidthIcon widthKey={settings.ringWidth === "thick" ? "thick" : "thin"} />}
								>
									<PresetDropdown
										presets={ringWidthPresets}
										value={settings.ringWidth}
										onSelect={(key) => updateSetting("ringWidth", key)}
										renderItem={(key, preset) => (
											<span className="flex min-w-0 flex-col gap-0.5">
												<span>{preset.label}</span>
												<span className="text-[10px] text-zinc-500">{preset.description}</span>
											</span>
										)}
									/>
								</CustomizerRow>
							</CustomizerSection>
						</div>

						<div className="border-t border-zinc-200 bg-white px-4 py-3">
							<p className="text-[10px] leading-relaxed text-zinc-400">
								Tokens map to CSS variables on{" "}
								<code className="rounded bg-zinc-100 px-1 text-zinc-600">:root</code> — border
								style, width, shadow, spacing, type, and blur. Saved to localStorage.
							</p>
						</div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
};

export default ThemeCustomizer;
