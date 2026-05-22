import { IconStack3, IconUserOff } from '@tabler/icons-react'
import { NavLink, useNavigate } from 'react-router'
import { DarkModeToggle } from '../globals/DarkModeToggle'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { Button } from '../ui/button'

export const UserNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex gap-6 justify-between">
          <NavLink
            to="/"
            className="flex items-center gap-2 self-center font-bold"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <IconStack3 className="size-4" />
            </div>
            PendingList
          </NavLink>
          <DarkModeToggle />
        </div>
        <Empty className="dark:bg-stone-900 bg-white border border-solid">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconUserOff />
            </EmptyMedia>
            <EmptyTitle>Usuario no autorizado</EmptyTitle>
            <EmptyDescription>
              Aún no has iniciado sesión. Empieza creando tu cuenta o inicia
              sesión.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button onClick={() => navigate('/auth', { viewTransition: true })}>
              Iniciar sesión
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                navigate('/auth/register', { viewTransition: true })
              }
            >
              Crear cuenta
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  )
}
