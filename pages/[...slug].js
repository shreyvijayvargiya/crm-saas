import NotFoundPage from "./404";

export async function getServerSideProps({ res }) {
	res.statusCode = 404;
	return { props: {} };
}

export default NotFoundPage;

NotFoundPage.disableLayout = true;
