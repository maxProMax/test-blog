import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { createPost } from '../api/post'

export const CreatePost: FC = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createPostMutation.mutate()
      }}
    >
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          value={title}
          type='text'
          id='create-title'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          value={author}
          type='text'
          id='create-author'
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      ></textarea>
      <br />
      <input type='submit' value='Create' />
      {createPostMutation.isSuccess && (
        <>
          <br />
          Post created
        </>
      )}
    </form>
  )
}
