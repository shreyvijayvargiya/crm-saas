import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	INITIAL_APP_CONNECTIONS,
	SCHEDULER_CONNECTIONS_KEY,
} from "./connectionsSeedData";
import { SCHEDULER_PLATFORMS } from "./platforms";

const SchedulerConnectionsContext = createContext(null);

function loadConnections() {
	if (typeof window === "undefined") return INITIAL_APP_CONNECTIONS;
	try {
		const raw = localStorage.getItem(SCHEDULER_CONNECTIONS_KEY);
		if (!raw) return INITIAL_APP_CONNECTIONS;
		const parsed = JSON.parse(raw);
		return { ...INITIAL_APP_CONNECTIONS, ...parsed };
	} catch {
		return INITIAL_APP_CONNECTIONS;
	}
}

export function SchedulerConnectionsProvider({ children }) {
	const [connections, setConnections] = useState(INITIAL_APP_CONNECTIONS);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setConnections(loadConnections());
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated || typeof window === "undefined") return;
		localStorage.setItem(SCHEDULER_CONNECTIONS_KEY, JSON.stringify(connections));
	}, [connections, hydrated]);

	const connectApp = useCallback((platformId, account) => {
		const platform = SCHEDULER_PLATFORMS.find((p) => p.id === platformId);
		setConnections((prev) => ({
			...prev,
			[platformId]: {
				connected: true,
				account:
					account ||
					prev[platformId]?.account ||
					`${platform?.label ?? platformId} account`,
				connectedAt: new Date().toISOString().slice(0, 10),
			},
		}));
	}, []);

	const disconnectApp = useCallback((platformId) => {
		setConnections((prev) => ({
			...prev,
			[platformId]: {
				connected: false,
				account: null,
				connectedAt: null,
			},
		}));
	}, []);

	const toggleApp = useCallback(
		(platformId) => {
			const current = connections[platformId];
			if (current?.connected) disconnectApp(platformId);
			else connectApp(platformId);
		},
		[connections, connectApp, disconnectApp]
	);

	const isConnected = useCallback(
		(platformId) => Boolean(connections[platformId]?.connected),
		[connections]
	);

	const stats = useMemo(() => {
		const connected = SCHEDULER_PLATFORMS.filter((p) =>
			connections[p.id]?.connected
		).length;
		return {
			connected,
			total: SCHEDULER_PLATFORMS.length,
			disconnected: SCHEDULER_PLATFORMS.length - connected,
		};
	}, [connections]);

	const value = useMemo(
		() => ({
			connections,
			hydrated,
			connectApp,
			disconnectApp,
			toggleApp,
			isConnected,
			stats,
		}),
		[
			connections,
			hydrated,
			connectApp,
			disconnectApp,
			toggleApp,
			isConnected,
			stats,
		]
	);

	return (
		<SchedulerConnectionsContext.Provider value={value}>
			{children}
		</SchedulerConnectionsContext.Provider>
	);
}

export function useSchedulerConnections() {
	const ctx = useContext(SchedulerConnectionsContext);
	if (!ctx) {
		throw new Error(
			"useSchedulerConnections must be used within SchedulerConnectionsProvider"
		);
	}
	return ctx;
}
