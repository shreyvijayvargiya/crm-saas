import React, { useState } from "react";
import { PlayCircle, X } from "lucide-react";
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
				className={`overflow-y-auto ${colors.primaryBackground} border ${colors.border} rounded-2xl w-full h-[98vh] hidescrollbar transition-colors`}
			>
				<Navbar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
				<div>{children}</div>
			</main>

			<button
				onClick={() => setIsVideoModalOpen(true)}
				className="fixed bottom-2 right-2 z-40 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl"
			>
				<PlayCircle size={18} />
				<span className="hidden md:block">Watch Demo</span>
			</button>

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
			<ToastContainer position="bottom-right" />
		</div>
	);
};

export default LayoutWrapper;
