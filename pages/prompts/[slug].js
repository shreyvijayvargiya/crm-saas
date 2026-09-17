import PromptDetailPage from "../../app/AgencySite/pages/PromptDetailPage";
import { getPromptBySlug, getPromptSlugs } from "../../lib/prompts";

export default PromptDetailPage;

export async function getStaticPaths() {
	return {
		paths: getPromptSlugs().map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const prompt = getPromptBySlug(params.slug);
	if (!prompt) {
		return { notFound: true };
	}
	return {
		props: { prompt },
	};
}
