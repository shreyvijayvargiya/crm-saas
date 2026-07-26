import {
	getFreeCrmTemplate,
	isFreeCrmId,
} from "@/lib/freeCrmTemplates";
import { saveFreeCrmDownloadLead } from "@/lib/firebase";
import { buildFreeCrmZipBuffer } from "@/lib/freeCrmZip";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ error: "Method not allowed" });
	}

	const email = String(req.body?.email || "").trim().toLowerCase();
	const templateId = String(req.body?.templateId || "").trim();

	if (!EMAIL_RE.test(email)) {
		return res.status(400).json({ error: "Enter a valid email to download." });
	}
	if (!isFreeCrmId(templateId)) {
		return res.status(404).json({ error: "Template not found or not free." });
	}

	const template = getFreeCrmTemplate(templateId);
	if (!template) {
		return res.status(404).json({ error: "Template not found." });
	}

	try {
		const lead = await saveFreeCrmDownloadLead({
			email,
			templateId: template.id,
			templateName: template.name,
			userAgent: req.headers["user-agent"] || null,
		});
		if (lead?.saved) {
			res.setHeader("X-Crm-Lead-Saved", "1");
			console.info(
				`[free-crm download] lead saved ${lead.id} · ${email} · ${template.id}`
			);
		} else {
			res.setHeader("X-Crm-Lead-Saved", "0");
			console.warn(
				`[free-crm download] lead skipped: ${lead?.reason || "unknown"} — ${lead?.detail || ""}`
			);
		}
	} catch (err) {
		res.setHeader("X-Crm-Lead-Saved", "0");
		console.error("[free-crm download] firestore", err?.message || err);
		// Still allow download — don't block users if Firebase is down
	}

	try {
		const buffer = await buildFreeCrmZipBuffer(template);
		const filename = `${template.zipName}.zip`;
		res.setHeader("Content-Type", "application/zip");
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${filename}"`
		);
		res.setHeader("Content-Length", buffer.length);
		return res.status(200).send(buffer);
	} catch (err) {
		console.error("[free-crm download] zip", err?.message || err);
		return res.status(500).json({ error: "Could not build the ZIP. Try again." });
	}
}
