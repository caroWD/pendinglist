import type { Icon } from '@tabler/icons-react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { NavLink } from 'react-router'

export type NavMainSidebarItem = {
  key: number
  title: string
  url: string
  icon: Icon
  badge?: string
  isActive?: boolean
}

interface NavMainSidebarProps {
  navMain: NavMainSidebarItem[]
}

export const NavMainSidebar = ({ navMain }: NavMainSidebarProps) => {
  return (
    <SidebarMenu className="gap-1">
      {navMain.map((item) => (
        <SidebarMenuItem key={item.key}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <NavLink to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
