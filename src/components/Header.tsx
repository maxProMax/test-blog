import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User } from './User'

export function Header() {
  const { token, setToken } = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <nav>
        Logged in as <User id={sub} />
        <br />
        <button onClick={() => setToken(undefined)}>Logout</button>
      </nav>
    )
  }

  return (
    <nav>
      <Link to='/login'>Log in</Link> | <Link to='/signup'>Sign Up</Link>
    </nav>
  )
}
