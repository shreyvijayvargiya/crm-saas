import React from "react";
import LayoutWrapper from "../modules/Layout";
import "tailwindcss/tailwind.css";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<LayoutWrapper>
			<Component {...pageProps} />
		</LayoutWrapper>
	);
}

export default MyApp;
