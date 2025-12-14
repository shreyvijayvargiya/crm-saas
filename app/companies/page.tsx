"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCompanies } from "@/lib/hooks/useCompanies";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Eye, Edit, Archive } from "lucide-react";
import { AddCompanyWizard } from "@/components/companies/AddCompanyWizard";

export default function CompaniesPage() {
	const router = useRouter();
	const [showAddWizard, setShowAddWizard] = useState(false);
	const {
		companies: entities,
		isLoading: loading,
		updateCompanyAsync,
		isUpdating,
	} = useCompanies();

	const handleArchive = async (entityId: string) => {
		try {
			await updateCompanyAsync({
				entity_id: entityId,
				status: "ARCHIVED",
			});
		} catch (error) {
			console.error("Error archiving company:", error);
			alert("Failed to archive company. Please try again.");
		}
	};

	const formatRelationshipType = (type: string) => {
		return type
			.split("_")
			.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
			.join(" ");
	};

	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case "ACTIVE":
				return "success";
			case "INACTIVE":
				return "warning";
			case "ARCHIVED":
				return "secondary";
			default:
				return "default";
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-50">
			<main className="container mx-auto px-4 py-8">
				<div className="mb-6 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold">Companies</h1>
						<p className="text-muted-foreground mt-1">
							Manage your business relationships
						</p>
					</div>
					<Button onClick={() => setShowAddWizard(true)}>
						<Plus className="h-4 w-4 mr-2" />
						Add Company
					</Button>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>All Companies</CardTitle>
						<CardDescription>
							View and manage all companies and individuals in your system
						</CardDescription>
					</CardHeader>
					<CardContent>
						{entities.length === 0 ? (
							<div className="py-8 text-center text-zinc-500">
								No companies found. Add your first company to get started.
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Company Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Relationship</TableHead>
										<TableHead>Country</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{entities.map((entity) => (
										<TableRow key={entity.entity_id}>
											<TableCell className="font-medium">
												{entity.display_name}
											</TableCell>
											<TableCell>
												{entity.entity_type === "COMPANY"
													? "Company"
													: "Individual"}
											</TableCell>
											<TableCell>
												{entity.relationships &&
												entity.relationships.length > 0 ? (
													<div className="flex flex-wrap gap-1">
														{entity.relationships.map((rel, idx) => (
															<Badge
																key={idx}
																variant={rel.is_primary ? "default" : "outline"}
															>
																{formatRelationshipType(rel.relationship_type)}
																{rel.is_primary && " (Primary)"}
															</Badge>
														))}
													</div>
												) : (
													<span className="text-muted-foreground">—</span>
												)}
											</TableCell>
											<TableCell>{entity.country || "—"}</TableCell>
											<TableCell>
												<Badge variant={getStatusBadgeVariant(entity.status)}>
													{entity.status}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon">
															<MoreVertical className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={() =>
																router.push(`/companies/${entity.entity_id}`)
															}
														>
															<Eye className="h-4 w-4 mr-2" />
															View
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																router.push(
																	`/companies/${entity.entity_id}/edit`
																)
															}
														>
															<Edit className="h-4 w-4 mr-2" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => handleArchive(entity.entity_id)}
														>
															<Archive className="h-4 w-4 mr-2" />
															Archive
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>

				{showAddWizard && (
					<AddCompanyWizard
						open={showAddWizard}
						onClose={() => setShowAddWizard(false)}
						onSuccess={() => {
							setShowAddWizard(false);
						}}
					/>
				)}
			</main>
		</div>
	);
}
