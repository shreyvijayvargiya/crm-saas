import BlogPostPage from "../../app/AgencySite/pages/BlogPostPage";
import {
	BLOG_ISR_SECONDS,
	getAllBlogPosts,
	getBlogPostBySlug,
	getBlogSlugs,
	isBlogPostLive,
} from "../../lib/blog";

export default BlogPostPage;

export async function getStaticPaths() {
	const slugs = getBlogSlugs();
	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }) {
	let post;
	try {
		post = getBlogPostBySlug(params.slug);
	} catch {
		return { notFound: true, revalidate: BLOG_ISR_SECONDS };
	}

	if (!isBlogPostLive(post.meta)) {
		return { notFound: true, revalidate: BLOG_ISR_SECONDS };
	}

	const morePosts = getAllBlogPosts()
		.filter((p) => p.slug !== params.slug)
		.slice(0, 6);

	return {
		props: {
			post,
			morePosts,
		},
		revalidate: BLOG_ISR_SECONDS,
	};
}
