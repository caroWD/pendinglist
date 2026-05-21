import { createContext } from 'react'

export type UserDto = {
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

export type UserData = UserDto | null

export type UserDataProviderState = {
  userData: UserData
  setUserData: (userData: UserData) => void
}

const initialState: UserDataProviderState = {
  userData: null,
  setUserData: () => null,
}

export const UserDataProviderContext =
  createContext<UserDataProviderState>(initialState)
