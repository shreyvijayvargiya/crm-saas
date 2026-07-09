import { CRM_TOOL_DEFINITIONS, executeCrmTool } from "@/lib/ai/tools";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "qwen/qwen-2.5-7b-instruct:free";
const MAX_TOOL_ROUNDS = 6;

function getModel() {
	return process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
}

async function callOpenRouter({ messages, tools }) {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		throw new Error("OPENROUTER_API_KEY is not configured on the server.");
	}

	const body = {
		model: getModel(),
		messages,
		temperature: 0.3,
		max_tokens: 1024,
	};

	if (tools?.length) {
		body.tools = tools;
		body.tool_choice = "auto";
	}

	const res = await fetch(OPENROUTER_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
			"HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
			"X-Title": process.env.OPENROUTER_APP_NAME || "CRM SaaS Assistant",
		},
		body: JSON.stringify(body),
	});

	const payload = await res.json().catch(() => ({}));

	if (!res.ok) {
		const detail =
			payload?.error?.message ||
			payload?.message ||
			`OpenRouter request failed (${res.status})`;
		throw new Error(detail);
	}

	return payload;
}

export async function runCrmAssistantChat({ messages, crmSnapshot, pageContext }) {
	const systemPrompt = buildSystemPrompt({ pageContext });
	const apiMessages = [{ role: "system", content: systemPrompt }, ...messages];

	let snapshot = JSON.parse(JSON.stringify(crmSnapshot));
	const toolCallsLog = [];

	for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
		const response = await callOpenRouter({
			messages: apiMessages,
			tools: CRM_TOOL_DEFINITIONS,
		});

		const choice = response.choices?.[0];
		if (!choice?.message) {
			const detail =
				response?.error?.message ||
				(!response.choices?.length ? "Model returned no choices — try again or switch OPENROUTER_MODEL" : "No response from the model.");
			throw new Error(detail);
		}

		const assistantMessage = choice.message;
		const toolCalls = assistantMessage.tool_calls ?? [];

		if (toolCalls.length > 0) {
			apiMessages.push({
				role: "assistant",
				content: assistantMessage.content || "",
				tool_calls: toolCalls,
			});

			for (const toolCall of toolCalls) {
				const fn = toolCall.function ?? {};
				const name = fn.name;
				let args = {};
				try {
					args = JSON.parse(fn.arguments || "{}");
				} catch {
					args = {};
				}

				const result = executeCrmTool(snapshot, name, args);
				snapshot = result.snapshot;
				toolCallsLog.push({
					name,
					args,
					data: result.data,
					ok: !result.data?.error,
				});

				apiMessages.push({
					role: "tool",
					tool_call_id: toolCall.id,
					content: JSON.stringify(result.data),
				});
			}
			continue;
		}

		const content = assistantMessage.content?.trim();
		if (!content) {
			throw new Error("Model returned an empty message.");
		}

		return {
			content,
			crmSnapshot: snapshot,
			model: getModel(),
			toolCalls: toolCallsLog,
		};
	}

	throw new Error("Too many tool rounds — try a simpler question.");
}
