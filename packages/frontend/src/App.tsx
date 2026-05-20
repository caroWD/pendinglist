import { Button } from '@/components/ui/button'
import { DarkModeProvider } from './contexts/DarkModeProvider'
import { DarkModeToggle } from './components/globals/DarkModeToggle'

function App() {
  return (
    <DarkModeProvider defaultDarkMode="dark" storageKey="dark-mode">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
        <DarkModeToggle />
      </div>
    </DarkModeProvider>
  )
}

export default App
