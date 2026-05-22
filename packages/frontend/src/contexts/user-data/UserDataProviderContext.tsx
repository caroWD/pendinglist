import { createContext } from 'react'

export type User = {
  id: string
  handle: string
  firstName: string
  lastName: string
  fullName: string
  emial: string
  avatar: string | null
  roleId: string
  roleName: string
  archived: boolean
  createdAt: string
  updatedAt: string
}

export type UserData = User | null

export type Token = string | null

type TokenState = {
  token: Token
  setToken: (token: Token) => void
}

type UserDataState = {
  userData: UserData
  setUserData: (user: UserData) => void
}

export type UserDataProviderState = {
  token: TokenState
  userData: UserDataState
}

const initialState: UserDataProviderState = {
  token: {
    token: null,
    setToken: () => null,
  },
  userData: {
    userData: null,
    setUserData: () => null,
  },
}

export const UserDataProviderContext =
  createContext<UserDataProviderState>(initialState)
