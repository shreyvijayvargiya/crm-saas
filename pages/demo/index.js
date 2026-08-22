import DemoChooser from "../../app/Home/DemoChooser";
import { markdownAwareGetServerSideProps } from "../../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/demo");

export default DemoChooser;
