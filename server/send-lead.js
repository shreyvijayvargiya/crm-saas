/**
 * Lead capture API — migrated from pages/api/send-lead.js
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

export async function handleSendLead(request) {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const parsed = validateBody(body);
	if (parsed.honeypot) {
		return Response.json({ ok: true });
	}
	if (parsed.error) {
		return Response.json({ error: parsed.error }, { status: 400 });
	}

	const result = await sendLeadEmail(parsed.data);

	if (!result.sent) {
		const missingSmtp =
			!process.env.SMTP_USER?.trim() || !resolveSmtpPassword();
		return Response.json(
			{
				error: missingSmtp
					? "Email is not configured. Set SMTP_USER and SMTP_PASS (or SMTP_PASS_CRM_SAAS / SMTP_PASS_CRM_SAAS_CRM_SAAS)."
					: "Could not send email.",
				details: result.reason,
			},
			{ status: missingSmtp ? 503 : 502 }
		);
	}

	return Response.json({ ok: true });
}
