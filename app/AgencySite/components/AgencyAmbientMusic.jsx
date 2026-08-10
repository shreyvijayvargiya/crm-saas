import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";

const STORAGE_KEY = "componentry:music";

function createWander(ctx) {
	const master = ctx.createGain();
	master.gain.value = 0;
	master.connect(ctx.destination);

	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = 680;
	filter.Q.value = 0.7;
	filter.connect(master);

	const notes = [196, 247, 294, 330, 392, 494];
	const voices = [0, 7, 12].map((offset, i) => {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = i === 2 ? "triangle" : "sine";
		osc.frequency.value = notes[i % notes.length];
		gain.gain.value = i === 0 ? 0.045 : 0.028;
		osc.connect(gain);
		gain.connect(filter);
		osc.start();
		return { osc, gain, offset };
	});

	let timer = 0;
	const tick = () => {
		const t = ctx.currentTime;
		const note = notes[Math.floor(Math.random() * notes.length)];
		voices.forEach((v, i) => {
			const freq = note * Math.pow(2, v.offset / 12) * (i === 1 ? 1.003 : 1);
			v.osc.frequency.exponentialRampToValueAtTime(Math.max(freq, 40), t + 1.8);
		});
		filter.frequency.exponentialRampToValueAtTime(420 + Math.random() * 520, t + 2.4);
		timer = window.setTimeout(tick, 2800 + Math.random() * 1800);
	};
	tick();

	return {
		fade(to, ms = 900) {
			const now = ctx.currentTime;
			master.gain.cancelScheduledValues(now);
			master.gain.setValueAtTime(master.gain.value, now);
			master.gain.linearRampToValueAtTime(to, now + ms / 1000);
		},
		stop() {
			window.clearTimeout(timer);
			voices.forEach((v) => {
				try {
					v.osc.stop();
				} catch (e) {
					/* already stopped */
				}
			});
		},
	};
}

/**
 * Layout UX: ambient wander starts on first scroll.
 * User can pause / stop from a floating control.
 */
export default function AgencyAmbientMusic() {
	const { isLight } = useAgencyTheme();
	const engineRef = useRef(null);
	const ctxRef = useRef(null);
	const [status, setStatus] = useState("idle");

	const persist = (value) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, value);
		} catch (e) {
			/* ignore */
		}
	};

	const start = async () => {
		if (typeof window === "undefined") return;
		if (!ctxRef.current) {
			const Ctx = window.AudioContext || window.webkitAudioContext;
			if (!Ctx) return;
			ctxRef.current = new Ctx();
			engineRef.current = createWander(ctxRef.current);
		}
		if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
		engineRef.current.fade(1, 1100);
		setStatus("playing");
		persist("on");
	};

	const pause = () => {
		engineRef.current?.fade(0, 400);
		ctxRef.current?.suspend?.();
		setStatus("paused");
		persist("paused");
	};

	const stop = () => {
		engineRef.current?.fade(0, 250);
		engineRef.current?.stop();
		engineRef.current = null;
		ctxRef.current?.close?.();
		ctxRef.current = null;
		setStatus("stopped");
		persist("off");
	};

	useEffect(() => {
		let pref = "on";
		try {
			pref = window.localStorage.getItem(STORAGE_KEY) || "on";
		} catch (e) {
			pref = "on";
		}
		if (pref === "off" || pref === "paused") {
			setStatus(pref === "off" ? "stopped" : "paused");
			return undefined;
		}

		const onScroll = () => {
			start();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("wheel", onScroll);
			window.removeEventListener("touchmove", onScroll);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("wheel", onScroll, { passive: true });
		window.addEventListener("touchmove", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("wheel", onScroll);
			window.removeEventListener("touchmove", onScroll);
			engineRef.current?.stop();
			ctxRef.current?.close?.();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const playing = status === "playing";

	return (
		<div className="fixed bottom-5 left-4 z-[60] sm:bottom-6 sm:left-6">
			<div
				className={cn(
					"flex items-center gap-1 rounded-full border px-1.5 py-1.5 shadow-lg backdrop-blur-md",
					isLight
						? "border-zinc-200/80 bg-white/85 text-zinc-700"
						: "border-zinc-800 bg-zinc-950/85 text-zinc-200"
				)}
			>
				<span className={cn("pl-2 pr-1 text-[10px] font-semibold uppercase tracking-[0.14em]", isLight ? "text-zinc-400" : "text-zinc-500")}>
					Wander
				</span>
				<button
					type="button"
					onClick={() => (playing ? pause() : start())}
					className={cn(
						"flex h-8 w-8 items-center justify-center rounded-full",
						isLight ? "hover:bg-zinc-100" : "hover:bg-zinc-800"
					)}
					aria-label={playing ? "Pause music" : "Play music"}
				>
					{playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
				</button>
				<button
					type="button"
					onClick={() => (status === "stopped" ? start() : stop())}
					className={cn(
						"flex h-8 w-8 items-center justify-center rounded-full",
						isLight ? "hover:bg-zinc-100" : "hover:bg-zinc-800"
					)}
					aria-label={status === "stopped" ? "Enable music" : "Stop music"}
				>
					{status === "stopped" ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
				</button>
			</div>
		</div>
	);
}
