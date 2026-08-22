import DocsIndexPage from "../../app/AgencySite/pages/DocsIndexPage";
import { markdownAwareGetServerSideProps } from "../../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/docs");

export default DocsIndexPage;
