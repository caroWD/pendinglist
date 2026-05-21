import { Button } from '@/components/ui/button'
import { useUserData } from '@/contexts/user-data/useUserData'
import { useNavigate } from 'react-router'

export const AppLayout = () => {
  const { userData } = useUserData()

  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {!userData ? (
        <Button onClick={() => navigate('/auth', { viewTransition: true })}>
          Iniciar sesión
        </Button>
      ) : (
        <p>{JSON.stringify(userData)}</p>
      )}
    </div>
  )
}
