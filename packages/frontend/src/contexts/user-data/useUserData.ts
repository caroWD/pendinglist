import { useContext } from 'react'
import { UserDataProviderContext } from './UserDataProviderContext'

export const useUserData = () => {
  const context = useContext(UserDataProviderContext)

  if (context === undefined)
    throw new Error('useUserData must be used within a UserDataProvider')

  return context
}
