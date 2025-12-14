import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { Providers } from "@/lib/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TUFF+ INTEGRATOR",
	description: "TUFF+ CRM + ERP System",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<AppLayout>{children}</AppLayout>
				</Providers>
			</body>
		</html>
	);
}
