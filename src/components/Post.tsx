import { FC } from 'react'
import { Post as PostType } from '../api/post'
import { User } from './User'
import { Link } from 'react-router-dom'
import slug from 'slug'

export const Post: FC<
  Pick<PostType, 'title' | 'contents' | 'author' | '_id'> & {
    fullPost?: boolean
  }
> = ({ title, contents, author, fullPost, _id }) => {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && <div>{contents}</div>}
      {!!author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}
