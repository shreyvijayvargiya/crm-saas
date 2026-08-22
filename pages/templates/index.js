import TemplatesPage from "../../app/AgencySite/pages/TemplatesPage";
import { markdownAwareGetServerSideProps } from "../../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/templates");

export default TemplatesPage;
