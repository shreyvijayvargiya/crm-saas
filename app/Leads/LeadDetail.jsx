import React, { useMemo } from "react";
import { useRouter } from "next/router";
import RecordProfileDetail from "../CRM/RecordProfileDetail";
import { useCrmData } from "../../utils/CrmDataContext";
import { buildLeadRecord, findById } from "../../utils/crmRecordHelpers";

const LeadDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { leads, leadPipelines } = useCrmData();

	const lead = useMemo(() => {
		if (!id) return null;
		return buildLeadRecord(id, leads, leadPipelines);
	}, [id, leads, leadPipelines]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	if (!findById(leads, id)) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Lead not found.</p>
			</div>
		);
	}

	return (
		<RecordProfileDetail
			kind="lead"
			record={lead}
			backHref="/leads"
			backLabel="Back to leads"
		/>
	);
};

export default LeadDetail;
