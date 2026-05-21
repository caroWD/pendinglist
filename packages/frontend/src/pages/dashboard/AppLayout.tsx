import { UserNotFound } from '@/components/auth/UserNotFound'
import { useUserData } from '@/contexts/user-data/useUserData'

export const AppLayout = () => {
  const { userData } = useUserData()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {!userData ? <UserNotFound /> : <p>{JSON.stringify(userData)}</p>}
    </div>
  )
}
