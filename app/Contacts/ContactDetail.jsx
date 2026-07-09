import React, { useMemo } from "react";
import { useRouter } from "next/router";
import RecordProfileDetail from "../CRM/RecordProfileDetail";
import { useCrmData } from "../../utils/CrmDataContext";
import { buildContactRecord, findById } from "../../utils/crmRecordHelpers";

const ContactDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { contacts } = useCrmData();

	const contact = useMemo(() => {
		if (!id) return null;
		return buildContactRecord(id, contacts);
	}, [id, contacts]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	if (!findById(contacts, id)) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Contact not found.</p>
			</div>
		);
	}

	return (
		<RecordProfileDetail
			kind="contact"
			record={contact}
			backHref="/contacts"
			backLabel="Back to contacts"
		/>
	);
};

export default ContactDetail;
