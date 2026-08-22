import BlueprintPage from "../app/AgencySite/pages/BlueprintPage";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/blueprint");

export default BlueprintPage;
