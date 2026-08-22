import AgencyHomePage from "../app/AgencySite/pages/HomePage";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/");

export default AgencyHomePage;
