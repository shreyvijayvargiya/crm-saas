import { createFileRoute } from "@tanstack/react-router";
import { handleSendLead } from "../../../server/send-lead.js";

export const Route = createFileRoute("/api/send-lead")({
	server: {
		handlers: {
			POST: async ({ request }) => handleSendLead(request),
		},
	},
});
