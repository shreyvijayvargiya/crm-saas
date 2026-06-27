import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/utils/useTheme";
import { toastSurface } from "@/lib/themeTokens";
import { cn } from "@/lib/utils";

const Toaster = ({ ...props }) => {
	const { theme } = useTheme();

	return (
		<Sonner
			theme={theme === "dark" ? "dark" : "light"}
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
