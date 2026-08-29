import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroScreenshotGrid({ screenshots, isLight }) {
	return (
		<section aria-label="SaaSCRM product screens" className="w-full">
			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{screenshots.map((item) => (
					<li key={item.src}>
						<Link href={item.href || "/demo"} passHref>
							<a
								className={cn(
									"group flex h-full flex-col overflow-hidden rounded-2xl border transition duration-300",
									isLight
										? "border-zinc-200 bg-white/80 shadow-sm hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
										: "border-zinc-800 bg-zinc-900/50 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
								)}
							>
								<div className="aspect-[16/10] overflow-hidden">
									<img
										src={item.src}
										alt={item.alt}
										className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
										width={640}
										height={400}
										loading="lazy"
									/>
								</div>
								<div className="flex flex-1 flex-col p-4">
									<h3
										className={cn(
											"text-sm font-semibold tracking-tight",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										{item.label}
									</h3>
									<p
										className={cn(
											"mt-1.5 flex-1 text-xs leading-relaxed sm:text-sm",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{item.description}
									</p>
									<span
										className={cn(
											"mt-3 inline-flex items-center gap-1 text-xs font-medium",
											isLight ? "text-zinc-700" : "text-zinc-300"
										)}
									>
										Open screen
										<ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
									</span>
								</div>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
