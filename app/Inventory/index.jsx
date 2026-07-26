import React from "react";
import EcommerceOpsList from "../EcommerceOpsList";

const SEED = [
	{ id: "1", sku: "TEE-BLK-M", name: "Classic Tee · Black M", warehouse: "LA-01", onHand: 420, reserved: 38, status: "Healthy" },
	{ id: "2", sku: "MUG-WHT", name: "Ceramic Mug", warehouse: "LA-01", onHand: 64, reserved: 12, status: "Low" },
	{ id: "3", sku: "HOOD-GRY-L", name: "Fleece Hoodie · Grey L", warehouse: "NY-02", onHand: 0, reserved: 0, status: "Out" },
	{ id: "4", sku: "CAP-NVY", name: "Dad Cap · Navy", warehouse: "NY-02", onHand: 210, reserved: 15, status: "Healthy" },
	{ id: "5", sku: "TOTE-NAT", name: "Canvas Tote", warehouse: "EU-03", onHand: 88, reserved: 22, status: "Low" },
];

const COLUMNS = [
	{ id: "sku", label: "SKU" },
	{ id: "name", label: "Item" },
	{ id: "warehouse", label: "Warehouse" },
	{ id: "onHand", label: "On hand" },
	{ id: "reserved", label: "Reserved" },
	{ id: "status", label: "Status", type: "badge" },
];

export default function Inventory() {
	return (
		<EcommerceOpsList
			title="Inventory"
			description="Stock levels across warehouses — reserved vs on-hand for ecommerce SKUs."
			columns={COLUMNS}
			seed={SEED}
			searchKeys={["sku", "name", "warehouse", "status"]}
			primaryActionLabel="Adjust stock"
		/>
	);
}
