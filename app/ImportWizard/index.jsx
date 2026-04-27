import React, { useState } from "react";
import { Upload, FileUp, CheckCircle2 } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const STEPS = [
	{
		n: 1,
		title: "Choose object",
		body: "Pick what you are importing — contacts, companies, or deals. The template maps columns in the next step.",
	},
	{
		n: 2,
		title: "Map fields",
		body: "Match spreadsheet columns to CRM fields. Required fields are highlighted; you can save this mapping for next time.",
	},
	{
		n: 3,
		title: "Review & import",
		body: "Preview a sample of rows, fix validation issues, then run the import. Duplicates can be merged or skipped.",
	},
];

const ImportWizard = () => {
	const { colors, scheme, colorScheme } = useTheme();
	const [active, setActive] = useState(0);
	const focusRing = getFocusRingClass(colorScheme);

	return (
		<div className="min-h-screen transition-all duration-100 ease-in pb-10">
			<div className="max-w-3xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1
						className={`text-2xl font-bold tracking-tight inline-flex items-center gap-2 ${colors.foreground}`}
					>
						<Upload className="h-7 w-7 shrink-0" />
						Import data
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Guided import — wire each step to your API when you go live
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{STEPS.map((s, i) => (
						<button
							type="button"
							key={s.n}
							onClick={() => setActive(i)}
							className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors border ${colors.border} ${
								i === active
									? `${scheme.primary} ${scheme.primaryForeground}`
									: `${colors.card} ${colors.mutedForeground} ${colors.hoverSecondary}`
							} focus:outline-none focus:ring-2 ${focusRing}`}
						>
							Step {s.n}
						</button>
					))}
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
				>
					<div className={`px-5 py-4 border-b ${colors.border} flex items-start gap-3`}>
						<div
							className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}
						>
							<FileUp className="h-5 w-5" />
						</div>
						<div>
							<p className={`text-sm font-semibold ${colors.foreground}`}>
								{STEPS[active].title}
							</p>
							<p className={`text-sm mt-1 leading-relaxed ${colors.textSecondary}`}>
								{STEPS[active].body}
							</p>
						</div>
					</div>
					<div className={`px-5 py-6 ${colors.mutedBackground}`}>
						<div
							className={`border border-dashed ${colors.border} rounded-xl px-4 py-10 text-center ${colors.card}`}
						>
							<CheckCircle2
								className={`mx-auto h-8 w-8 ${colors.mutedForeground} opacity-60`}
							/>
							<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
								Drop a CSV or XLSX here in your implementation
							</p>
						</div>
					</div>
					<div className={`px-5 py-3 border-t ${colors.border} flex justify-end gap-2`}>
						<button
							type="button"
							onClick={() => setActive((i) => Math.max(0, i - 1))}
							disabled={active === 0}
							className={`rounded-xl px-3 py-1.5 text-sm border ${colors.border} ${colors.foreground} ${colors.hoverSecondary} disabled:opacity-40 focus:outline-none focus:ring-2 ${focusRing}`}
						>
							Back
						</button>
						<button
							type="button"
							onClick={() => setActive((i) => Math.min(STEPS.length - 1, i + 1))}
							disabled={active === STEPS.length - 1}
							className={`rounded-xl px-3 py-1.5 text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover} disabled:opacity-40 focus:outline-none focus:ring-2 ${focusRing}`}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImportWizard;
