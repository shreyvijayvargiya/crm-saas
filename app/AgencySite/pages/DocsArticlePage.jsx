import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import SiteSeo, { HOME_OG_IMAGE } from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import MarkdownContent from "../components/MarkdownContent";
import { useAgencyTheme } from "../AgencyThemeContext";

function DocsArticleContent({ title, description, path, keywords, markdown }) {
	const { isLight } = useAgencyTheme();

	return (
		<>
			<SiteSeo
				title={title}
				description={description}
				path={path}
				keywords={keywords}
				images={[HOME_OG_IMAGE]}
			/>
			<Link href="/docs" passHref>
				<a
					className={cn(
						"mb-6 inline-flex items-center gap-1.5 text-xs font-medium",
						isLight ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"
					)}
				>
					<ArrowLeft className="h-3.5 w-3.5" />
					SaaSCRM developer resources
				</a>
			</Link>
			<article>
				<MarkdownContent content={markdown} isLight={isLight} />
			</article>
		</>
	);
}

export default function DocsArticlePage({
	title,
	description,
	path,
	keywords,
	markdown,
}) {
	return (
		<AgencyShell size="article">
			<DocsArticleContent
				title={title}
				description={description}
				path={path}
				keywords={keywords}
				markdown={markdown}
			/>
		</AgencyShell>
	);
}

DocsArticlePage.disableLayout = true;
