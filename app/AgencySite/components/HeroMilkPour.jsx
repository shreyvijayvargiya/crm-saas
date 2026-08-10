import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const MILK = "#F9EBDB";
const MILK_DEEP = "#F0DCC4";

function MilkBottle({ className, milkLevel, clipId }) {
	/* Body roughly y 160–500 — fill rises from bottom */
	const y = useTransform(milkLevel, [0, 1], [500, 155]);
	const h = useTransform(milkLevel, [0, 1], [0, 345]);

	return (
		<svg
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<defs>
				<clipPath id={clipId}>
					<motion.rect x="145" width="230" style={{ y, height: h }} />
				</clipPath>
			</defs>

			<rect x="197.022" y="8.17" fill="#51C0C2" width="117.956" height="32.681" />
			<path
				fill="#C8FEFF"
				d="M304.085,73.532l36.145,71.626c-21.057,0-21.057,15.741-42.115,15.741s-21.057-15.741-42.115-15.741 c-21.057,0-21.057,15.741-42.115,15.741s-21.057-15.741-42.115-15.741l36.145-71.626V40.851h96.169L304.085,73.532L304.085,73.532z"
			/>
			{/* Empty glass */}
			<path
				fill="#E8F4F5"
				fillOpacity="0.5"
				d="M364.218,214.463v267.58c0,11.983-9.804,21.787-21.787,21.787h-172.86 c-11.983,0-21.787-9.804-21.787-21.787v-267.58c0-11.983,4.412-30.535,9.815-41.232l14.173-28.073 c21.057,0,21.057,15.741,42.115,15.741s21.057-15.741,42.115-15.741c21.057,0,21.057,15.741,42.115,15.741 c21.057,0,21.057-15.741,42.115-15.741l14.173,28.073C359.806,183.928,364.218,202.48,364.218,214.463z"
			/>
			{/* Milk */}
			<g clipPath={`url(#${clipId})`}>
				<path
					fill={MILK}
					d="M364.218,214.463v267.58c0,11.983-9.804,21.787-21.787,21.787h-172.86 c-11.983,0-21.787-9.804-21.787-21.787v-267.58c0-11.983,4.412-30.535,9.815-41.232l14.173-28.073 c21.057,0,21.057,15.741,42.115,15.741s21.057-15.741,42.115-15.741c21.057,0,21.057,15.741,42.115,15.741 c21.057,0,21.057-15.741,42.115-15.741l14.173,28.073C359.806,183.928,364.218,202.48,364.218,214.463z"
				/>
				<rect x="160" y="200" width="200" height="28" fill={MILK_DEEP} opacity="0.4" />
			</g>
			<path
				fill="#700D00"
				d="M361.697,169.549l-49.442-97.962V49.021h2.723c4.512,0,8.17-3.657,8.17-8.17V8.17 c0-4.513-3.658-8.17-8.17-8.17H197.022c-4.512,0-8.17,3.657-8.17,8.17v32.681c0,4.513,3.658,8.17,8.17,8.17h2.723v22.566 l-49.442,97.962c-5.996,11.879-10.693,31.61-10.693,44.918v267.576c0,16.518,13.438,29.957,29.957,29.957h172.863 c16.519,0,29.957-13.439,29.957-29.957V214.467C372.389,201.158,367.693,181.429,361.697,169.549z M205.193,16.34h101.615v16.34 H205.193V16.34z M215.21,77.213c0.576-1.142,0.876-2.402,0.876-3.681V49.021h79.827v24.511c0,1.279,0.3,2.539,0.876,3.681 l31.094,61.607c-5.895,1.911-10.026,4.993-13.603,7.666c-4.85,3.626-8.354,6.245-16.167,6.245s-11.317-2.619-16.167-6.245 c-5.66-4.231-12.705-9.498-25.952-9.498c-13.246,0-20.289,5.267-25.95,9.499c-4.849,3.625-8.352,6.244-16.164,6.244 s-11.315-2.619-16.164-6.244c-3.575-2.673-7.707-5.755-13.601-7.666L215.21,77.213z M356.049,482.043 c0,7.509-6.108,13.617-13.617,13.617H169.569c-7.509,0-13.617-6.108-13.617-13.617V214.467c0-10.756,4.094-27.954,8.94-37.557 l11.695-23.172c4.69,0.868,7.624,3.052,11.346,5.834c5.659,4.232,12.704,9.499,25.949,9.499c13.244,0,20.289-5.267,25.949-9.499 c4.849-3.625,8.352-6.244,16.164-6.244c7.813,0,11.317,2.619,16.167,6.245c5.66,4.232,12.705,9.498,25.951,9.498 c13.247,0,20.29-5.267,25.952-9.498c3.721-2.782,6.657-4.966,11.348-5.835l11.695,23.173c4.845,9.601,8.94,26.799,8.94,37.556 L356.049,482.043L356.049,482.043z"
			/>
			<path
				fill="#FFFFFF"
				d="M180.463,479.319c-4.512,0-8.17-3.657-8.17-8.17v-32.681c0-4.513,3.658-8.17,8.17-8.17 s8.17,3.657,8.17,8.17v32.681C188.633,475.662,184.975,479.319,180.463,479.319z"
			/>
			<path
				fill="#FFFFFF"
				d="M180.463,413.957c-4.512,0-8.17-3.657-8.17-8.17v-191.32c0-8.051,3.56-23.006,7.188-30.194 c2.033-4.027,6.947-5.645,10.975-3.611s5.646,6.947,3.612,10.975c-2.489,4.93-5.435,17.306-5.435,22.83v191.32 C188.633,410.3,184.975,413.957,180.463,413.957z"
			/>
			<path
				fill="#FFFFFF"
				d="M271.404,81.702h-30.807c-4.512,0-8.17-3.657-8.17-8.17s3.658-8.17,8.17-8.17h30.806 c4.512,0,8.17,3.657,8.17,8.17S275.916,81.702,271.404,81.702z"
			/>
		</svg>
	);
}

