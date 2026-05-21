import { useContext } from 'react'
import { DarkModeProviderContext } from './DarkModeProviderContext'

export const useDarkMode = () => {
  const context = useContext(DarkModeProviderContext)

  if (context === undefined)
    throw new Error('useDarkMode must be used within a DarkModeProvider')

  return context
}
