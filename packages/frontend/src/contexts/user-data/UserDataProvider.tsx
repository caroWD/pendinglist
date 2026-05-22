import { jwtVerify } from 'jose'
import { useEffect, useState, type ReactNode } from 'react'
import {
  type User,
  UserDataProviderContext,
  type UserData,
  type UserDataProviderState,
  type Token,
} from './UserDataProviderContext'
import { fetchData } from '@/lib/fetchUtils'

interface UserDataProviderProps {
  children: ReactNode
  defaultToken: Token
  defaultUserData: UserData
  storageKey?: string
}

export const UserDataProvider = ({
  children,
  defaultToken = null,
  defaultUserData = null,
  storageKey = 'user-data',
  ...props
}: UserDataProviderProps) => {
  const [token, setToken] = useState<Token>(defaultToken)

  const [userData, setUserData] = useState<UserData>(() => {
    const data = localStorage.getItem(storageKey)
    if (!data) return defaultUserData

    return JSON.parse(data) as User
  })

  useEffect(() => {
    const getUserData = async () => {
      if (!token) return

      try {
        const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET)

        const { payload } = await jwtVerify(token, secret, {
          issuer: import.meta.env.VITE_JWT_ISSUER,
          audience: import.meta.env.VITE_JWT_AUDIENCE,
        })

        const id = payload['id'] as string

        const data = await fetchData<User, null>(
          `http://localhost:8765/api/v1/user/${id}`
        )

        localStorage.setItem(storageKey, JSON.stringify(data))

        setUserData(data)
      } catch (error) {
        console.log(error)

        setUserData(null)
      }
    }

    getUserData()
  }, [token])

  const value: UserDataProviderState = {
    token: {
      token,
      setToken: (token: Token) => {
        setToken(token)
      },
    },
    userData: {
      userData,
      setUserData: (userData: UserData) => {
        localStorage.setItem(storageKey, JSON.stringify(userData))
        setUserData(userData)
      },
    },
  }

  return (
    <UserDataProviderContext.Provider {...props} value={value}>
      {children}
    </UserDataProviderContext.Provider>
  )
}
