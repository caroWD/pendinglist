import App from '@/App'
import { LoginForm } from '@/components/auth/LoginForm'
import { AuthLayout } from '@/pages/auth/AuthLayout'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: null },
      {
        path: '/login',
        Component: AuthLayout,
        children: [{ index: true, Component: LoginForm }],
      },
    ],
  },
])
