import { useFetch } from '@/hooks/use-fetch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'
import { EmptyWorkspaceSidebar } from './EmptyWorkspaceSidebar'
import {
  IconDots,
  IconStarOff,
  IconLink,
  IconArrowUpRight,
  IconTrash,
} from '@tabler/icons-react'

type Board = {
  id: string
  name: string
  description: string
  archived: boolean
  createdAt: string
  updatedAt: string
}

export type NavBoardItem = {
  name: string
  url: string
  emoji: string
}

interface NavBoardsSidebarProps {
  userId: string
}

export const NavBoardsSidebar = ({ userId }: NavBoardsSidebarProps) => {
  const { isMobile } = useSidebar()

  const { result } = useFetch<Board[]>(
    `${import.meta.env.VITE_API_URL_BASE}/user/${userId}/boards`
  )

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tableros</SidebarGroupLabel>
      <SidebarMenu>
        {!result || !result.length ? (
          <EmptyWorkspaceSidebar option="tablero" />
        ) : (
          result.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <a href={item.id} title={item.name}>
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DropdownMenuItem>
                    <IconStarOff className="text-muted-foreground" />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <IconLink className="text-muted-foreground" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconArrowUpRight className="text-muted-foreground" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <IconTrash className="text-muted-foreground" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
