import BlogPostPage from "../../app/AgencySite/pages/BlogPostPage";
import { getAllBlogPosts, getBlogPostBySlug, getBlogSlugs } from "../../lib/blog";

export default BlogPostPage;

export async function getStaticPaths() {
	const slugs = getBlogSlugs();
	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const post = getBlogPostBySlug(params.slug);
	const morePosts = getAllBlogPosts()
		.filter((p) => p.slug !== params.slug)
		.slice(0, 6);

	return {
		props: {
			post,
			morePosts,
		},
	};
}
