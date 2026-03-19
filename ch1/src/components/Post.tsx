import { FC } from 'react'
import { Post as PostType } from '../api/post'
export const Post: FC<Pick<PostType, 'title' | 'contents' | 'author'>> = ({
  title,
  contents,
  author,
}) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {!!author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}
