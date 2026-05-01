import fs from "fs";

import { AppLeadsDataSchema } from "../schemas/leads.js";
import { CrmRecordDetailDataSchema } from "../schemas/crm-record-detail.js";
import { AppCompaniesDataSchema } from "../schemas/companies.js";
import { AppContactsDataSchema } from "../schemas/contacts.js";
import { AppInvoicesDataSchema, AppPaymentsDataSchema } from "../schemas/finance.js";
import { AppDealsDataSchema, AppPipelinesDataSchema } from "../schemas/deals-pipelines.js";
import { AppAnalyticsDataSchema } from "../schemas/analytics.js";
import {
	AppNotificationsDataSchema,
	AppTeamsDataSchema,
} from "../schemas/notifications-teams.js";
import { AppTasksDataSchema } from "../schemas/tasks.js";
import { AppHomeDataSchema, AppSalesDataSchema } from "../schemas/home-sales.js";
import {
	AppCalendarDataSchema,
	AppEmailDataSchema,
} from "../schemas/calendar-email.js";
import { AppProjectsDataSchema } from "../schemas/projects.js";
import { AppSettingsDataSchema } from "../schemas/settings.js";
import {
	AppIntegrationsDataSchema,
	AppApiKeysDataSchema,
	AppWebhooksDataSchema,
} from "../schemas/integrations-api.js";
import { AppCmsDataSchema } from "../schemas/cms.js";

const dataPath = new URL("../data.json", import.meta.url);
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

/** Every `data.json` section key prefixed with `app` must have an entry here. */
const SCHEMA_BY_SECTION = {
	appLeads: AppLeadsDataSchema,
	appCrmRecordDetail: CrmRecordDetailDataSchema,
	appCompanies: AppCompaniesDataSchema,
	appContacts: AppContactsDataSchema,
	appInvoices: AppInvoicesDataSchema,
	appDeals: AppDealsDataSchema,
	appPipelines: AppPipelinesDataSchema,
	appAnalytics: AppAnalyticsDataSchema,
	appNotifications: AppNotificationsDataSchema,
	appTeams: AppTeamsDataSchema,
	appTasks: AppTasksDataSchema,
	appHome: AppHomeDataSchema,
	appSales: AppSalesDataSchema,
	appCalendar: AppCalendarDataSchema,
	appEmail: AppEmailDataSchema,
	appProjects: AppProjectsDataSchema,
	appPayments: AppPaymentsDataSchema,
	appSettings: AppSettingsDataSchema,
	appIntegrations: AppIntegrationsDataSchema,
	appApiKeys: AppApiKeysDataSchema,
	appWebhooks: AppWebhooksDataSchema,
	appCms: AppCmsDataSchema,
};

const appKeys = Object.keys(data).filter((k) => k.startsWith("app"));
const mappedKeys = Object.keys(SCHEMA_BY_SECTION).sort();

const orphanKeys = mappedKeys.filter((k) => !appKeys.includes(k));
if (orphanKeys.length) {
	console.error("Schema map references missing data.json sections:", orphanKeys.join(", "));
	process.exit(1);
}

let failed = false;
for (const key of appKeys.sort()) {
	const schema = SCHEMA_BY_SECTION[key];
	if (!schema) {
		console.error("No Zod schema registered for:", key);
		failed = true;
		continue;
	}
	const r = schema.safeParse(data[key]);
	if (!r.success) {
		console.error("FAIL:", key);
		console.error(r.error.flatten());
		failed = true;
	} else {
		console.log("OK:", key);
	}
}

process.exit(failed ? 1 : 0);
