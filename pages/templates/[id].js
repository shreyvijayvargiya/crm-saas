import TemplateDetailPage from "../../app/AgencySite/pages/TemplateDetailPage";
import { FREE_CRM_IDS, getFreeCrmTemplate } from "../../lib/freeCrmTemplates";

export default TemplateDetailPage;

export async function getStaticPaths() {
	return {
		paths: FREE_CRM_IDS.map((id) => ({ params: { id } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const template = getFreeCrmTemplate(params.id);
	if (!template) {
		return { notFound: true };
	}
	// Only pass fields the detail page needs (keeps HTML / __NEXT_DATA__ small)
	const pageTemplate = {
		id: template.id,
		name: template.name,
		tagline: template.tagline,
		description: template.description,
		badge: template.badge,
		accent: template.accent,
		audience: template.audience,
		icon: template.icon,
		image: template.image,
		homeRoute: template.homeRoute,
		demoUrl: template.demoUrl,
		guide: template.guide,
		zipName: template.zipName,
		ast: { sidebar: template.ast?.sidebar || [] },
	};
	return {
		props: {
			template: JSON.parse(JSON.stringify(pageTemplate)),
		},
	};
}
