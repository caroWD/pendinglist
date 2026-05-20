import { Button } from '@/components/ui/button'
import { DarkModeProvider } from './contexts/DarkModeProvider'
import { DarkModeToggle } from './components/globals/DarkModeToggle'
import { TooltipProvider } from './components/ui/tooltip'

function App() {
  return (
    <DarkModeProvider defaultDarkMode="dark" storageKey="dark-mode">
      <TooltipProvider>
        <div className="flex min-h-svh flex-col items-center justify-center">
          <Button>Click me</Button>
          <DarkModeToggle />
        </div>
      </TooltipProvider>
    </DarkModeProvider>
  )
}

export default App
