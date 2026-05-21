import type { Icon } from '@tabler/icons-react'
import type { ComponentPropsWithoutRef } from 'react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

export type NavSecondaryItem = {
  title: string
  url: string
  icon: Icon
}

interface NavSecondarySidebarProps {
  navSecondary: NavSecondaryItem[]
}

export const NavSecondarySidebar = ({
  navSecondary,
  ...props
}: NavSecondarySidebarProps &
  ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
