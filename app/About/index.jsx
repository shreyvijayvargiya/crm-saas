import React from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const CopyButton = ({ text, colors }) => {
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
		<button
			type="button"
			onClick={handleCopy}
			disabled={!canCopy}
			className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${colors.border} ${colors.muted} ${colors.foreground} ${colors.hoverSecondary}`}
		>
			{copied ? <Check className="h-3.5 w-3.5 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
			{copied ? "Copied" : "Copy"}
		</button>
	);
};

const SourcePanel = ({ colors, subtitle, raw }) => (
	<div className="mt-2">
		{subtitle ? <p className={`text-xs ${colors.mutedForeground}`}>{subtitle}</p> : null}
		<div className="mt-1 flex justify-end">
			<CopyButton text={raw} colors={colors} />
		</div>
		<pre
			className={`mt-2 max-h-[min(70vh,36rem)] overflow-auto whitespace-pre-wrap break-words rounded-xl border p-3 text-xs font-mono leading-relaxed ${colors.border} ${colors.muted} ${colors.mutedForeground}`}
		>
			{raw}
		</pre>
	</div>
);

const CollapsibleFilePanel = ({ name, content, colors }) => (
	<details className={`rounded-xl border ${colors.border} ${colors.muted}`}>
		<summary
			className={`cursor-pointer select-none px-3 py-2 text-sm font-medium ${colors.foreground}`}
		>
			{name}
		</summary>
		<div className={`border-t ${colors.border}`}>
			<div className="flex justify-end px-3 pt-2">
				<CopyButton text={content} colors={colors} />
			</div>
			<pre
				className={`max-h-[min(60vh,28rem)] overflow-auto whitespace-pre-wrap break-words px-3 pb-3 pt-2 text-xs font-mono leading-relaxed ${colors.mutedForeground}`}
			>
				{content}
			</pre>
		</div>
	</details>
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
	const { colors } = useTheme();

	return (
		<div className="mx-auto p-2">
			<div className="mx-auto max-w-5xl p-2">
				<div className="space-y-6">
					<header className="space-y-2">
						<h1 className={`text-2xl font-semibold ${colors.foreground}`}>
							CRM SaaS Template Documentation
						</h1>
						<p className={`text-sm ${colors.mutedForeground}`}>
							Production-ready docs for setup, purchase, downloads, tech stack, pricing,
							and support resources.
						</p>
					</header>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Design system</p>
						<p className={`mt-1 text-sm ${colors.textSecondary}`}>
							Full design guidelines from the project root <code className="text-xs">Design.md</code>
							— colors, typography, components, spacing, and motion.
						</p>
						{designMd ? (
							<SourcePanel colors={colors} subtitle="Design.md" raw={designMd} />
						) : (
							<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
								Design.md was not found at build time.
							</p>
						)}
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Sample data</p>
						<p className={`mt-1 text-sm ${colors.textSecondary}`}>
							Reference snapshot <code className="text-xs">data.json</code> — shapes for each route;
							validated by <code className="text-xs">scripts/verify-schemas.mjs</code> against Zod (not
							imported at runtime).
						</p>
						<ul className={`mt-2 list-disc space-y-1 pl-5 text-sm ${colors.textSecondary}`}>
							{dataJsonTips.map((tip) => (
								<li key={tip}>{tip}</li>
							))}
						</ul>
						{dataJson ? (
							<SourcePanel colors={colors} subtitle="data.json" raw={dataJson} />
						) : (
							<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
								data.json was not found at build time.
							</p>
						)}
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Firestore</p>
						<p className={`mt-1 text-sm ${colors.textSecondary}`}>
							Rules and collection layout under{" "}
							<code className="text-xs">schemas/firestore-schemas/</code> — align with Drizzle tables and
							tenant isolation.
						</p>
						{firestoreSchemas.length ? (
							<div className="mt-3 space-y-2">
								{firestoreSchemas.map(({ name, content }) => (
									<CollapsibleFilePanel key={name} name={name} content={content} colors={colors} />
								))}
							</div>
						) : (
							<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
								No Firestore schema files were loaded.
							</p>
						)}
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Zod schemas</p>
						<p className={`mt-1 text-sm ${colors.textSecondary}`}>
							Validation schemas under <code className="text-xs">schemas/zod-schemas/</code>.
						</p>
						{zodSchemas.length ? (
							<div className="mt-3 space-y-2">
								{zodSchemas.map(({ name, content }) => (
									<CollapsibleFilePanel key={name} name={name} content={content} colors={colors} />
								))}
							</div>
						) : (
							<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
								No Zod schema files were loaded.
							</p>
						)}
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>SQL / Drizzle schema</p>
						<p className={`mt-1 text-sm ${colors.textSecondary}`}>
							Postgres table definitions in{" "}
							<code className="text-xs">schemas/sql-schemas/drizzle/schema.ts</code>.
						</p>
						{sqlSchema ? (
							<SourcePanel colors={colors} subtitle="schema.ts" raw={sqlSchema} />
						) : (
							<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
								schema.ts was not found at build time.
							</p>
						)}
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>How to Use</p>
						<ol className={`mt-3 list-decimal space-y-2 pl-5 text-sm ${colors.textSecondary}`}>
							<li>Open modules inside `app/` and map each one to your CRM workflow.</li>
							<li>Connect your APIs and replace all demo records with real data.</li>
							<li>Keep UI consistency by reusing `Layout`, `Navbar`, and `Sidebar`.</li>
							<li>Launch and iterate page by page after validating your data bindings.</li>
						</ol>
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>
							Buy and Download ZIP Files
						</p>
						<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
							Complete checkout, then download the source ZIP from your order page.
						</p>
						<div className="mt-3 flex items-center gap-2">
							<a
								href={pricingLinks.inr}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded bg-orange-100 p-1 text-center text-xs font-semibold text-zinc-600 transition-all duration-100 ease-in hover:bg-orange-200 dark:bg-orange-900/30 dark:text-zinc-100 dark:hover:bg-orange-900/50"
							>
								🇮🇳 Buy in INR
							</a>
							<a
								href={pricingLinks.usd}
								target="_blank"
								rel="noopener noreferrer"
								className={`rounded px-2 py-1.5 text-center text-xs font-semibold bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-700`}
							>
								🇺🇸 Buy in USD
							</a>
						</div>
						<ul className={`mt-4 list-disc space-y-1 pl-5 text-sm ${colors.textSecondary}`}>
							<li>Download links are available immediately after successful payment.</li>
							<li>Keep your order receipt for future updates and support verification.</li>
							<li>Use the provided contact if you need help accessing your files.</li>
						</ul>
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>
							Tech Stack and Versions
						</p>
						<ul className={`mt-3 pl-5 list-disc max-w-xs space-y-2 text-sm ${colors.textSecondary}`}>
							{techStack.map((item) => (
								<li key={item.name} className="flex items-center justify-between gap-3">
									<span className={colors.foreground}>{item.name}</span>
									<span className={colors.mutedForeground}>{item.version}</span>
								</li>
							))}
						</ul>
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Pricing</p>
						<ul className={`mt-3 list-disc space-y-1 pl-5 text-sm ${colors.textSecondary}`}>
							<li>INR checkout is optimized for domestic India purchases.</li>
							<li>USD checkout is ideal for international buyers.</li>
							<li>Both options include the same template package and source access.</li>
						</ul>
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Customization</p>
						<ul className={`mt-3 list-disc space-y-1 pl-5 text-sm ${colors.textSecondary}`}>
							{customizationSteps.map((step) => (
								<li key={step}>{step}</li>
							))}
						</ul>
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Figma Files</p>
						<p className={`mt-2 text-sm ${colors.textSecondary}`}>
							After purchase, use the support contact in your purchase receipt to
							request the latest Figma source and component kit access.
						</p>
						<a
							href="mailto:shreyvijayvargiya26@gmail.com"
							className={`mt-3 inline-flex items-center gap-1 text-sm underline ${colors.foreground}`}
						>
							Contact for Figma access <ExternalLink size={14} />
						</a>
					</section>

					<section className={`rounded-xl p-4 ${colors.hoverSecondary}`}>
						<p className={`text-base font-semibold ${colors.foreground}`}>Contact</p>
						<div className="mt-2 flex flex-col gap-1">
							<a
								href="mailto:shreyvijayvargiya26@gmail.com"
								className={`inline-flex items-center gap-1 text-sm underline ${colors.foreground}`}
							>
								Email <ExternalLink size={14} />
							</a>
							<a
								href="https://x.com/treyvijay"
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex items-center gap-1 text-sm underline ${colors.foreground}`}
							>
								X.com <ExternalLink size={14} />
							</a>
						</div>

						<p className={`mt-4 text-base font-semibold ${colors.foreground}`}>Our Products</p>
						<div className="mt-2 flex flex-col gap-1">
							<a
								href="https://ihatereading.in"
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex items-center gap-1 text-sm underline ${colors.foreground}`}
							>
								iHateReading <ExternalLink size={14} />
							</a>
							<a
								href="https://gettemplate.in"
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex items-center gap-1 text-sm underline ${colors.foreground}`}
							>
								Gettemplate <ExternalLink size={14} />
							</a>
							<a
								href="https://buildsaas.dev"
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex items-center gap-1 text-sm underline ${colors.foreground}`}
							>
								Buildsaas.dev <ExternalLink size={14} />
							</a>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default About;
