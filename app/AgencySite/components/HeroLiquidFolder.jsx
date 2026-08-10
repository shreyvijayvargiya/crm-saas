import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

const FOLDER_PALETTE = [
	{ id: "yellow", hex: "#F4C430", deep: "#E8B42A", ink: "#5A4308" },
	{ id: "amber", hex: "#F59E0B", deep: "#D97706", ink: "#4A2C00" },
	{ id: "orange", hex: "#FB923C", deep: "#EA580C", ink: "#4A1C00" },
	{ id: "lime", hex: "#A3E635", deep: "#84CC16", ink: "#1A2E05" },
	{ id: "rose", hex: "#FB7185", deep: "#E11D48", ink: "#4C0519" },
	{ id: "cream", hex: "#F0E5C9", deep: "#E4D4AE", ink: "#8A8378" },
];

const FILE_PALETTE = [
	{ id: "blue", hex: "#3B82F6", deep: "#2563EB", ink: "#FFFFFF" },
	{ id: "sky", hex: "#0EA5E9", deep: "#0284C7", ink: "#FFFFFF" },
	{ id: "indigo", hex: "#6366F1", deep: "#4F46E5", ink: "#FFFFFF" },
	{ id: "navy", hex: "#1E3A8A", deep: "#172554", ink: "#DBEAFE" },
	{ id: "cyan", hex: "#06B6D4", deep: "#0891B2", ink: "#FFFFFF" },
	{ id: "teal", hex: "#14B8A6", deep: "#0D9488", ink: "#FFFFFF" },
];

const FILES = [
	{
		id: "brief",
		title: "Summer launch",
		name: "Brand brief",
		ext: "PDF",
		meta: "12 pages · 2.4 MB",
		detail: "Positioning, tone, and launch narrative for the summer drop.",
		date: "Aug 2",
		Icon: FileText,
	},
	{
		id: "mood",
		title: "Summer launch",
		name: "Moodboard",
		ext: "PNG",
		meta: "2400×1600 · 1.1 MB",
		detail: "Color, type, and stills pulled from the product shoot.",
		date: "Aug 4",
		Icon: ImageIcon,
	},
	{
		id: "notes",
		title: "Summer launch",
		name: "Launch notes",
		ext: "MD",
		meta: "Draft · 4 KB",
		detail: "Checklist, owners, and open questions before go-live.",
		date: "Aug 5",
		Icon: StickyNote,
	},
];

const REST = [
	{ y: -28, x: 0, rotate: -1.5 },
	{ y: -16, x: 2, rotate: 0.8 },
	{ y: -6, x: 0, rotate: 0 },
];

const OPEN = [
	{ y: -158, x: -12, rotate: -7 },
	{ y: -118, x: 2, rotate: 1.5 },
	{ y: -78, x: 14, rotate: 6 },
];

const WAVE_A =
	"M0.04 0.05 H0.78 C0.90 0.03 0.97 0.12 0.94 0.24 C0.90 0.38 1.00 0.46 0.95 0.58 C0.89 0.72 0.99 0.80 0.91 0.90 C0.86 0.97 0.76 1 0.66 1 H0.04 C0.015 1 0 0.96 0 0.90 V0.14 C0 0.08 0.015 0.05 0.04 0.05 Z";
const WAVE_B =
	"M0.04 0.05 H0.76 C0.88 0.06 0.99 0.10 0.96 0.22 C0.92 0.36 0.86 0.44 0.93 0.56 C0.99 0.68 0.90 0.78 0.94 0.88 C0.97 0.95 0.80 1 0.68 1 H0.04 C0.015 1 0 0.96 0 0.90 V0.14 C0 0.08 0.015 0.05 0.04 0.05 Z";

function hexToRgba(hex, alpha) {
	const h = hex.replace("#", "");
	const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
	const r = (n >> 16) & 255;
	const g = (n >> 8) & 255;
	const b = n & 255;
	return `rgba(${r},${g},${b},${alpha})`;
}

function SwatchRow({ label, options, value, onChange, isLight }) {
	return (
		<div className="flex flex-col items-center gap-2">
			<p
				className={cn(
					"text-[11px] font-semibold uppercase tracking-[0.16em]",
					isLight ? "text-zinc-400" : "text-zinc-500"
				)}
			>
				{label}
			</p>
			<div className="flex items-center gap-2">
				{options.map((opt) => {
					const on = value === opt.id;
					return (
						<button
							key={opt.id}
							type="button"
							aria-label={`${label} ${opt.id}`}
							onClick={() => onChange(opt.id)}
							className={cn(
								"h-7 w-7 rounded-full transition hover:scale-105",
								on &&
									(isLight
										? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-white"
										: "ring-2 ring-white ring-offset-2 ring-offset-zinc-950")
							)}
							style={{ background: opt.hex }}
						/>
					);
				})}
			</div>
		</div>
	);
}

/**
 * HeroLiquidFolder — cream folder body + liquid glass front only.
 * Files sit inside and show through the glass; hover lifts them out above.
 */
