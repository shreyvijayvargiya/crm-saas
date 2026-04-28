/**
 * Lead capture — sends one email to you via SMTP (no Resend / Airtable / webhooks).
 *
 * Gmail (recommended): create an App Password (Google Account → Security → 2-Step → App passwords),
 * then set:
 *   SMTP_USER=shreyvijayvargiya26@gmail.com
 *   SMTP_PASS=your-app-password
 *   (aliases: SMTP_PASS_CRM_SAAS, SMTP_PASS_CRM_SAAS_CRM_SAAS — spaces in Gmail app passwords are stripped)
 *
 * Optional:
 *   LEAD_TO_EMAIL — inbox to receive leads (default: shreyvijayvargiya26@gmail.com)
 *   SMTP_HOST, SMTP_PORT — omit to use Gmail preset via service "gmail"
 */

import nodemailer from "nodemailer";

const DEFAULT_TO = "shreyvijayvargiya26@gmail.com";

const EMAIL_RE =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateBody(raw) {
	if (!raw || typeof raw !== "object") {
		return { error: "Invalid JSON body" };
	}

	const honeypot =
		(typeof raw.website === "string" && raw.website.trim()) ||
		(typeof raw._gotcha === "string" && raw._gotcha.trim());
	if (honeypot) {
		return { honeypot: true };
	}

	const name = typeof raw.name === "string" ? raw.name.trim() : "";
	const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
	const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
	const message = typeof raw.message === "string" ? raw.message.trim() : "";
	const company = typeof raw.company === "string" ? raw.company.trim() : "";

	if (name.length < 2 || name.length > 120) {
		return { error: "Name must be between 2 and 120 characters" };
	}
	if (!email || !EMAIL_RE.test(email) || email.length > 254) {
		return { error: "Valid email is required" };
	}
	if (phone.length > 32) {
		return { error: "Phone is too long" };
	}
	if (message.length > 2000) {
		return { error: "Message is too long" };
	}
	if (company.length > 120) {
		return { error: "Company name is too long" };
	}

	return {
		ok: true,
		data: {
			name,
			email,
			phone: phone || "",
			message: message || "",
			company: company || "",
			submittedAt: new Date().toISOString(),
		},
	};
}

function escapeHtml(s) {
	return String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function resolveSmtpPassword() {
	const raw =
		process.env.SMTP_PASS ||
		process.env.SMTP_PASS_CRM_SAAS ||
		process.env.SMTP_PASS_CRM_SAAS_CRM_SAAS ||
		"";
	const trimmed = typeof raw === "string" ? raw.trim() : "";
	// Gmail app passwords are 16 chars, often shown with spaces
	return trimmed.replace(/\s+/g, "");
}

function createMailer() {
	const user = process.env.SMTP_USER?.trim();
	const pass = resolveSmtpPassword();
	if (!user || !pass) {
		return null;
	}

	if (process.env.SMTP_HOST) {
		const port = Number(process.env.SMTP_PORT || 587);
		return nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port,
			secure: port === 465,
			auth: { user, pass },
		});
	}

	return nodemailer.createTransport({
		service: "gmail",
		auth: { user, pass },
	});
}

async function sendLeadEmail(data) {
	const transport = createMailer();
	if (!transport) {
		return {
			sent: false,
			reason:
				"SMTP_USER and a password env must be set: SMTP_PASS, or SMTP_PASS_CRM_SAAS, or SMTP_PASS_CRM_SAAS_CRM_SAAS (Gmail App Password).",
		};
	}

	const to = process.env.LEAD_TO_EMAIL || DEFAULT_TO;
	const from = process.env.SMTP_FROM || process.env.SMTP_USER;

	const text = [
		`New lead from CRM template landing`,
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone || "(none)"}`,
		`Company: ${data.company || "(none)"}`,
		`Message: ${data.message || "(none)"}`,
		`Submitted: ${data.submittedAt}`,
	].join("\n");

	const html = `
    <h2>New CRM template lead</h2>
    <table style="font-family:sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(data.company || "—")}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(data.message || "—").replace(/\n/g, "<br/>")}</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${escapeHtml(data.submittedAt)}</td></tr>
    </table>
  `.trim();

	try {
		await transport.sendMail({
			from: `CRM Template <${from}>`,
			to,
			replyTo: data.email,
			subject: `New lead: ${data.name}`,
			text,
			html,
		});
		return { sent: true };
	} catch (err) {
		return {
			sent: false,
			reason: err.message || String(err),
		};
	}
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({ error: "Method not allowed" });
	}

	let body;
	try {
		body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
	} catch {
		return res.status(400).json({ error: "Invalid JSON" });
	}

	const parsed = validateBody(body);
	if (parsed.honeypot) {
		return res.status(200).json({ ok: true });
	}
	if (parsed.error) {
		return res.status(400).json({ error: parsed.error });
	}

	const result = await sendLeadEmail(parsed.data);

	if (!result.sent) {
		const missingSmtp =
			!process.env.SMTP_USER?.trim() || !resolveSmtpPassword();
		return res.status(missingSmtp ? 503 : 502).json({
			error: missingSmtp
				? "Email is not configured. Set SMTP_USER and SMTP_PASS (or SMTP_PASS_CRM_SAAS / SMTP_PASS_CRM_SAAS_CRM_SAAS)."
				: "Could not send email.",
			details: result.reason,
		});
	}

	return res.status(200).json({ ok: true });
}