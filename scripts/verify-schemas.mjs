import fs from "fs";

import { AppLeadsDataSchema } from "../schemas/zod-schemas/leads.js";
import { CrmRecordDetailDataSchema } from "../schemas/zod-schemas/crm-record-detail.js";
import { AppCompaniesDataSchema } from "../schemas/zod-schemas/companies.js";
import { AppContactsDataSchema } from "../schemas/zod-schemas/contacts.js";
import { AppInvoicesDataSchema, AppPaymentsDataSchema } from "../schemas/zod-schemas/finance.js";
import { AppDealsDataSchema, AppPipelinesDataSchema } from "../schemas/zod-schemas/deals-pipelines.js";
import { AppAnalyticsDataSchema } from "../schemas/zod-schemas/analytics.js";
import {
	AppNotificationsDataSchema,
	AppTeamsDataSchema,
} from "../schemas/zod-schemas/notifications-teams.js";
import { AppTasksDataSchema } from "../schemas/zod-schemas/tasks.js";
import { AppHomeDataSchema, AppSalesDataSchema } from "../schemas/zod-schemas/home-sales.js";
import {
	AppCalendarDataSchema,
	AppEmailDataSchema,
} from "../schemas/zod-schemas/calendar-email.js";
import { AppProjectsDataSchema } from "../schemas/zod-schemas/projects.js";
import { AppSettingsDataSchema } from "../schemas/zod-schemas/settings.js";
import {
	AppIntegrationsDataSchema,
	AppApiKeysDataSchema,
	AppWebhooksDataSchema,
} from "../schemas/zod-schemas/integrations-api.js";
import { AppCmsDataSchema } from "../schemas/zod-schemas/cms.js";
import { AppEcommerceDataSchema } from "../schemas/zod-schemas/ecommerce.js";
import { AppMarketingDataSchema } from "../schemas/zod-schemas/marketing.js";
import { AppSubscriptionsDataSchema } from "../schemas/zod-schemas/subscriptions.js";
import {
	AppApiLogsDataSchema,
	AppSupportDataSchema,
	AppUsersDataSchema,
	AppRolesDataSchema,
	AppAuditLogDataSchema,
	AppHelpDataSchema,
	AppReportsDataSchema,
	AppActivityDataSchema,
} from "../schemas/zod-schemas/platform.js";
import { AppFilesDataSchema } from "../schemas/zod-schemas/files.js";

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
	appEcommerce: AppEcommerceDataSchema,
	appMarketing: AppMarketingDataSchema,
	appSubscriptions: AppSubscriptionsDataSchema,
	appApiLogs: AppApiLogsDataSchema,
	appSupport: AppSupportDataSchema,
	appUsers: AppUsersDataSchema,
	appRoles: AppRolesDataSchema,
	appAuditLog: AppAuditLogDataSchema,
	appHelp: AppHelpDataSchema,
	appReports: AppReportsDataSchema,
	appActivity: AppActivityDataSchema,
	appFiles: AppFilesDataSchema,
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
