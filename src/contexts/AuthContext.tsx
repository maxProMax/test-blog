import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'

export const AuthContext = createContext<{
  token: string | undefined
  setToken: (t: string | undefined) => void
}>({
  token: undefined,
  setToken: () => {},
})

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string>()
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
