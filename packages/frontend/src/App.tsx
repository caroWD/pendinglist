import { DarkModeProvider } from '@/contexts/dark-mode/DarkModeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { RouterProvider } from 'react-router'
import { UserDataProvider } from './contexts/user-data/UserDataProvider'
import { router } from './routers/router'

function App() {
  return (
    <DarkModeProvider defaultDarkMode="dark" storageKey="dark-mode">
      <UserDataProvider
        defaultToken={null}
        defaultUserData={null}
        storageKey="user-data"
      >
        <TooltipProvider>
          <RouterProvider router={router} />
          <Toaster />
        </TooltipProvider>
      </UserDataProvider>
    </DarkModeProvider>
  )
}

export default App