function DrinkingGlass({ className, milkLevel, clipId }) {
	const y = useTransform(milkLevel, [0, 1], [270, 48]);
	const h = useTransform(milkLevel, [0, 1], [0, 222]);

	return (
		<svg
			viewBox="0 0 200 280"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<defs>
				<clipPath id={clipId}>
					<motion.rect x="38" width="124" style={{ y, height: h }} />
				</clipPath>
			</defs>
			<path
				d="M40 40 L50 250 C52 265 70 272 100 272 C130 272 148 265 150 250 L160 40 Z"
				fill="rgba(200,240,245,0.35)"
				stroke="#700D00"
				strokeWidth="5"
				strokeLinejoin="round"
			/>
			<g clipPath={`url(#${clipId})`}>
				<path
					d="M40 40 L50 250 C52 265 70 272 100 272 C130 272 148 265 150 250 L160 40 Z"
					fill={MILK}
				/>
				<path d="M48 100 H152 L148 128 H52 Z" fill={MILK_DEEP} opacity="0.45" />
			</g>
			<ellipse
				cx="100"
				cy="40"
				rx="60"
				ry="10"
				fill="none"
				stroke="#700D00"
				strokeWidth="5"
			/>
			<path
				d="M58 70 L62 220"
				stroke="#fff"
				strokeWidth="6"
				strokeLinecap="round"
				opacity="0.55"
			/>
		</svg>
	);
}

/**
 * HeroMilkPour — bottle fills, lifts, tilts ~45°+ and pours milk into a glass.
 */
