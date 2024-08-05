import { Header } from '@/components/header'

import { OrganizationForm } from '../org/organization-form'

export default function CreateOrganization() {
  return (
    <div className="animate-opacity py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1280px] space-y-4 px-4">
        <h1 className="text-2xl font-bold">Create Organization</h1>
        <OrganizationForm />
      </main>
    </div>
  )
}
