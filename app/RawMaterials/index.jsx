import React from "react";
import EcommerceOpsList from "../EcommerceOpsList";

const SEED = [
	{ id: "1", name: "Organic cotton rolls", supplier: "Textile Co", unit: "m", qty: 2400, reorderAt: 500, status: "OK" },
	{ id: "2", name: "Ceramic glaze · Matte white", supplier: "Kiln Supply", unit: "kg", qty: 85, reorderAt: 100, status: "Reorder" },
	{ id: "3", name: "Metal zipper #5", supplier: "Fasteners Inc", unit: "pcs", qty: 12000, reorderAt: 2000, status: "OK" },
	{ id: "4", name: "Corrugated mailers M", supplier: "PackRight", unit: "pcs", qty: 640, reorderAt: 800, status: "Reorder" },
	{ id: "5", name: "Soy ink · Black", supplier: "PrintLab", unit: "L", qty: 42, reorderAt: 20, status: "OK" },
];

const COLUMNS = [
	{ id: "name", label: "Material" },
	{ id: "supplier", label: "Supplier" },
	{ id: "unit", label: "Unit" },
	{ id: "qty", label: "Qty" },
	{ id: "reorderAt", label: "Reorder at" },
	{ id: "status", label: "Status", type: "badge" },
];

export default function RawMaterials() {
	return (
		<EcommerceOpsList
			title="Raw materials"
			description="BOM inputs and packaging supplies for manufacturing and fulfillment."
			columns={COLUMNS}
			seed={SEED}
			searchKeys={["name", "supplier", "status"]}
			primaryActionLabel="Add material"
		/>
	);
}
