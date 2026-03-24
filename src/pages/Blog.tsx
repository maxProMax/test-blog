import { useState } from 'react'
import '../App.css'
import { PostList } from '../components/PostList'
import { CreatePost } from '../components/CreatePost'
import { PostFilter } from '../components/PostFilter'
import { PostSorting } from '../components/PostSorting'
import { useQuery } from '@tanstack/react-query'
import { getPosts, PostQuery } from '../api/post'
import { Header } from '../components/Header'
import { Helmet } from 'react-helmet-async'

export default function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState<PostQuery['sortBy']>('createdAt')
  const [sortOrder, setSortOrder] =
    useState<PostQuery['sortOrder']>('ascending')
  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })
  const posts = postsQuery.data ?? []

  return (
    <>
      <Helmet>
        <title>Blog</title>
        <meta name='description' content='some des' />
        <html lang='en' />
      </Helmet>
      <div>
        <Header />
        <CreatePost />
        <br />
        <hr />
        Filter By:
        <PostFilter field='author' value={author} onChange={setAuthor} />
        <br />
        <PostSorting
          valueSortBy={sortBy}
          valueSortOrder={sortOrder}
          fields={['createdAt', 'updatedAt']}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
        />
      </div>
      <PostList posts={posts} />
    </>
  )
}
