import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LOGOS = [
	{ id: "n", label: "N", color: "#e50914" },
	{ id: "a", label: "A", color: "#ff9900" },
	{ id: "g", label: "G", color: "#4285f4" },
	{ id: "s", label: "S", color: "#1db954" },
	{ id: "m", label: "M", color: "#0a66c2" },
	{ id: "x", label: "X", color: "#111111" },
];

/**
 * HeroGlassLogos — frosted 3D glass tile with company marks on the front face.
 */
export default function HeroGlassLogos({ className }) {
	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="3D glass logos"
		>
			<div
				className="relative flex min-h-[min(85vh,640px)] flex-col items-center justify-center px-4 py-16"
				style={{
					background:
						"radial-gradient(ellipse at 40% 30%, #dbeafe 0%, #f1f5f9 45%, #e2e8f0 100%)",
				}}
			>
				<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
					Glass mark
				</p>
				<h2 className="mt-2 font-serif text-3xl tracking-tight text-slate-900">
					Front-of-glass logos
				</h2>

				<div
					className="mt-12"
					style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
				>
					<motion.div
						className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px]"
						style={{ transformStyle: "preserve-3d" }}
						animate={{ rotateY: [-18, -12, -18], rotateX: [12, 16, 12] }}
						transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
					>
						{/* Back glow */}
						<div
							className="absolute inset-6 rounded-[2rem] bg-sky-400/30 blur-2xl"
							style={{ transform: "translateZ(-40px)" }}
						/>

						{/* Glass slab */}
						<div
							className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)]"
							style={{
								transform: "translateZ(0px)",
								background:
									"linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(226,232,240,0.35) 45%, rgba(255,255,255,0.55) 100%)",
								backdropFilter: "blur(18px)",
								WebkitBackdropFilter: "blur(18px)",
							}}
						>
							{/* Specular streak */}
							<div className="pointer-events-none absolute -left-10 top-0 h-full w-24 rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

							{/* Logos on front */}
							<div
								className="absolute inset-0 grid grid-cols-3 place-items-center gap-3 p-10"
								style={{ transform: "translateZ(28px)" }}
							>
								{LOGOS.map((logo, i) => (
									<motion.div
										key={logo.id}
										className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl"
										style={{
											backgroundColor: logo.color,
											boxShadow: `0 12px 28px -8px ${logo.color}99`,
										}}
										animate={{ y: [0, -4, 0] }}
										transition={{
											duration: 2.4 + i * 0.2,
											repeat: Infinity,
											ease: "easeInOut",
											delay: i * 0.12,
										}}
									>
										{logo.label}
									</motion.div>
								))}
							</div>

							{/* Edge thickness illusion */}
							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-slate-400/30 to-transparent" />
						</div>

						{/* Side edge */}
						<div
							className="absolute inset-y-4 -right-2 w-3 rounded-r-xl bg-gradient-to-b from-white/50 to-slate-300/40"
							style={{ transform: "rotateY(90deg) translateZ(170px)" }}
						/>
					</motion.div>
				</div>

				<p className="mt-10 max-w-sm text-center text-sm text-slate-500">
					Frosted slab with marks floating on the front face — soft 3D tilt loop.
				</p>
			</div>
		</section>
	);
}
