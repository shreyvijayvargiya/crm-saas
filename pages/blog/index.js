import BlogIndexPage from "../../app/AgencySite/pages/BlogIndexPage";
import { BLOG_ISR_SECONDS, getAllBlogPosts } from "../../lib/blog";

export default BlogIndexPage;

export async function getStaticProps() {
	const posts = getAllBlogPosts();
	return {
		props: {
			posts,
		},
		revalidate: BLOG_ISR_SECONDS,
	};
}
