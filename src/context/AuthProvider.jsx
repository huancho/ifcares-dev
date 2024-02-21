'use client'

import { useEffect } from 'react'
import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const storedUserJson = typeof window !== 'undefined' ? window.localStorage.getItem("user"): ""
  const localStorageValue = storedUserJson ? JSON.parse(storedUserJson) : null;
  const [auth, setAuth] = useState(localStorageValue)
  const router  = useRouter()

  useEffect(() => {
    if (!auth) {
      router.push('/auth/login');
    }
    
  }, [auth])
  

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>  
  )
}

export default AuthContext