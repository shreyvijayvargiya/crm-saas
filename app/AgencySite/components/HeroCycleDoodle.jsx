import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* Local copy of https://moneyincheck.org/video/doodle-6.mp4 */
const VIDEO_SRC = "/agency/doodle-6.mp4";

/** Knock out light paper pixels so the doodle sits transparent on the page. */
function punchTransparent(ctx, w, h, threshold = 232) {
	const img = ctx.getImageData(0, 0, w, h);
	const d = img.data;
	for (let i = 0; i < d.length; i += 4) {
		const r = d[i];
		const g = d[i + 1];
		const b = d[i + 2];
		/* Near-white / light-gray paper → fully transparent */
		if (r > threshold && g > threshold && b > threshold) {
			d[i + 3] = 0;
			continue;
		}
		/* Soft edge on lighter greys so the cut isn’t jagged */
		const lum = (r + g + b) / 3;
		if (lum > threshold - 28) {
			const t = (lum - (threshold - 28)) / 28;
			d[i + 3] = Math.round(d[i + 3] * (1 - t));
		}
	}
	ctx.putImageData(img, 0, 0);
}

/**
 * HeroCycleDoodle — charcoal cyclist on a string.
 * Scroll rides the full string; canvas keys out the video paper so only ink shows.
 * Pedals scrub with scroll and freeze when scrolling stops.
 */
export default function HeroCycleDoodle({
	isLight = true,
	className,
	scrollHeightVh = 280,
}) {
	const sectionRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const targetTimeRef = useRef(0);
	const [ready, setReady] = useState(false);
	const [duration, setDuration] = useState(0);
	const [frameSize, setFrameSize] = useState({ w: 119, h: 119 });

	const bg = isLight ? "#f3f1ec" : "#141412";
	const ink = isLight ? "#1a1a18" : "#ebe8e2";
	const stringColor = isLight ? "rgba(20,20,18,0.55)" : "rgba(245,245,240,0.45)";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const p = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 28,
		restDelta: 0.001,
	});

	/*
	  Doodle is ~1/4 page wide; travel runs the full string
	  (left padding → almost right edge, leaving room for the figure).
	*/
	const x = useTransform(p, [0, 1], ["2vw", "108vw"]);
	const hintOpacity = useTransform(p, [0, 0.08, 0.2], [1, 1, 0]);

	const paintFrame = () => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		if (!video || !canvas || video.readyState < 2) return;
		const w = video.videoWidth || frameSize.w;
		const h = video.videoHeight || frameSize.h;
		if (w < 2 || h < 2) return;
		if (canvas.width !== w || canvas.height !== h) {
			canvas.width = w;
			canvas.height = h;
			setFrameSize({ w, h });
		}
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) return;
		ctx.clearRect(0, 0, w, h);
		ctx.drawImage(video, 0, 0, w, h);
		/* Video paper is always light — key it out on any theme */
		punchTransparent(ctx, w, h, 228);
	};

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return undefined;

		const onMeta = () => {
			const d = video.duration;
			if (Number.isFinite(d) && d > 0) {
				setDuration(d);
				setFrameSize({
					w: video.videoWidth || 119,
					h: video.videoHeight || 119,
				});
				setReady(true);
				video.pause();
				video.currentTime = 0;
			}
		};

		const onSeeked = () => paintFrame();

		if (video.readyState >= 1) onMeta();
		video.addEventListener("loadedmetadata", onMeta);
		video.addEventListener("seeked", onSeeked);
		video.addEventListener("loadeddata", onSeeked);
		return () => {
			video.removeEventListener("loadedmetadata", onMeta);
			video.removeEventListener("seeked", onSeeked);
			video.removeEventListener("loadeddata", onSeeked);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLight]);

	useEffect(() => {
		if (!ready || duration <= 0) return undefined;

		const applyTime = () => {
			rafRef.current = 0;
			const video = videoRef.current;
			if (!video || !Number.isFinite(video.duration)) return;
			const next = targetTimeRef.current;
			if (Math.abs(video.currentTime - next) > 0.008) {
				try {
					video.currentTime = next;
				} catch {
					/* seek may throw before ready */
				}
			} else {
				paintFrame();
			}
			video.pause();
		};

		const scrub = (progress) => {
			const t = Math.max(0, Math.min(1, progress));
			const loops = 6;
			const raw = (t * duration * loops) % duration;
			targetTimeRef.current = raw < 0.02 && t > 0.98 ? duration - 0.04 : raw;
			if (!rafRef.current) {
				rafRef.current = requestAnimationFrame(applyTime);
			}
		};

		const unsub = p.onChange(scrub);
		scrub(p.get());

		return () => {
			unsub();
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready, duration, p, isLight]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Scroll cyclist doodle"
		>
			<div
				className="sticky top-0 flex h-screen flex-col overflow-hidden"
				style={{ background: bg, color: ink }}
			>
				<header className="relative z-10 px-6 pt-10 sm:px-12 sm:pt-14">
					<p
						className="font-serif text-[11px] uppercase tracking-[0.28em]"
						style={{ color: isLight ? "#6b6560" : "#9a9590" }}
					>
						Scroll ride
					</p>
					<h2 className="mt-3 max-w-lg font-serif text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
						Pedal with the page.
					</h2>
				</header>

				{/* Stage — transparent doodle rides the full string */}
				<div className="relative z-10 flex min-h-0 flex-1 items-center">
					<div
						className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-[4.5rem] sm:inset-x-10 sm:-translate-y-[5.5rem]"
						style={{ background: stringColor }}
						aria-hidden
					/>
					<span
						className="pointer-events-none absolute left-6 top-1/2 h-2 w-2 -translate-y-[4.65rem] rounded-full sm:left-10 sm:-translate-y-[5.65rem]"
						style={{ background: stringColor }}
						aria-hidden
					/>
					<span
						className="pointer-events-none absolute right-6 top-1/2 h-2 w-2 -translate-y-[4.65rem] rounded-full sm:right-10 sm:-translate-y-[5.65rem]"
						style={{ background: stringColor }}
						aria-hidden
					/>

					<motion.div
						style={{ x }}
						className="relative will-change-transform"
					>
						<span
							className="pointer-events-none absolute left-1/2 top-1 z-10 h-4 w-px -translate-x-1/2"
							style={{ background: stringColor }}
							aria-hidden
						/>

						{/* Hidden source — painted to keyed canvas */}
						<video
							ref={videoRef}
							src={VIDEO_SRC}
							muted
							playsInline
							preload="auto"
							className="pointer-events-none absolute h-px w-px opacity-0"
							aria-hidden
						/>

						<canvas
							ref={canvasRef}
							width={frameSize.w}
							height={frameSize.h}
							className="block h-auto w-[min(25vw,220px)] bg-transparent"
							aria-label="Hand-drawn man cycling"
						/>
					</motion.div>
				</div>

				<motion.p
					style={{ opacity: hintOpacity }}
					className="absolute bottom-8 left-6 z-10 font-serif text-xs tracking-wide sm:left-12"
					aria-hidden
				>
					↓ Scroll — rides the string · tires only while you move
				</motion.p>
			</div>
		</section>
	);
}
