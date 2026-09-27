/** Legacy URL — template is open source on GitHub. */
export async function getServerSideProps() {
	return {
		redirect: {
			destination: "https://github.com/shreyvijayvargiya/crm-saas",
			permanent: true,
		},
	};
}

export default function PricingRedirect() {
	return null;
}
