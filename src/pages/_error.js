import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ErrorPage = ({
  statusCode
}) => {
  const { back } = useRouter()

  return (
    <Container maxWidth='md'>
      <Typography
        variant='h1'
        component='h1'
      >Error: {statusCode}</Typography>

      <Typography
        variant='body1'
        component='p'
        gutterBottom
        sx={{
          mb: 2
        }}
      >Lets get you back on track.</Typography>

      <Button
        onClick={() => back()}
        variant='contained'
        color='secondary'
        sx={{
          mr: 2
        }}
      >Back</Button>

      <Button
        component={Link}
        href='/'
        variant='contained'
      >Home</Button>
    </Container>
  )
}

export default ErrorPage