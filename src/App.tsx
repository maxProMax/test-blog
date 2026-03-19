import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import Blog from './Blog'

const queryClient = new QueryClient()

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  )
}
