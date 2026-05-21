import { createContext } from 'react'

export type DarkMode = 'dark' | 'light' | 'system'

export type DarkModeProviderState = {
  darkMode: DarkMode
  setDarkMode: (darkMode: DarkMode) => void
}

const initialState: DarkModeProviderState = {
  darkMode: 'system',
  setDarkMode: () => null,
}

export const DarkModeProviderContext =
  createContext<DarkModeProviderState>(initialState)
