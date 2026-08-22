import AgencyPricingPage from "../app/AgencySite/pages/PricingPage";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/pricing");

export default AgencyPricingPage;
