export type Post = {
  _id: string
  title: string
  author?: string
  contents?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

type PostDto = Omit<Post, '_id' | 'createdAt' | 'updatedAt'>

export type PostQuery = {
  author?: string
  sortBy?: 'createdAt' | 'updatedAt'
  sortOrder?: 'ascending' | 'descending'
}
export const getPosts = async (query: PostQuery = {}): Promise<Post[]> => {
  const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts`)

  Object.entries(query).forEach(([key, value]) => {
    value && url.searchParams.append(key, value)
  })

  const res = await fetch(url)
  return res.json()
}

export const createPost = async (post: PostDto): Promise<Post> => {
  const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts`)

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: { 'content-type': 'application/json' },
  })
  return res.json()
}
