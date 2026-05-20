import { DarkModeToggle } from '@/components/globals/DarkModeToggle'
import { IconStack3 } from '@tabler/icons-react'
import { NavLink, Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
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
        <Outlet />
      </div>
    </div>
  )
}
