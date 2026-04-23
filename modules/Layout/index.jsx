import React, { useState } from "react";
import {
	PlayCircle,
	X,
	Info,
	ShoppingCart,
	Download,
	Wrench,
	CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toast";
import Navbar from "../Navbar";
import { useTheme } from "../../utils/useTheme";

const ABOUT_VIDEO_URL =
	"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfUpCNWfb7rxhdGYe1SLHVu92gAbfPX6ytMjcp";

const LayoutWrapper = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(false);
	const { colors } = useTheme();

	return (
		<div
			className={`flex gap-2 relative md:p-2 transition-colors min-h-screen`}
		>
			<div className="hidden md:block">
				<Sidebar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			<div
				className={`fixed inset-0 bg-black bg-opacity-50 left-0 right-0 transition-all duration-300 ease-in-out z-50 ${
					drawerOpen
						? "bottom-0 h-0 opacity-100 visible"
						: "bottom-0 h-0 opacity-0 hidden"
				} md:hidden block`}
			>
				<Sidebar
					open={drawerOpen}
					setOpen={setDrawerOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			<main
				className={`overflow-y-auto ${colors.primaryBackground} border ${colors.border} rounded-2xl w-full h-[98vh] hidescrollbar transition-all duration-100 ease-in`}
			>
				<Navbar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
				<div>{children}</div>
			</main>

			<div className="fixed bottom-2 right-2 z-40 flex flex-col items-end gap-2">
				<button
					onClick={() => setIsHowToUseModalOpen(true)}
					className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-orange-400 hover:shadow-xl"
				>
					<Info size={18} />
					<span className="hidden md:block">How to Use</span>
				</button>
				<button
					onClick={() => setIsVideoModalOpen(true)}
					className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl"
				>
					<PlayCircle size={18} />
					<span className="hidden md:block">Watch Demo</span>
				</button>
			</div>

			{isVideoModalOpen && (
				<div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-2">
					<div
						className={`relative w-full max-w-4xl rounded-2xl border ${colors.border} ${colors.card} p-4 shadow-2xl`}
					>
						<div className="mb-3 flex items-start justify-between">
							<div>
								<h3 className={`text-base font-semibold ${colors.foreground}`}>
									CRM SaaS Template Demo
								</h3>
								
							</div>
							<button
								onClick={() => setIsVideoModalOpen(false)}
								className={`rounded-xl p-2 ${colors.hoverSecondary}`}
								aria-label="Close video modal"
							>
								<X size={14} className={colors.foreground} />
							</button>
						</div>
						<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
							Quick walkthrough of the template pages and workflows.
						</p>
						
						<div className={`mt-3 w-full overflow-hidden rounded-xl border ${colors.border} bg-black`}>
							<div className="aspect-video w-full">
								<video
									className="h-full w-full object-contain"
									src={ABOUT_VIDEO_URL}
									controls
									autoPlay
									playsInline
									preload="metadata"
								>
									Your browser does not support the video tag.
								</video>
							</div>
						</div>

					</div>
				</div>
			)}

			{isHowToUseModalOpen && (
				<div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70">
					<div
						className={`relative w-full max-w-2xl rounded-2xl border ${colors.border} ${colors.card} shadow-2xl`}
					>
						<div className={`mb-3 p-4 flex items-start justify-between border-b ${colors.border}`}>
							<div>
								<h3 className={`text-base font-semibold ${colors.foreground}`}>
									How to Use CRM SaaS Template
								</h3>
								<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
									Go from purchase to deployment in 3 simple steps.
								</p>
							</div>
							<button
								onClick={() => setIsHowToUseModalOpen(false)}
								className={`rounded-xl p-2 ${colors.hoverSecondary}`}
								aria-label="Close how to use modal"
							>
								<X size={14} className={colors.foreground} />
							</button>
						</div>

						<div className="grid gap-3 md:grid-cols-3 p-4">
							{[
								{
									icon: ShoppingCart,
									title: "Buy Template",
									desc: "Choose INR or USD checkout and complete your purchase.",
									accent: "bg-orange-500/15 text-orange-500",
								},
								{
									icon: Download,
									title: "Download ZIP",
									desc: "Get the source ZIP from your purchase confirmation page.",
									accent: "bg-indigo-500/15 text-indigo-500",
								},
								{
									icon: Wrench,
									title: "Customize & Deploy",
									desc: "Connect APIs, edit modules, then deploy your CRM app.",
									accent: "bg-emerald-500/15 text-emerald-500",
								},
							].map((step, idx) => {
								const Icon = step.icon;
								return (
									<motion.div
										key={step.title}
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.12, duration: 0.3 }}
										className={`rounded-xl border ${colors.border} p-4`}
									>
										<div className={`rounded-xl p-2 w-fit ${step.accent}`}>
											<Icon size={16} />
										</div>
										<p className={`mt-2 text-sm font-semibold ${colors.foreground}`}>
											{step.title}
										</p>
										<p className={`text-xs leading-relaxed ${colors.mutedForeground}`}>
											{step.desc}
										</p>
									</motion.div>
								);
							})}
						</div>

						<div className={`m-4 rounded-xl  p-4`}>
							<div className="mb-2 flex items-center gap-2">
								<CheckCircle2 size={16} className={colors.foreground} />
								<p className={`text-sm font-semibold ${colors.foreground}`}>
									Tech Stack
								</p>
							</div>
							<ul className={`list-disc space-y-1 pl-5 text-xs ${colors.mutedForeground}`}>
								<li>Next.js</li>
								<li>React</li>
								<li>Lucide Icons</li>
								<li>Tailwind CSS</li>
								<li>Framer Motion</li>
							</ul>
						</div>
					</div>
				</div>
			)}
			<ToastContainer position="bottom-right" />
		</div>
	);
};

export default LayoutWrapper;
