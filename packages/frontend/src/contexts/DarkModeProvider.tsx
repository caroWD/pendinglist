import { useEffect, useState, type ReactNode } from 'react'
import {
  DarkModeProviderContext,
  type DarkMode,
  type DarkModeProviderState,
} from './DarkModeProviderContext'

interface DarkModeProviderProps {
  children: ReactNode
  defaultDarkMode?: DarkMode
  storageKey?: string
}

export const DarkModeProvider = ({
  children,
  defaultDarkMode = 'system',
  storageKey = 'dark-mode',
  ...props
}: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState<DarkMode>(
    () => (localStorage.getItem(storageKey) as DarkMode) || defaultDarkMode
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (darkMode === 'system') {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemDarkMode)

      return
    }

    root.classList.add(darkMode)
  }, [darkMode])

  const value: DarkModeProviderState = {
    darkMode,
    setDarkMode: (darkMode: DarkMode) => {
      localStorage.setItem(storageKey, darkMode)
      setDarkMode(darkMode)
    },
  }

  return (
    <DarkModeProviderContext.Provider {...props} value={value}>
      {children}
    </DarkModeProviderContext.Provider>
  )
}
