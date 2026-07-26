import React from "react";
import EcommerceOpsList from "../EcommerceOpsList";

const SEED = [
	{ id: "1", tracking: "1Z999AA10123456784", orderId: "ORD-2401", carrier: "UPS", destination: "Austin, TX", eta: "2026-07-28", status: "In transit" },
	{ id: "2", tracking: "9400111899223344556677", orderId: "ORD-2398", carrier: "USPS", destination: "Seattle, WA", eta: "2026-07-27", status: "Out for delivery" },
	{ id: "3", tracking: "794612345678", orderId: "ORD-2388", carrier: "FedEx", destination: "Berlin, DE", eta: "2026-07-30", status: "Customs" },
	{ id: "4", tracking: "JD014600003456789012", orderId: "ORD-2372", carrier: "DHL", destination: "London, UK", eta: "2026-07-26", status: "Delivered" },
	{ id: "5", tracking: "1Z999AA10123456001", orderId: "ORD-2360", carrier: "UPS", destination: "Denver, CO", eta: "2026-07-29", status: "Exception" },
];

const COLUMNS = [
	{ id: "tracking", label: "Tracking" },
	{ id: "orderId", label: "Order" },
	{ id: "carrier", label: "Carrier" },
	{ id: "destination", label: "Destination" },
	{ id: "eta", label: "ETA" },
	{ id: "status", label: "Status", type: "badge" },
];

export default function Shipping() {
	return (
		<EcommerceOpsList
			title="Shipping"
			description="Carrier tracking and delivery status for open ecommerce orders."
			columns={COLUMNS}
			seed={SEED}
			searchKeys={["tracking", "orderId", "carrier", "destination", "status"]}
			primaryActionLabel="Create shipment"
		/>
	);
}
