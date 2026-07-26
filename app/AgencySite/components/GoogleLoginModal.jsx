import React, { useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/AuthContext";
import { useAgencyTheme } from "../AgencyThemeContext";
import { cn } from "@/lib/utils";

/**
 * Google-only login modal for the Agency marketing surface.
 */
export default function GoogleLoginModal() {
	const router = useRouter();
	const { isLight } = useAgencyTheme();
	const {
		loginOpen,
		setLoginOpen,
		signInWithGoogle,
		authError,
		setAuthError,
	} = useAuth();
	const [busy, setBusy] = useState(false);

	const handleGoogle = async () => {
		setBusy(true);
		setAuthError("");
		try {
			await signInWithGoogle();
			toast.success("Signed in");
			const next = router.query.next;
			const dest =
				typeof next === "string" && next.startsWith("/") ? next : "/workspace";
			router.push(dest);
		} catch (err) {
			if (err?.code !== "auth/popup-closed-by-user") {
				toast.error(err?.message || "Sign-in failed");
			}
		} finally {
			setBusy(false);
		}
	};

	return (
		<Dialog open={loginOpen} onOpenChange={setLoginOpen}>
			<DialogContent
				className={cn(
					"max-w-sm border sm:rounded-2xl",
					isLight
						? "border-zinc-200 bg-white text-zinc-900"
						: "border-zinc-800 bg-zinc-950 text-zinc-100"
				)}
			>
				<DialogHeader className="space-y-2 text-left">
					<DialogTitle className="text-xl tracking-tight">
						Sign in to SaaSCRM
					</DialogTitle>
					<DialogDescription
						className={cn(isLight ? "text-zinc-500" : "text-zinc-400")}
					>
						Use Google to create and open your CRM workspaces.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-3 pt-2">
					<Button
						type="button"
						variant="outline"
						disabled={busy}
						onClick={handleGoogle}
						className={cn(
							"h-11 w-full gap-2 rounded-full text-sm font-medium",
							isLight
								? "border-zinc-200 bg-white hover:bg-zinc-50"
								: "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
						)}
					>
						{busy ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<FcGoogle className="h-5 w-5" />
						)}
						Continue with Google
					</Button>

					{authError ? (
						<p className="text-xs text-red-500">{authError}</p>
					) : (
						<p
							className={cn(
								"text-center text-[11px]",
								isLight ? "text-zinc-400" : "text-zinc-500"
							)}
						>
							By continuing you agree to use SaaSCRM for your own workspace data.
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
