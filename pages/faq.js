import AgencyFaqPage from "../app/AgencySite/pages/FaqPage";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/faq");

export default AgencyFaqPage;
