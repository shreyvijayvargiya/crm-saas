import React, { useMemo } from "react";
import { useRouter } from "next/router";
import RecordProfileDetail from "../CRM/RecordProfileDetail";
import { getContactRecord } from "../CRM/recordDetailData";

const ContactDetail = () => {
	const router = useRouter();
	const { id } = router.query;

	const contact = useMemo(() => {
		if (!id) return null;
		return getContactRecord(id);
	}, [id]);

	if (!router.isReady || !contact) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
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
