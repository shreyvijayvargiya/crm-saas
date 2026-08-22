import SitemapPage from "../app/AgencySite/pages/SitemapPage";
import { getAllBlogPosts } from "../lib/blog";

export default SitemapPage;

export async function getStaticProps() {
	return {
		props: {
			blogPosts: getAllBlogPosts(),
		},
	};
}
