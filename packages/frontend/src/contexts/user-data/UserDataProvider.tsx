import { useState, type ReactNode } from 'react'
import {
  UserDataProviderContext,
  type UserData,
  type UserDataProviderState,
} from './UserDataProviderContext'

interface UserDataProviderProps {
  children: ReactNode
  defaultUserData: UserData
}

export const UserDataProvider = ({
  children,
  defaultUserData = null,
  ...props
}: UserDataProviderProps) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData)

  const value: UserDataProviderState = {
    userData,
    setUserData: (userData: UserData) => {
      setUserData(userData)
    },
  }

  return (
    <UserDataProviderContext.Provider {...props} value={value}>
      {children}
    </UserDataProviderContext.Provider>
  )
}
