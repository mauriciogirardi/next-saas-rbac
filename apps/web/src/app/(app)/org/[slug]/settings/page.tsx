import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { OrganizationForm } from '../../organization-form'
import { Billing } from './billing'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export default async function SettingsPage() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')
  const { organization } = await getOrganization(currentOrg!)

  return (
    <div className="animate-opacity space-y-4">
      {canUpdateOrganization && (
        <Card>
          <CardHeader>
            <CardTitle>Organization settings</CardTitle>
            <CardDescription>Update your organization details</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationForm
              isUpdating
              initialData={{
                name: organization.name,
                domain: organization.domain,
                shouldAttachUsersByDomain:
                  organization.shouldAttachUsersByDomain,
              }}
            />
          </CardContent>
        </Card>
      )}

      {canGetBilling && <Billing />}

      {canShutdownOrganization && (
        <Card>
          <CardHeader>
            <CardTitle>Shutdown organization</CardTitle>
            <CardDescription>
              This will all organization data including, all projects you cannot
              undo this action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShutdownOrganizationButton />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
