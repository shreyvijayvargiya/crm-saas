import DocsIndexPage from "../app/AgencySite/pages/DocsIndexPage";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/developers");

export default DocsIndexPage;
