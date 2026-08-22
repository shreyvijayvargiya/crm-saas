# SaaSCRM auth docs

SaaSCRM includes Login, Signup, Forgot password, and Change password screens at https://saascrm.site/login, https://saascrm.site/signup, https://saascrm.site/forgot-password, and https://saascrm.site/change-password. In the demo they validate on the client and toast that you should wire a real auth provider. They do not create hosted sessions on saascrm.site.

## Recommended integration

1. Keep the existing `AuthPageShell` UI from `app/Authentication/`.
2. Replace the toast handlers with your provider (Auth.js, Clerk, Supabase Auth, Firebase Auth, or a custom JWT service).
3. Issue API keys for server-to-server access as documented in the [SaaSCRM API docs](https://saascrm.site/docs/api.md).
4. Send `Authorization: Bearer <token>` on CRM API calls after the user signs in.

## Roles and teams

The template includes Teams, Users, and Roles screens (https://saascrm.site/teams, https://saascrm.site/users, https://saascrm.site/roles) so you can map IdP groups onto CRM permissions. Audit events belong on https://saascrm.site/audit-log once your backend records them.

## Secrets

Never commit live credentials. `/api-keys` is a UI demo. Store production secrets in your host's environment, not in the Next.js bundle.
