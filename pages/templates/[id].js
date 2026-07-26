import TemplateDetailPage from "../../app/AgencySite/pages/TemplateDetailPage";
import { getFreeCrmTemplate } from "../../lib/freeCrmTemplates";

export default TemplateDetailPage;

export async function getServerSideProps({ params }) {
	const template = getFreeCrmTemplate(params.id);
	if (!template) {
		return { notFound: true };
	}
	return {
		props: {
			template: JSON.parse(JSON.stringify(template)),
		},
	};
}
