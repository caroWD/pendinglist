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
  IconSparkle,
  IconLifebuoy,
  IconSend,
} from '@tabler/icons-react'
import { NavUserSidebar, type NavUserItem } from './NavUserSidebar'
import { NavBoardsSidebar, type NavBoardItem } from './NavBoardsSidebar'
import { NavTeamsSidebar, type NavTeamItem } from './NavTeamsSidebar'
import {
  NavSecondarySidebar,
  type NavSecondaryItem,
} from './NavSecondarySidebar'

type AppSidebarData = {
  navMain: NavMainSidebarItem[]
  user: NavUserItem
  boards: NavBoardItem[]
  teams: NavTeamItem[]
  navSecondary: NavSecondaryItem[]
}

const data: AppSidebarData = {
  navMain: [
    {
      key: 1,
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
    {
      key: 2,
      title: 'Ask AI',
      url: '#',
      icon: IconSparkle,
    },
    {
      key: 3,
      title: 'Home',
      url: '#',
      icon: IconHome,
      isActive: true,
    },
    {
      key: 4,
      title: 'Inbox',
      url: '#',
      icon: IconInbox,
      badge: '10',
    },
  ],
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  boards: [
    {
      name: 'Project Management & Task Tracking',
      url: '#',
      emoji: '📊',
    },
    {
      name: 'Family Recipe Collection & Meal Planning',
      url: '#',
      emoji: '🍳',
    },
    {
      name: 'Fitness Tracker & Workout Routines',
      url: '#',
      emoji: '💪',
    },
    {
      name: 'Book Notes & Reading List',
      url: '#',
      emoji: '📚',
    },
    {
      name: 'Sustainable Gardening Tips & Plant Care',
      url: '#',
      emoji: '🌱',
    },
    {
      name: 'Language Learning Progress & Resources',
      url: '#',
      emoji: '🗣️',
    },
    {
      name: 'Home Renovation Ideas & Budget Tracker',
      url: '#',
      emoji: '🏠',
    },
    {
      name: 'Personal Finance & Investment Portfolio',
      url: '#',
      emoji: '💰',
    },
    {
      name: 'Movie & TV Show Watchlist with Reviews',
      url: '#',
      emoji: '🎬',
    },
    {
      name: 'Daily Habit Tracker & Goal Setting',
      url: '#',
      emoji: '✅',
    },
  ],
  teams: [
    {
      key: 1,
      name: 'Personal Life Management',
      emoji: '🏠',
      pages: [
        {
          key: 1,
          name: 'Daily Journal & Reflection',
          url: '#',
          emoji: '📔',
        },
        {
          key: 2,
          name: 'Health & Wellness Tracker',
          url: '#',
          emoji: '🍏',
        },
        {
          key: 3,
          name: 'Personal Growth & Learning Goals',
          url: '#',
          emoji: '🌟',
        },
      ],
    },
    {
      key: 2,
      name: 'Professional Development',
      emoji: '💼',
      pages: [
        {
          key: 1,
          name: 'Career Objectives & Milestones',
          url: '#',
          emoji: '🎯',
        },
        {
          key: 2,
          name: 'Skill Acquisition & Training Log',
          url: '#',
          emoji: '🧠',
        },
        {
          key: 3,
          name: 'Networking Contacts & Events',
          url: '#',
          emoji: '🤝',
        },
      ],
    },
    {
      key: 3,
      name: 'Creative Projects',
      emoji: '🎨',
      pages: [
        {
          key: 1,
          name: 'Writing Ideas & Story Outlines',
          url: '#',
          emoji: '✍️',
        },
        {
          key: 2,
          name: 'Art & Design Portfolio',
          url: '#',
          emoji: '🖼️',
        },
        {
          key: 3,
          name: 'Music Composition & Practice Log',
          url: '#',
          emoji: '🎵',
        },
      ],
    },
    {
      key: 4,
      name: 'Home Management',
      emoji: '🏡',
      pages: [
        {
          key: 1,
          name: 'Household Budget & Expense Tracking',
          url: '#',
          emoji: '💰',
        },
        {
          key: 2,
          name: 'Home Maintenance Schedule & Tasks',
          url: '#',
          emoji: '🔧',
        },
        {
          key: 3,
          name: 'Family Calendar & Event Planning',
          url: '#',
          emoji: '📅',
        },
      ],
    },
    {
      key: 5,
      name: 'Travel & Adventure',
      emoji: '🧳',
      pages: [
        {
          key: 1,
          name: 'Trip Planning & Itineraries',
          url: '#',
          emoji: '🗺️',
        },
        {
          key: 2,
          name: 'Travel Bucket List & Inspiration',
          url: '#',
          emoji: '🌎',
        },
        {
          key: 3,
          name: 'Travel Journal & Photo Gallery',
          url: '#',
          emoji: '📸',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: IconLifebuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: IconSend,
    },
  ],
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader>
        <BrandSidebar />
        <NavMainSidebar navMain={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavBoardsSidebar boards={data.boards} />
        <NavTeamsSidebar teams={data.teams} />
        <NavSecondarySidebar
          navSecondary={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUserSidebar user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
