import { IconStack3 } from '@tabler/icons-react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { NavLink } from 'react-router'
import type { ComponentProps } from 'react'

export const BrandSidebar = ({
  ...props
}: ComponentProps<typeof SidebarMenu>) => {
  return (
    <SidebarMenu {...props}>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <NavLink to="/" viewTransition>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <IconStack3 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold">PendingList</span>
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
