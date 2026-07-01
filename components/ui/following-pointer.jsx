import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_POINTER_COLORS = [
	"#0ea5e9",
	"#737373",
	"#14b8a6",
	"#22c55e",
	"#3b82f6",
	"#ef4444",
	"#eab308",
];

export function FollowerPointerCard({
	children,
	className,
	title,
	accentColor,
}) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const ref = useRef(null);
	const [rect, setRect] = useState(null);
	const [isInside, setIsInside] = useState(false);

	useEffect(() => {
		function updateRect() {
			if (ref.current) {
				setRect(ref.current.getBoundingClientRect());
			}
		}
		updateRect();
		window.addEventListener("resize", updateRect);
		window.addEventListener("scroll", updateRect, true);
		return () => {
			window.removeEventListener("resize", updateRect);
			window.removeEventListener("scroll", updateRect, true);
		};
	}, []);

	const handleMouseMove = (e) => {
		if (ref.current) {
			const bounds = ref.current.getBoundingClientRect();
			x.set(e.clientX - bounds.left);
			y.set(e.clientY - bounds.top);
		}
	};

	return (
		<div
			onMouseLeave={() => setIsInside(false)}
			onMouseEnter={() => setIsInside(true)}
			onMouseMove={handleMouseMove}
			ref={ref}
			className={cn("relative cursor-none", className)}
		>
			<AnimatePresence>
				{isInside ? (
					<FollowPointer
						x={x}
						y={y}
						title={title}
						accentColor={accentColor}
					/>
				) : null}
			</AnimatePresence>
			{children}
		</div>
	);
}

export function FollowPointer({ x, y, title, accentColor }) {
	const fallbackColor = useRef(
		DEFAULT_POINTER_COLORS[
			Math.floor(Math.random() * DEFAULT_POINTER_COLORS.length)
		]
	);
	const color = accentColor || fallbackColor.current;

	return (
		<motion.div
			className="pointer-events-none absolute z-50 h-4 w-4 rounded-full"
			style={{ top: y, left: x }}
			initial={{ scale: 1, opacity: 1 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
		>
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="1"
				viewBox="0 0 16 16"
				className="h-6 w-6 -translate-x-3 -translate-y-2.5 -rotate-[70deg] transform stroke-sky-600 text-sky-500"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden
			>
				<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
			</svg>
			<motion.div
				style={{ backgroundColor: color }}
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.5, opacity: 0 }}
				className="min-w-max whitespace-nowrap rounded-full px-2 py-2 text-xs text-white"
			>
				{title}
			</motion.div>
		</motion.div>
	);
}