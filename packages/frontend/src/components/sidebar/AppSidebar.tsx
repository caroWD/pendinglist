import type { ComponentProps } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '../ui/sidebar'
import { BrandSidebar } from './BrandSidebar'
import { NavMainSidebar, type NavMainSidebarItem } from './NavMainSidebar'
import {
  IconHome,
  IconInbox,
  IconSearch,
  IconLifebuoy,
  IconSend,
} from '@tabler/icons-react'
import { NavUserSidebar } from './NavUserSidebar'
import { NavBoardsSidebar } from './NavBoardsSidebar'
import { NavTeamsSidebar } from './NavTeamsSidebar'
import {
  NavSecondarySidebar,
  type NavSecondaryItem,
} from './NavSecondarySidebar'
import { useUserData } from '@/contexts/user-data/useUserData'

type AppSidebarData = {
  navMain: NavMainSidebarItem[]
  navSecondary: NavSecondaryItem[]
}

const data: AppSidebarData = {
  navMain: [
    {
      key: 1,
      title: 'Buscar',
      url: '#',
      icon: IconSearch,
    },
    {
      key: 2,
      title: 'Inicio',
      url: '#',
      icon: IconHome,
      isActive: true,
    },
    {
      key: 3,
      title: 'Bandeja de entrada',
      url: '#',
      icon: IconInbox,
      badge: '10',
    },
  ],
  navSecondary: [
    {
      key: 1,
      title: 'Support',
      url: '#',
      icon: IconLifebuoy,
    },
    {
      key: 2,
      title: 'Feedback',
      url: '#',
      icon: IconSend,
    },
  ],
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const {
    userData: { userData },
  } = useUserData()

  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader>
        <BrandSidebar />
        <NavMainSidebar navMain={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavBoardsSidebar userId={!userData ? 'null' : userData.id} />
        <NavTeamsSidebar userId={!userData ? 'null' : userData.id} />
        <NavSecondarySidebar
          navSecondary={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUserSidebar />
      </SidebarFooter>
    </Sidebar>
  )
}
