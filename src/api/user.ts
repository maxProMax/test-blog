export const signup = async (user: {
  username: string
  password: string
}): Promise<{ username: string }> => {
  const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`)
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'content-type': 'application/json' },
  })

  if (!res.ok) throw new Error('failed signup')

  return await res.json()
}

export const login = async (user: {
  username: string
  password: string
}): Promise<{ token: string }> => {
  const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`)
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'content-type': 'application/json' },
  })

  if (!res.ok) throw new Error('failed login')

  return await res.json()
}

export const getUserInfo = async (
  id?: string,
): Promise<{ username: string }> => {
  const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${id}`)
  const res = await fetch(url, {
    headers: { 'content-type': 'application/json' },
  })

  return await res.json()
}
