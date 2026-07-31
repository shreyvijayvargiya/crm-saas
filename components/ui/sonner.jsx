import { Toaster as Sonner } from "sonner";
import { toastSurface } from "@/lib/themeTokens";
import { cn } from "@/lib/utils";

const Toaster = ({ ...props }) => {
	return (
		<Sonner
			theme="system"
			className="toaster group"
			position="bottom-right"
			toastOptions={{
				classNames: {
					toast: cn(
						"group toast group-[.toaster]:border-border",
						toastSurface
					),
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
