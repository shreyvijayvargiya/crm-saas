/** Build "View details" links from AI tool call results. */

function link(label, href) {
	return href ? { label, href } : null;
}

function pushUnique(links, seen, entry) {
	if (!entry?.href || seen.has(entry.href)) return;
	seen.add(entry.href);
	links.push(entry);
}

export function buildActionLinks(toolCalls) {
	const links = [];
	const seen = new Set();

	for (const tc of toolCalls ?? []) {
		if (!tc?.ok) continue;
		const { name, args = {}, data = {} } = tc;

		switch (name) {
			case "create_lead":
				pushUnique(links, seen, link(`View lead: ${data.created?.name ?? "details"}`, data.created?.id && `/leads/${data.created.id}`));
				pushUnique(links, seen, link("All leads", "/leads"));
				break;
			case "create_contact":
				pushUnique(links, seen, link(`View contact: ${data.created?.name ?? "details"}`, data.created?.id && `/contacts/${data.created.id}`));
				pushUnique(links, seen, link("All contacts", "/contacts"));
				break;
			case "create_company":
				pushUnique(links, seen, link(`View company: ${data.created?.name ?? "details"}`, data.created?.id && `/companies/${data.created.id}`));
				pushUnique(links, seen, link("All companies", "/companies"));
				break;
			case "create_invoice":
				pushUnique(links, seen, link(`View invoice: ${data.created?.invoiceNumber ?? data.created?.id ?? "details"}`, data.created?.id && `/invoices/${data.created.id}`));
				pushUnique(links, seen, link("All invoices", "/invoices"));
				break;
			case "update_invoice": {
				const invoiceId = data.updated?.id ?? args.invoiceId;
				pushUnique(links, seen, link(`View invoice: ${data.updated?.invoiceNumber ?? invoiceId}`, invoiceId && `/invoices/${invoiceId}`));
				break;
			}
			case "create_project":
				pushUnique(links, seen, link(`View project: ${data.created?.projectName ?? "details"}`, data.created?.id && `/projects/${data.created.id}`));
				pushUnique(links, seen, link("All projects", "/projects"));
				break;
			case "update_deal_stage": {
				const dealId = data.dealId ?? args.dealId;
				pushUnique(links, seen, link(`View deal: ${data.name ?? dealId}`, dealId && `/deals/${dealId}`));
				break;
			}
			case "create_task":
				pushUnique(links, seen, link("View tasks", "/tasks"));
				break;
			case "list_leads":
				pushUnique(links, seen, link("View leads", "/leads"));
				break;
			case "list_invoices":
				pushUnique(links, seen, link("View invoices", "/invoices"));
				break;
			case "list_deals":
				pushUnique(links, seen, link("View deals", "/deals"));
				break;
			case "list_contacts":
				pushUnique(links, seen, link("View contacts", "/contacts"));
				break;
			case "list_companies":
				pushUnique(links, seen, link("View companies", "/companies"));
				break;
			case "list_projects":
				pushUnique(links, seen, link("View projects", "/projects"));
				break;
			case "list_sales":
				pushUnique(links, seen, link("View sales", "/sales"));
				break;
			default:
				break;
		}
	}

	return links;
}
