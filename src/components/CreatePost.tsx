import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { createPost } from '../api/post'
import { useAuth } from '../contexts/AuthContext'

export const CreatePost: FC = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const { token } = useAuth()

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, contents }, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  if (!token) {
    return <div>Please log in to create new post</div>
  }

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
