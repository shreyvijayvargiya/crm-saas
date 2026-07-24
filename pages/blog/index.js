import BlogIndexPage from "../../app/AgencySite/pages/BlogIndexPage";
import { getAllBlogPosts } from "../../lib/blog";

export default BlogIndexPage;

export async function getStaticProps() {
	const posts = getAllBlogPosts();
	return {
		props: {
			posts,
		},
	};
}
