import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { AuthContextProvider } from './contexts/AuthContext'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
