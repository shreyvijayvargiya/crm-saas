import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import SiteSeo from "@/components/seo/SiteSeo";
import { getVerticalAstById } from "../../../asts/crm-verticals";
import { useCrmVertical } from "../../../utils/CrmVerticalContext";

/**
 * /demo/template/[name] — apply a CRM vertical AST, then open its home route.
 * Shareable entry from Free CRM template “View live demo” CTAs.
 */
export default function DemoTemplateByNamePage() {
	const router = useRouter();
	const { setVerticalId } = useCrmVertical();
	const [error, setError] = useState("");

	useEffect(() => {
		if (!router.isReady) return;
		const raw = router.query.name;
		const name = Array.isArray(raw) ? raw[0] : raw;
		if (!name || typeof name !== "string") return;

		const ast = getVerticalAstById(name);
		if (!ast || ast.id !== name) {
			setError("Template not found");
			router.replace("/demo");
			return;
		}

		setVerticalId(ast.id);
		router.replace(ast.homeRoute || "/dashboard");
	}, [router.isReady, router.query.name, router, setVerticalId]);

	const name =
		typeof router.query.name === "string" ? router.query.name : "template";

	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-8 text-center">
			<SiteSeo
				title={`Loading ${name} CRM demo | SaaSCRM`}
				description={`Opening the ${name} SaaSCRM vertical demo.`}
				path={`/demo/template/${name}`}
				noIndex
			/>
			{error ? (
				<p className="text-sm text-muted-foreground">{error}</p>
			) : (
				<>
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Opening {name.replace(/-/g, " ")} demo…
					</p>
				</>
			)}
		</div>
	);
}
