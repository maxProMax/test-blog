import { FC, Fragment } from 'react'
import { Post } from './Post'
import { Post as PostType } from '../api/post'

export const PostList: FC<{
  posts: PostType[]
}> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post
            title={post.title}
            contents={post.contents}
            author={post.author}
          />
          <br />
        </Fragment>
      ))}
    </div>
  )
}
