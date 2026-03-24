import { useMutation } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/user'
import { useAuth } from '../contexts/AuthContext'

export const Login: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const mutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('error login'),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        mutation.mutate()
      }}
    >
      <Link to='/'>Back to main page</Link>
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type='submit'
        disabled={mutation.isPending || !username || !password}
      >
        {mutation.isPending ? 'Login...' : 'Login'}
      </button>
    </form>
  )
}
