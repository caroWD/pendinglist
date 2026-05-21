import { DarkModeProvider } from '@/contexts/dark-mode/DarkModeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router'
import { UserDataProvider } from './contexts/user-data/UserDataProvider'

function App() {
  return (
    <DarkModeProvider defaultDarkMode="dark" storageKey="dark-mode">
      <UserDataProvider defaultUserData={null}>
        <TooltipProvider>
          <Outlet />
          <Toaster />
        </TooltipProvider>
      </UserDataProvider>
    </DarkModeProvider>
  )
}

export default App
