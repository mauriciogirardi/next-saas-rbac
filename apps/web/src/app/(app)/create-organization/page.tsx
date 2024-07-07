import { Header } from '@/components/header'

import { OrganizationForm } from './organization-form'

export default function CreateOrganization() {
  return (
    <div className="py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1280px] space-y-4 px-4">
        <h1 className="text-2xl font-bold">Create Organization</h1>
        <OrganizationForm />
      </main>
    </div>
  )
}
