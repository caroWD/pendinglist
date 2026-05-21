import { DarkModeProvider } from '@/contexts/DarkModeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router'

function App() {
  return (
    <DarkModeProvider defaultDarkMode="dark" storageKey="dark-mode">
      <TooltipProvider>
        <Outlet />
        <Toaster />
      </TooltipProvider>
    </DarkModeProvider>
  )
}

export default App
