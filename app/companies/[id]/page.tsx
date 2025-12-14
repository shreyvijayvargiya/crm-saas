"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { PeopleTab } from "@/components/companies/PeopleTab";
import { AddressesTab } from "@/components/companies/AddressesTab";

const DEFAULT_TENANT_ID = "00000000-0000-0000-0000-000000000001";

interface Entity {
	entity_id: string;
	entity_type: "COMPANY" | "INDIVIDUAL";
	legal_name: string;
	display_name: string;
	country: string | null;
	default_currency: string;
	status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
	internal_notes: string | null;
	created_at: string;
	relationships?: Array<{
		relationship_type: string;
		is_primary: boolean;
	}>;
}

export default function CompanyProfilePage() {
	const params = useParams();
	const router = useRouter();
	const entityId = params.id as string;
	const [entity, setEntity] = useState<Entity | null>(null);
	const [loading, setLoading] = useState(true);
	const [internalNotes, setInternalNotes] = useState("");

	useEffect(() => {
		if (entityId) {
			fetchEntity();
		}
	}, [entityId]);

	const fetchEntity = async () => {
		try {
			const { data: entityData, error: entityError } = await supabase
				.from("entity")
				.select("*")
				.eq("entity_id", entityId)
				.single();

			if (entityError) throw entityError;

			// Fetch relationships
			const { data: relationships } = await supabase
				.from("entity_role")
				.select("relationship_type, is_primary")
				.eq("entity_id", entityId)
				.eq("tenant_id", DEFAULT_TENANT_ID);

			setEntity({
				...entityData,
				relationships: relationships || [],
			});
			setInternalNotes(entityData.internal_notes || "");
		} catch (error) {
			console.error("Error fetching entity:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveNotes = async () => {
		if (!entity) return;

		try {
			const { error } = await supabase
				.from("entity")
				.update({ internal_notes: internalNotes || null })
				.eq("entity_id", entity.entity_id);

			if (error) throw error;
			alert("Notes saved successfully");
		} catch (error) {
			console.error("Error saving notes:", error);
			alert("Failed to save notes. Please try again.");
		}
	};

	const formatRelationshipType = (type: string) => {
		return type
			.split("_")
			.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
			.join(" ");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	if (!entity) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Company not found</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-50">
			<main className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<Button
						variant="ghost"
						onClick={() => router.push("/companies")}
						className="mb-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Companies
					</Button>
					<h1 className="text-3xl font-bold">{entity.display_name}</h1>
					<p className="text-muted-foreground mt-1">{entity.legal_name}</p>
				</div>

				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="people">People</TabsTrigger>
						<TabsTrigger value="addresses">Addresses</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Company Information</CardTitle>
								<CardDescription>
									Basic details and business relationships
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label className="text-muted-foreground">Type</Label>
										<p className="font-medium">
											{entity.entity_type === "COMPANY"
												? "Company"
												: "Individual"}
										</p>
									</div>
									<div>
										<Label className="text-muted-foreground">Status</Label>
										<div>
											<Badge
												variant={
													entity.status === "ACTIVE"
														? "success"
														: entity.status === "INACTIVE"
														? "warning"
														: "secondary"
												}
											>
												{entity.status}
											</Badge>
										</div>
									</div>
									<div>
										<Label className="text-muted-foreground">Country</Label>
										<p className="font-medium">{entity.country || "—"}</p>
									</div>
									<div>
										<Label className="text-muted-foreground">
											Default Currency
										</Label>
										<p className="font-medium">{entity.default_currency}</p>
									</div>
									<div>
										<Label className="text-muted-foreground">Created</Label>
										<p className="font-medium">
											{entity.created_at
												? new Date(entity.created_at).toLocaleDateString(
														"en-US",
														{
															year: "numeric",
															month: "short",
															day: "numeric",
														}
												  )
												: "—"}
										</p>
									</div>
								</div>

								<div>
									<Label className="text-muted-foreground">
										Business Relationships
									</Label>
									<div className="flex flex-wrap gap-2 mt-2">
										{entity.relationships && entity.relationships.length > 0 ? (
											entity.relationships.map((rel, idx) => (
												<Badge
													key={idx}
													variant={rel.is_primary ? "default" : "outline"}
												>
													{formatRelationshipType(rel.relationship_type)}
													{rel.is_primary && " (Primary)"}
												</Badge>
											))
										) : (
											<span className="text-muted-foreground">
												No relationships
											</span>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Internal Notes</CardTitle>
								<CardDescription>
									Private notes about this company (not visible to contacts)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="notes">Notes</Label>
									<Textarea
										id="notes"
										value={internalNotes}
										onChange={(e) => setInternalNotes(e.target.value)}
										placeholder="Add internal notes about this company..."
										rows={6}
									/>
								</div>
								<Button onClick={handleSaveNotes}>Save Notes</Button>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="people">
						<PeopleTab entityId={entityId} />
					</TabsContent>

					<TabsContent value="addresses">
						<AddressesTab entityId={entityId} />
					</TabsContent>

					<TabsContent value="activity">
						<Card>
							<CardHeader>
								<CardTitle>Activity</CardTitle>
								<CardDescription>
									Activity history for this company
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Activity tracking will be available in a future update.
								</p>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