export default function HeroLiquidFolder({ isLight = true, className }) {
	const clipId = useMemo(() => `liquid-folder-${Math.random().toString(36).slice(2, 9)}`, []);
	const [folderId, setFolderId] = useState("cream");
	const [fileId, setFileId] = useState("blue");
	const [open, setOpen] = useState(false);
	const [flipped, setFlipped] = useState(null);

	const folder = FOLDER_PALETTE.find((c) => c.id === folderId) || FOLDER_PALETTE[5];
	const fileTone = FILE_PALETTE.find((c) => c.id === fileId) || FILE_PALETTE[0];

	return (
		<section
			className={cn("mx-auto flex w-full max-w-lg flex-col items-center px-4 py-12 sm:py-16", className)}
			aria-label="Liquid folder"
		>
			<svg width="0" height="0" className="absolute">
				<defs>
					<clipPath id={clipId} clipPathUnits="objectBoundingBox">
						<motion.path
							initial={{ d: WAVE_A }}
							animate={{ d: [WAVE_A, WAVE_B, WAVE_A] }}
							transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
						/>
					</clipPath>
				</defs>
			</svg>

			<div
				className="relative h-[380px] w-full max-w-[360px]"
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => {
					setOpen(false);
					setFlipped(null);
				}}
			>
				{/* Opaque folder body + tab */}
				<div className="absolute inset-x-0 bottom-0 z-0 h-[230px]">
					<div
						className="absolute left-6 top-[-16px] h-12 w-[46%] rounded-t-[1.35rem]"
						style={{ background: folder.deep }}
						aria-hidden
					/>
					<div
						className="absolute inset-0 rounded-[2rem] shadow-[0_28px_60px_-28px_rgba(15,23,42,0.4)]"
						style={{ background: folder.hex }}
					>
						<p
							className="absolute left-7 top-5 text-[11px] font-semibold uppercase tracking-[0.22em]"
							style={{ color: folder.ink }}
						>
							Folder
						</p>
						<div
							className="absolute inset-x-7 bottom-5 flex items-end justify-between text-[11px]"
							style={{ color: folder.ink }}
						>
							<span>3 files</span>
							<span className="opacity-80">Hover to peek</span>
						</div>
					</div>
				</div>

				{/* Files inside the pocket — visible through glass */}
				{FILES.map((file, index) => {
					const pose = open ? OPEN[index] : REST[index];
					const isFlip = open && flipped === file.id;
					const Icon = file.Icon;

					return (
						<motion.div
							key={file.id}
							className="absolute inset-x-[8%] h-[168px] cursor-pointer"
							style={{
								bottom: 58,
								perspective: 1000,
								zIndex: open ? 40 + index : 8 + index,
							}}
							initial={false}
							animate={{ x: pose.x, y: pose.y, rotate: pose.rotate }}
							transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.7 }}
							onMouseEnter={() => open && setFlipped(file.id)}
							onMouseLeave={() => setFlipped(null)}
						>
							<motion.div
								className="relative h-full w-full"
								style={{ transformStyle: "preserve-3d" }}
								animate={{ rotateY: isFlip ? 180 : 0 }}
								transition={{ type: "spring", stiffness: 200, damping: 20 }}
							>
								<div
									className="absolute inset-0 overflow-hidden rounded-2xl shadow-md"
									style={{
										background: `linear-gradient(160deg, ${fileTone.hex} 0%, ${fileTone.deep} 100%)`,
										backfaceVisibility: "hidden",
										WebkitBackfaceVisibility: "hidden",
									}}
								>
									<div className="flex h-full flex-col justify-between p-4">
										<div className="flex items-start justify-between">
											<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white">
												<Icon className="h-4 w-4" />
											</span>
											<span className="text-[11px] font-semibold tracking-wide text-white/90">
												{file.ext}
											</span>
										</div>
										<div>
											<p className="text-[1.35rem] font-semibold tracking-tight text-zinc-900/80">
												{file.title}
											</p>
											<p className="mt-0.5 text-sm font-medium text-white">{file.name}</p>
											<p className="mt-1 text-[11px] text-white/70">{file.meta}</p>
										</div>
									</div>
								</div>

								<div
									className="absolute inset-0 overflow-hidden rounded-2xl p-4 shadow-md"
									style={{
										background: `linear-gradient(160deg, ${fileTone.deep} 0%, ${fileTone.hex} 100%)`,
										transform: "rotateY(180deg)",
										backfaceVisibility: "hidden",
										WebkitBackfaceVisibility: "hidden",
									}}
								>
									<p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
										{file.date}
									</p>
									<p className="mt-1 text-sm font-semibold tracking-tight text-white">{file.name}</p>
									<p className="mt-2 text-[12px] leading-snug text-white/85">{file.detail}</p>
								</div>
							</motion.div>
						</motion.div>
					);
				})}

				{/* Liquid glass — front portion only */}
				<div
					className="pointer-events-none absolute inset-x-3 bottom-[42px] z-20 h-[168px]"
					style={{ clipPath: `url(#${clipId})` }}
				>
					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(145deg, ${hexToRgba(fileTone.hex, 0.38)} 0%, ${hexToRgba(
								fileTone.deep,
								0.22
							)} 55%, rgba(255,255,255,0.18) 100%)`,
							backdropFilter: "blur(18px) saturate(1.55)",
							WebkitBackdropFilter: "blur(18px) saturate(1.55)",
							boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.08)",
						}}
					/>
					<motion.div
						aria-hidden
						className="absolute -left-8 top-[-20%] h-40 w-40 rounded-full blur-2xl"
						style={{ background: "rgba(255,255,255,0.45)" }}
						animate={{ x: [0, 30, -12, 0], y: [0, 14, -8, 0] }}
						transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						aria-hidden
						className="absolute -right-6 bottom-[-30%] h-36 w-36 rounded-full blur-2xl"
						style={{ background: hexToRgba(fileTone.hex, 0.45) }}
						animate={{ x: [0, -18, 10, 0], y: [0, -10, 12, 0] }}
						transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
					/>
				</div>
			</div>

			<div className="mt-8 flex w-full max-w-sm flex-col items-center gap-5">
				<SwatchRow
					label="Folder"
					options={FOLDER_PALETTE}
					value={folderId}
					onChange={setFolderId}
					isLight={isLight}
				/>
				<SwatchRow
					label="Files"
					options={FILE_PALETTE}
					value={fileId}
					onChange={setFileId}
					isLight={isLight}
				/>
			</div>
		</section>
	);
}
