import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import Button from '@mui/material/Button'

const AuthButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    return (
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          signIn()
        }}
      >
        Login
      </Button>
    )
  }

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => {
        router.push('/dashboard')
      }}
    >
      Dashboard
    </Button>
  )
}

export default AuthButton