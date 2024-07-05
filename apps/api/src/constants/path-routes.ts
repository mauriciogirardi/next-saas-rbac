// AUTHORIZATIONS PATHS
export const PATH_SESSIONS_PASSWORD = '/sessions/password'
export const PATH_SESSIONS_GITHUB = '/sessions/github'
export const PATH_USERS = '/users'
export const PATH_PROFILE = '/profile'
export const PATH_PASSWORD_RECOVER = '/password/recover'
export const PATH_PASSWORD_RESET = '/password/reset'
export const PATH_DOCS = '/docs'

// ORGANIZATIONS PATHS
export const PATH_ORGANIZATION = '/organization'
export const PATH_ORGANIZATIONS = '/organizations'
export const PATH_ORGANIZATIONS_SLUG_OWNER = '/organizations/:slug/owner'
export const PATH_ORGANIZATIONS_SLUG = '/organizations/:slug'

// BILLING PATHS
export const PATH_ORGANIZATIONS_SLUG_BILLING = '/organizations/:slug/billing'

// PROJECTS PATHS
export const PATH_ORGANIZATIONS_SLUG_PROJECTS = '/organizations/:slug/projects'
export const PATH_ORGANIZATIONS_SLUG_PROJECTS_PROJECT_ID =
  '/organizations/:slug/projects/:projectId'
export const PATH_ORGANIZATIONS_ORGS_SLUG_PROJECTS_PROJECTS_SLUG =
  '/organizations/:orgSlug/projects/:projectSlug'

// MEMBERS PATHS
export const PATH_ORGANIZATIONS_SLUG_MEMBERS = '/organizations/:slug/members'
export const PATH_ORGANIZATION_SLUG_MEMBERSHIP =
  '/organizations/:slug/membership'
export const PATH_ORGANIZATIONS_SLUG_MEMBERS_MEMBER_ID =
  '/organizations/:slug/members/:memberId'

// INVITES PATHS
export const PATH_ORGANIZATIONS_SLUG_INVITES = '/organizations/:slug/invites'
export const PATH_ORGANIZATIONS_SLUG_INVITES_INVITE_ID =
  '/organizations/:slug/invites/:inviteId'
export const PATH_INVITES_INVITE_ID = '/invites/:inviteId'
export const PATH_INVITES_INVITE_ID_ACCEPT = '/invites/:inviteId/accept'
export const PATH_INVITES_INVITE_ID_REJECT = '/invites/:inviteId/reject'
export const PATH_PENDING_INVITES = '/pending-invites'
