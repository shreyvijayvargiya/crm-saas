import { useEffect, useMemo, useRef, useState } from "react";

export function shuffle(list) {
	const next = [...list];
	for (let i = next.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}

export function useCursorTrail({
	items = [],
	limit = 7,
	moveDistance = 54,
	dropDelayMs = 780,
	lifetimeMs = 1750,
	mountStartMs = 2000,
	buildItem,
}) {
	const containerRef = useRef(null);
	const lastPointRef = useRef({ x: 0, y: 0 });
	const orderRef = useRef([]);
	const cursorIndexRef = useRef(0);
	const timersRef = useRef([]);
	const [trail, setTrail] = useState([]);

	const pool = useMemo(() => {
		if (!Array.isArray(items) || !items.length) return [];
		return items.slice(0, limit);
	}, [items, limit]);

	const clearTimers = () => {
		timersRef.current.forEach(clearTimeout);
		timersRef.current = [];
	};

	const schedule = (fn, ms) => {
		const id = window.setTimeout(fn, ms);
		timersRef.current.push(id);
		return id;
	};

	useEffect(() => {
		orderRef.current = shuffle([...Array(pool.length).keys()]);
		cursorIndexRef.current = 0;
	}, [pool]);

	useEffect(() => {
		if (!pool.length || typeof buildItem !== "function") return undefined;
		clearTimers();

		schedule(() => {
			pool.forEach((entry, index) => {
				schedule(() => {
					const id = `mount-${index}-${Date.now()}`;
					const payload = buildItem(entry, index);
					setTrail((current) => [
						...current.slice(-(limit - 1)),
						{
							id,
							...payload,
							x: 14 + Math.random() * 72,
							y: 16 + Math.random() * 62,
							rotate: (Math.random() - 0.5) * 16,
							phase: "visible",
						},
					]);

					schedule(() => {
						setTrail((current) =>
							current.map((item) =>
								item.id === id ? { ...item, phase: "dropping" } : item
							)
						);
					}, dropDelayMs + index * 70);

					schedule(() => {
						setTrail((current) => current.filter((item) => item.id !== id));
					}, lifetimeMs + index * 70);
				}, index * 150);
			});
		}, mountStartMs);

		return clearTimers;
	}, [pool, buildItem, limit, dropDelayMs, lifetimeMs, mountStartMs]);

	const onMouseMove = (clientX, clientY) => {
		const container = containerRef.current;
		if (!container || !pool.length || typeof buildItem !== "function") return;

		const rect = container.getBoundingClientRect();
		const xPct = ((clientX - rect.left) / rect.width) * 100;
		const yPct = ((clientY - rect.top) / rect.height) * 100;
		const last = lastPointRef.current;
		if (Math.hypot(clientX - last.x, clientY - last.y) < moveDistance) return;
		lastPointRef.current = { x: clientX, y: clientY };

		if (cursorIndexRef.current >= orderRef.current.length) {
			orderRef.current = shuffle([...Array(pool.length).keys()]);
			cursorIndexRef.current = 0;
		}

		const itemIndex = orderRef.current[cursorIndexRef.current];
		cursorIndexRef.current += 1;
		const entry = pool[itemIndex];
		const id = `cursor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
		const payload = buildItem(entry, itemIndex);

		setTrail((current) => [
			...current.slice(-(limit - 1)),
			{
				id,
				...payload,
				x: Math.min(90, Math.max(10, xPct + (Math.random() - 0.5) * 10)),
				y: Math.min(86, Math.max(12, yPct + (Math.random() - 0.5) * 10)),
				rotate: (Math.random() - 0.5) * 18,
				phase: "visible",
			},
		]);

		schedule(() => {
			setTrail((current) =>
				current.map((item) =>
					item.id === id ? { ...item, phase: "dropping" } : item
				)
			);
		}, dropDelayMs);

		schedule(() => {
			setTrail((current) => current.filter((item) => item.id !== id));
		}, lifetimeMs);
	};

	return { containerRef, trail, onMouseMove };
}
