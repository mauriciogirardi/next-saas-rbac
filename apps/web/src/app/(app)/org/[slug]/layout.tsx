import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] space-y-4 px-4">
        <Tabs />
        {children}
      </main>
    </div>
  )
}
