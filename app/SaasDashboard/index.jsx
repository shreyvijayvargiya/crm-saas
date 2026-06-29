import React, { useState } from "react";
import {
	Brain,
	CreditCard,
	LayoutDashboard,
	Sparkles,
	Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ORGANIZATIONS } from "./saasDashboardSeedData";
import OrgWorkspacePanel from "./components/OrgWorkspacePanel";
import HybridBillingPanel from "./components/HybridBillingPanel";
import AiMeteringPanel from "./components/AiMeteringPanel";
import AiPrimitivesPanel from "./components/AiPrimitivesPanel";
import RoleBasedViews from "./components/RoleBasedViews";

const TABS = [
	{ id: "overview", label: "Overview", icon: LayoutDashboard },
	{ id: "workspace", label: "Workspace", icon: Users },
	{ id: "billing", label: "Billing", icon: CreditCard },
	{ id: "metering", label: "AI metering", icon: Brain },
	{ id: "primitives", label: "AI primitives", icon: Sparkles },
];

export default function SaasDashboard() {
	const [activeTab, setActiveTab] = useState("overview");
	const [activeOrg, setActiveOrg] = useState(ORGANIZATIONS[0].id);
	const [activeRole, setActiveRole] = useState("owner");

	const org = ORGANIZATIONS.find((o) => o.id === activeOrg) ?? ORGANIZATIONS[0];

	return (
		<div className="min-h-screen space-y-6 p-4 sm:p-6">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<div className="flex flex-wrap items-center gap-2">
						<h1 className="text-2xl font-semibold text-foreground">SaaS Dashboard</h1>
						<Badge variant="secondary" className="text-[10px]">
							Multi-tenant
						</Badge>
					</div>
					<p className="mt-1 text-sm text-muted-foreground">
						Org workspace, hybrid billing, AI metering, and role-based views for SaaS
						operators.
					</p>
				</div>
				<div className="rounded-xl border bg-muted/20 px-4 py-2 text-right">
					<p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
						Active org
					</p>
					<p className="text-sm font-medium">{org.name}</p>
					<p className="text-xs text-muted-foreground">
						{org.plan} · ${org.mrr}/mo MRR
					</p>
				</div>
			</div>

			<nav className="flex gap-1 overflow-x-auto border-b">
				{TABS.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								"-mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
								activeTab === tab.id
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground"
							)}
						>
							<Icon className="h-4 w-4" />
							{tab.label}
						</button>
					);
				})}
			</nav>

			{activeTab === "overview" && (
				<RoleBasedViews activeRole={activeRole} onRoleChange={setActiveRole} />
			)}
			{activeTab === "workspace" && (
				<OrgWorkspacePanel activeOrg={activeOrg} onOrgChange={setActiveOrg} />
			)}
			{activeTab === "billing" && <HybridBillingPanel />}
			{activeTab === "metering" && <AiMeteringPanel />}
			{activeTab === "primitives" && <AiPrimitivesPanel />}
		</div>
	);
}
