import { useLoaderData } from 'react-router-dom'
import Blog from './pages/Blog'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { getPost, getPosts } from './api/post'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getUserInfo } from './api/user'
import { ViewPost } from './pages/ViewPost'

export const routes = [
  {
    path: '/',
    loader: async () => {
      const queryClient = new QueryClient()
      const author = ''
      const sortBy = 'createdAt'
      const sortOrder = 'descending'

      const posts = await getPosts({ author, sortBy, sortOrder })

      await queryClient.prefetchQuery({
        queryKey: ['post', { author, sortBy, sortOrder }],
        queryFn: () => posts,
      })
      const uniqueAuthors = posts
        .map((p) => p.author)
        .filter((v, i, a) => a.indexOf(v) === i)

      for (const userId of uniqueAuthors) {
        await queryClient.prefetchQuery({
          queryKey: ['users', userId],
          queryFn: () => getUserInfo(userId),
        })
      }

      return dehydrate(queryClient)
    },
    Component() {
      const dehydratedState = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <Blog />
        </HydrationBoundary>
      )
    },
  },
  {
    path: '/posts/:id/:slug?',
    loader: async ({ params }: { params: { id: string } }) => {
      const queryClient = new QueryClient()
      const post = await getPost(params.id)

      await queryClient.prefetchQuery({
        queryKey: ['post', params.id],
        queryFn: () => post,
      })

      if (post.author) {
        await queryClient.prefetchQuery({
          queryKey: ['author', post.author],
          queryFn: () => getUserInfo(post.author),
        })
      }

      return { dehydratedState: dehydrate(queryClient), id: params.id }
    },
    Component() {
      const { dehydratedState, id } = useLoaderData()

      return (
        <HydrationBoundary state={dehydratedState}>
          <ViewPost id={id} />
        </HydrationBoundary>
      )
    },
  },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
]
