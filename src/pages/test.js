import { Typography, Button } from '@material-ui/core'
import React from 'react'

const Test = () => {
  return (
    <div>
      <Typography
        variant='h1'
        component='h1'
      >
        Test
      </Typography>

      <Typography
        variant='h2'
        component='h1'
      >
        Test
      </Typography>

      <Typography
        variant='h3'
        component='h1'
      >
        Test
      </Typography>
      
      <h1>Test</h1>

      <Button variant='contained'>Test</Button>
      <Button variant='contained' color='primary'>Test</Button>
    </div>
  )
}

export default Test