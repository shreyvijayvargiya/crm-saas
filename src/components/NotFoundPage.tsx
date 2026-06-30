import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
			<p className="text-sm font-medium text-muted-foreground">404</p>
			<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
				Page not found
			</h1>
			<p className="max-w-sm text-sm text-muted-foreground">
				The page you&apos;re looking for doesn&apos;t exist or may have been moved.
			</p>
			<Button asChild className="mt-2">
				<Link to="/">
					<ArrowLeft className="h-4 w-4" />
					Back to home
				</Link>
			</Button>
		</div>
	);
}
