import React from 'react'
import Box from '@mui/material/Box'

const CodeBlock = ({
  children
}) => {
  return (
    <Box
      component='pre'
      sx={{
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        bgcolor: 'background.paper',
        p: 1,
        mb: 1,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      {children}
    </Box>
  )
}

export default CodeBlock