export default function HeroMilkPour({ className }) {
	const sectionRef = useRef(null);
	const [ids] = useState(() => ({
		bottle: `milk-b-${Math.random().toString(36).slice(2, 9)}`,
		glass: `milk-g-${Math.random().toString(36).slice(2, 9)}`,
	}));

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		restDelta: 0.001,
	});

	const bottleMilk = useTransform(smooth, [0, 0.2, 0.42, 0.82], [0.12, 1, 0.7, 0.05]);
	const glassMilk = useTransform(smooth, [0.5, 0.9], [0, 1]);
	/* Lift modestly — stay close above the glass */
	const bottleY = useTransform(smooth, [0.18, 0.4, 0.72], [10, -36, -48]);
	const bottleX = useTransform(smooth, [0.38, 0.68], [0, 28]);
	const bottleRotate = useTransform(smooth, [0.35, 0.52, 0.78, 0.95], [0, 28, 48, 40]);
	const streamOpacity = useTransform(smooth, [0.5, 0.56, 0.84, 0.92], [0, 1, 1, 0]);
	const streamLength = useTransform(smooth, [0.5, 0.64], [0, 1]);
	const hintOpacity = useTransform(smooth, [0, 0.12], [1, 0]);
	const doneOpacity = useTransform(smooth, [0.9, 1], [0, 1]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "260vh" }}
			aria-label="Milk bottle pour"
		>
			<div
				className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
				style={{
					background:
						"radial-gradient(ellipse at 50% 35%, #fff9f2 0%, #f3ebe3 55%, #e8ddd2 100%)",
				}}
			>
				<motion.p
					style={{ opacity: hintOpacity }}
					className="absolute left-1/2 top-8 z-20 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a7060]"
				>
					Scroll to pour
				</motion.p>

				{/* Stage: bottle mouth sits just above glass rim when pouring */}
				<div className="relative z-10 mx-auto h-[min(68vh,480px)] w-full max-w-xl px-4 sm:px-6">
					{/* Bottle — mid-left, lifts slightly and tips into glass */}
					<motion.div
						className="absolute left-[18%] top-[10%] z-20 w-[42%] max-w-[180px] origin-[70%_8%]"
						style={{
							y: bottleY,
							x: bottleX,
							rotate: bottleRotate,
						}}
					>
						<MilkBottle
							className="h-auto w-full drop-shadow-lg"
							milkLevel={bottleMilk}
							clipId={ids.bottle}
						/>
					</motion.div>

					{/* Stream bridges bottle mouth → glass opening */}
					<svg
						className="pointer-events-none absolute left-[42%] top-[18%] z-30 h-[42%] w-[28%] overflow-visible"
						viewBox="0 0 100 200"
						aria-hidden
					>
						<motion.path
							d="M 12 8 C 28 40, 42 80, 52 120 S 58 165, 60 188"
							fill="none"
							stroke={MILK}
							strokeWidth="12"
							strokeLinecap="round"
							style={{ pathLength: streamLength, opacity: streamOpacity }}
						/>
						<motion.path
							d="M 12 8 C 28 40, 42 80, 52 120 S 58 165, 60 188"
							fill="none"
							stroke={MILK_DEEP}
							strokeWidth="5"
							strokeLinecap="round"
							style={{ pathLength: streamLength, opacity: streamOpacity }}
						/>
					</svg>

					{/* Glass — under bottle mouth */}
					<div className="absolute bottom-[10%] right-[22%] z-10 w-[30%] max-w-[130px]">
						<DrinkingGlass
							className="h-auto w-full drop-shadow-md"
							milkLevel={glassMilk}
							clipId={ids.glass}
						/>
					</div>
				</div>

				<motion.p
					style={{ opacity: doneOpacity }}
					className="mt-2 text-center text-sm font-medium tracking-tight text-[#700D00]"
				>
					Glass poured
				</motion.p>

				<div className="absolute bottom-10 left-1/2 z-20 w-full max-w-xs -translate-x-1/2 px-4">
					<div className="h-1 overflow-hidden rounded-full bg-[#d4c4b4]/80">
						<motion.div
							className="h-full origin-left rounded-full bg-[#51C0C2]"
							style={{ scaleX: smooth }}
						/>
					</div>
					<p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7060]">
						Fill · tilt · pour
					</p>
				</div>
			</div>
		</section>
	);
}
