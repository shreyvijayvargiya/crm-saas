/**
 * CRM Vertical AST schema (for humans + AI agents)
 * ================================================
 * Put one JSON file per vertical in this folder, then register it in `index.js`.
 *
 * Agents can construct more verticals by copying an existing AST and editing:
 * - meta (card copy on /demo)
 * - sidebar (what the admin shell shows)
 * - pages[] (nested page tree: route, blocks, columns, entities)
 * - entities (field schemas + seed hints)
 *
 * kind must stay: "saas-crm-vertical"
 * version: bump when breaking the shape
 *
 * Block types (closed catalog — extend renderer before inventing new ones):
 *   stats | toolbar | table | chart | kanban | recordTabs | billingPanel | connectBanner
 */

export const CRM_VERTICAL_AST_KIND = "saas-crm-vertical";
export const CRM_VERTICAL_AST_VERSION = 1;

export const CRM_BLOCK_TYPES = [
	"stats",
	"toolbar",
	"table",
	"chart",
	"kanban",
	"recordTabs",
	"billingPanel",
	"connectBanner",
];
