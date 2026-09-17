import PromptsIndexPage from "../../app/AgencySite/pages/PromptsIndexPage";
import { getAllPrompts } from "../../lib/prompts";

export default PromptsIndexPage;

export async function getStaticProps() {
	return {
		props: {
			prompts: getAllPrompts(),
		},
	};
}
