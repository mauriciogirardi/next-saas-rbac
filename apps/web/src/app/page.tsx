import { auth } from '@/auth/auth'

export default async function Home() {
  const { user } = await auth()

  return (
    <div>
      <p>Home</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
