/**
 * Demo OAuth / account connection status for scheduler platforms.
 * `connected` is the live toggle state; other fields are for showcase UI.
 */
export const INITIAL_APP_CONNECTIONS = {
	x: {
		connected: true,
		account: "@acmecrm",
		connectedAt: "2026-06-12",
	},
	linkedin: {
		connected: true,
		account: "Acme CRM Company Page",
		connectedAt: "2026-05-28",
	},
	youtube: {
		connected: false,
		account: null,
		connectedAt: null,
	},
	reddit: {
		connected: true,
		account: "u/acme_growth",
		connectedAt: "2026-07-01",
	},
	threads: {
		connected: false,
		account: null,
		connectedAt: null,
	},
	tiktok: {
		connected: false,
		account: null,
		connectedAt: null,
	},
	pinterest: {
		connected: true,
		account: "Acme Design",
		connectedAt: "2026-04-18",
	},
	dribbble: {
		connected: false,
		account: null,
		connectedAt: null,
	},
	substack: {
		connected: true,
		account: "acme.substack.com",
		connectedAt: "2026-03-09",
	},
	instagram: {
		connected: true,
		account: "@acmecrm",
		connectedAt: "2026-06-20",
	},
	facebook: {
		connected: false,
		account: null,
		connectedAt: null,
	},
	bluesky: {
		connected: true,
		account: "acmecrm.bsky.social",
		connectedAt: "2026-07-08",
	},
	medium: {
		connected: false,
		account: null,
		connectedAt: null,
	},
	mastodon: {
		connected: false,
		account: null,
		connectedAt: null,
	},
};

export const SCHEDULER_CONNECTIONS_KEY = "crm-scheduler-app-connections";
