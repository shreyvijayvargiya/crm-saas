import { runCrmAssistantChat } from "@/lib/ai/openrouter";

function isValidMessage(msg) {
	return (
		msg &&
		(msg.role === "user" || msg.role === "assistant") &&
		typeof msg.content === "string" &&
		msg.content.trim().length > 0
	);
}

function isValidSnapshot(snapshot) {
	return (
		snapshot &&
		Array.isArray(snapshot.leads) &&
		Array.isArray(snapshot.deals) &&
		Array.isArray(snapshot.taskSections) &&
		Array.isArray(snapshot.activities)
	);
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { messages, crmSnapshot, pageContext } = req.body ?? {};

		if (!Array.isArray(messages) || messages.length === 0) {
			return res.status(400).json({ error: "messages array is required" });
		}

		if (!isValidSnapshot(crmSnapshot)) {
			return res.status(400).json({ error: "Invalid or missing crmSnapshot" });
		}

		const trimmed = messages.filter(isValidMessage).map((m) => ({
			role: m.role,
			content: m.content.trim(),
		}));

		if (trimmed.length === 0) {
			return res.status(400).json({ error: "No valid messages to send" });
		}

		const result = await runCrmAssistantChat({
			messages: trimmed,
			crmSnapshot,
			pageContext: pageContext ?? {},
		});

		return res.status(200).json(result);
	} catch (err) {
		const message = err?.message || "AI chat failed";
		const status = message.includes("OPENROUTER_API_KEY") ? 503 : 500;
		return res.status(status).json({ error: message });
	}
}
