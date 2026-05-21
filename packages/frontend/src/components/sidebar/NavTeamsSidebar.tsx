import type { ReactNode } from 'react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar'
import { EmptyWorkspaceSidebar } from './EmptyWorkspaceSidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { IconChevronRight, IconPlus } from '@tabler/icons-react'

type NavTeamPage = {
  key: number
  name: string
  url: string
  emoji: ReactNode
}

export type NavTeamItem = {
  key: number
  name: string
  emoji: ReactNode
  pages: NavTeamPage[]
}

interface NavTeamsSidebarProps {
  teams: NavTeamItem[]
}

export const NavTeamsSidebar = ({ teams }: NavTeamsSidebarProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Equipos</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {!teams.length ? (
            <EmptyWorkspaceSidebar option="equipo" />
          ) : (
            teams.map((team) => (
              <Collapsible key={team.key}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <span>{team.emoji}</span>
                      <span>{team.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction
                      className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                      showOnHover
                    >
                      <IconChevronRight />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <SidebarMenuAction showOnHover>
                    <IconPlus />
                  </SidebarMenuAction>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {team.pages.map((page) => (
                        <SidebarMenuSubItem key={page.key}>
                          <SidebarMenuSubButton asChild>
                            <a href="#">
                              <span>{page.emoji}</span>
                              <span>{page.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
