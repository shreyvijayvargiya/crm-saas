import NotFoundPage from "./404";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export async function getServerSideProps(ctx) {
	const parts = ctx.params?.slug;
	const pathname = `/${[]
		.concat(parts || [])
		.filter(Boolean)
		.join("/")}`;
	return markdownAwareGetServerSideProps(pathname, { forceStatus: 404 })(ctx);
}

export default NotFoundPage;

NotFoundPage.disableLayout = true;
