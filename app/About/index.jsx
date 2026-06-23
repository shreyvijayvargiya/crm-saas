import React from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const CopyButton = ({ text }) => {
	const [copied, setCopied] = React.useState(false);
	const canCopy = Boolean(text);

	const handleCopy = () => {
		if (!canCopy || typeof navigator === "undefined" || !navigator.clipboard) return;
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			onClick={handleCopy}
			disabled={!canCopy}
			className="gap-1.5 text-xs"
		>
			{copied ? <Check className="h-3.5 w-3.5 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
			{copied ? "Copied" : "Copy"}
		</Button>
	);
};

const SourcePanel = ({ subtitle, raw }) => (
	<div className="mt-2">
		{subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
		<div className="mt-1 flex justify-end">
			<CopyButton text={raw} />
		</div>
		<pre
			className="mt-2 max-h-[min(70vh,36rem)] overflow-auto whitespace-pre-wrap break-words rounded-xl border bg-muted p-3 text-xs font-mono leading-relaxed text-muted-foreground"
		>
			{raw}
		</pre>
	</div>
);

const CollapsibleFilePanel = ({ name, content }) => (
	<Card>
		<details className="group">
			<summary
				className="cursor-pointer select-none px-3 py-2 text-sm font-medium"
			>
				{name}
			</summary>
			<div className="border-t">
				<div className="flex justify-end px-3 pt-2">
					<CopyButton text={content} />
				</div>
				<pre
					className="max-h-[min(60vh,28rem)] overflow-auto whitespace-pre-wrap break-words px-3 pb-3 pt-2 text-xs font-mono leading-relaxed text-muted-foreground"
				>
					{content}
				</pre>
			</div>
		</details>
	</Card>
);

const pricingLinks = {
	inr: "https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX",
	usd: "https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template",
};

const techStack = [
	{ name: "Next.js", version: "12.0.0" },
	{ name: "React", version: "^17.0.0" },
	{ name: "Tailwind CSS", version: "^3.4.17" },
	{ name: "Lucide React", version: "^0.474.0" },
	{ name: "Recharts", version: "^2.15.1" },
];

const customizationSteps = [
	"Update theme and color schemes from utils/theme.js and ThemeContext.",
	"Replace demo entities in app modules with your CRM data model.",
	"Edit navigation and sections in modules/Sidebar and modules/Navbar.",
	"Adjust card/table/chart components per your business workflow.",
];

const dataJsonTips = [
	"Keep reusable sample content in a single data.json per feature/module.",
	"Use stable keys (id, slug, status, dates) so lists and charts stay consistent.",
	"Map JSON into UI with lightweight adapters instead of hardcoding in JSX.",
	"For production, replace JSON adapters with API responses using same shape.",
];

const About = ({
	designMd = "",
	dataJson = "",
	firestoreSchemas = [],
	zodSchemas = [],
	sqlSchema = "",
}) => {
	return (
		<div className="mx-auto p-2">
			<div className="mx-auto max-w-5xl p-2">
				<div className="space-y-6">
					<header className="space-y-2">
						<h1 className="text-2xl font-semibold">
							CRM SaaS Template Documentation
						</h1>
						<p className="text-sm text-muted-foreground">
							Production-ready docs for setup, purchase, downloads, tech stack, pricing,
							and support resources.
						</p>
					</header>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Design system</CardTitle>
							<CardDescription>
								Full design guidelines from the project root <code className="text-xs">Design.md</code>
								— colors, typography, components, spacing, and motion.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{designMd ? (
								<SourcePanel subtitle="Design.md" raw={designMd} />
							) : (
								<p className="text-sm text-muted-foreground">
									Design.md was not found at build time.
								</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Sample data</CardTitle>
							<CardDescription>
								Reference snapshot <code className="text-xs">data.json</code> — shapes for each route;
								validated by <code className="text-xs">scripts/verify-schemas.mjs</code> against Zod (not
								imported at runtime).
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
								{dataJsonTips.map((tip) => (
									<li key={tip}>{tip}</li>
								))}
							</ul>
							{dataJson ? (
								<SourcePanel subtitle="data.json" raw={dataJson} />
							) : (
								<p className="mt-2 text-sm text-muted-foreground">
									data.json was not found at build time.
								</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Firestore</CardTitle>
							<CardDescription>
								Rules and collection layout under{" "}
								<code className="text-xs">schemas/firestore-schemas/</code> — align with Drizzle tables and
								tenant isolation.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{firestoreSchemas.length ? (
								<div className="space-y-2">
									{firestoreSchemas.map(({ name, content }) => (
										<CollapsibleFilePanel key={name} name={name} content={content} />
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No Firestore schema files were loaded.
								</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Zod schemas</CardTitle>
							<CardDescription>
								Validation schemas under <code className="text-xs">schemas/zod-schemas/</code>.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{zodSchemas.length ? (
								<div className="space-y-2">
									{zodSchemas.map(({ name, content }) => (
										<CollapsibleFilePanel key={name} name={name} content={content} />
									))}
								</div>
							) : (
								<p className="text-sm text-muted-foreground">
									No Zod schema files were loaded.
								</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">SQL / Drizzle schema</CardTitle>
							<CardDescription>
								Postgres table definitions in{" "}
								<code className="text-xs">schemas/sql-schemas/drizzle/schema.ts</code>.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{sqlSchema ? (
								<SourcePanel subtitle="schema.ts" raw={sqlSchema} />
							) : (
								<p className="text-sm text-muted-foreground">
									schema.ts was not found at build time.
								</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">How to Use</CardTitle>
						</CardHeader>
						<CardContent>
							<ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
								<li>Open modules inside `app/` and map each one to your CRM workflow.</li>
								<li>Connect your APIs and replace all demo records with real data.</li>
								<li>Keep UI consistency by reusing `Layout`, `Navbar`, and `Sidebar`.</li>
								<li>Launch and iterate page by page after validating your data bindings.</li>
							</ol>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Buy and Download ZIP Files</CardTitle>
							<CardDescription>
								Complete checkout, then download the source ZIP from your order page.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									asChild
									className="bg-orange-100 text-zinc-600 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-zinc-100 dark:hover:bg-orange-900/50"
								>
									<a
										href={pricingLinks.inr}
										target="_blank"
										rel="noopener noreferrer"
									>
										🇮🇳 Buy in INR
									</a>
								</Button>
								<Button variant="secondary" size="sm" asChild>
									<a
										href={pricingLinks.usd}
										target="_blank"
										rel="noopener noreferrer"
									>
										🇺🇸 Buy in USD
									</a>
								</Button>
							</div>
							<ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
								<li>Download links are available immediately after successful payment.</li>
								<li>Keep your order receipt for future updates and support verification.</li>
								<li>Use the provided contact if you need help accessing your files.</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Tech Stack and Versions</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="pl-5 list-disc max-w-xs space-y-2 text-sm text-muted-foreground">
								{techStack.map((item) => (
									<li key={item.name} className="flex items-center justify-between gap-3">
										<span>{item.name}</span>
										<span className="text-muted-foreground">{item.version}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Pricing</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
								<li>INR checkout is optimized for domestic India purchases.</li>
								<li>USD checkout is ideal for international buyers.</li>
								<li>Both options include the same template package and source access.</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Customization</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
								{customizationSteps.map((step) => (
									<li key={step}>{step}</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Figma Files</CardTitle>
							<CardDescription>
								After purchase, use the support contact in your purchase receipt to
								request the latest Figma source and component kit access.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="link" asChild className="h-auto p-0">
								<a
									href="mailto:shreyvijayvargiya26@gmail.com"
									className="inline-flex items-center gap-1"
								>
									Contact for Figma access <ExternalLink size={14} />
								</a>
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Contact</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-1">
								<Button variant="link" asChild className="h-auto p-0">
									<a
										href="mailto:shreyvijayvargiya26@gmail.com"
										className="inline-flex items-center gap-1"
									>
										Email <ExternalLink size={14} />
									</a>
								</Button>
								<Button variant="link" asChild className="h-auto p-0">
									<a
										href="https://x.com/treyvijay"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1"
									>
										X.com <ExternalLink size={14} />
									</a>
								</Button>
							</div>

							<p className="mt-4 text-base font-semibold">Our Products</p>
							<div className="mt-2 flex flex-col gap-1">
								<Button variant="link" asChild className="h-auto p-0">
									<a
										href="https://ihatereading.in"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1"
									>
										iHateReading <ExternalLink size={14} />
									</a>
								</Button>
								<Button variant="link" asChild className="h-auto p-0">
									<a
										href="https://gettemplate.in"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1"
									>
										Gettemplate <ExternalLink size={14} />
									</a>
								</Button>
								<Button variant="link" asChild className="h-auto p-0">
									<a
										href="https://buildsaas.dev"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1"
									>
										Buildsaas.dev <ExternalLink size={14} />
									</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default About;
