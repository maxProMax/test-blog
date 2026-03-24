import { useQuery } from '@tanstack/react-query'
import { getPost } from '../api/post'
import { Header } from '../components/Header'
import { Link } from 'react-router-dom'
import { Post } from '../components/Post'
import { Helmet } from 'react-helmet-async'
import { getUserInfo } from '../api/user'

export function ViewPost({ id }: { id: string }) {
  const query = useQuery({ queryKey: ['post', id], queryFn: () => getPost(id) })
  const post = query.data
  const { data: userInfo } = useQuery({
    queryKey: ['users', post?.author],
    queryFn: () => getUserInfo(post?.author),
    enabled: Boolean(post?.author),
  })

  return (
    <>
      <Helmet>
        <title>{post?.title}</title>
        <meta name='description' content={post?.contents} />
        <meta property='org:type' content='article' />
        <meta property='org:title' content={post?.title} />
        <meta
          property='org:article:published_time'
          content={post?.createdAt.toString()}
        />
        <meta
          property='org:article:modified_time'
          content={post?.updatedAt.toString()}
        />
        <meta property='org:author' content={userInfo?.username} />
        {post?.tags?.map((tag) => (
          <meta key={tag} property='org:article:tag' content={tag} />
        ))}
      </Helmet>
      <div>
        <Header />
        <hr />
        <Link to={`/`}>Back to main</Link>
        <hr />
        {post ? <Post {...post} fullPost /> : 'not found'}
      </div>
    </>
  )
}
