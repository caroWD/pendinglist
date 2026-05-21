import { createBrowserRouter } from 'react-router'
import App from '@/App'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { Welcome } from '@/components/auth/Welcome'
import { AuthLayout } from '@/pages/auth/AuthLayout'
import { AppLayout } from '@/pages/dashboard/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: AppLayout },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          { index: true, Component: LoginForm },
          { path: 'register', Component: SignUpForm },
          { path: 'welcome', Component: Welcome },
        ],
      },
    ],
  },
])
