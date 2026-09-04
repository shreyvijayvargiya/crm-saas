import SitemapPage from "../app/AgencySite/pages/SitemapPage";
import { BLOG_ISR_SECONDS, getAllBlogPosts } from "../lib/blog";

export default SitemapPage;

export async function getStaticProps() {
	return {
		props: {
			blogPosts: getAllBlogPosts(),
		},
		revalidate: BLOG_ISR_SECONDS,
	};
}
