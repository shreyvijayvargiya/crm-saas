import AgencyContactPage from "../app/AgencySite/pages/ContactPage";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/contact");

export default AgencyContactPage;
