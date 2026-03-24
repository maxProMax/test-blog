import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { getUserInfo } from '../api/user'

export const User: FC<{ id: string | undefined }> = ({ id }) => {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = query.data
  return userInfo ? (
    <div>
      <strong>{userInfo?.username}</strong>
    </div>
  ) : null
}
