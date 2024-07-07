import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1280px] space-y-4 px-4">
        <p className="text-sm text-muted-foreground">Select an organization.</p>
      </main>
    </div>
  )
}
