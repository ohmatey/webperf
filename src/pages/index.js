import { useState } from 'react'
import { useMutation } from 'react-query'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Grid, Paper } from '@mui/material'

import ResultsCard from '../components/ResultsCard'
import AuthButton from '../components/AuthButton'

export default function Home() {
  const [url, setUrl] = useState('https://paifit.com/')

  const {
    mutateAsync: analyzeUrl,
    isLoading: isAnalyzing,
    isError: isAnalysisError,
    error: analysisError,
    data: analysisData
  } = useMutation({
    mutationFn: async ({
      url
    }) => {
      const analysisRes = await fetch('/api/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url
        })
      })

      if (!analysisRes.ok) {
        return Promise.reject('Brokeded')
      }
      
      const analysis = analysisRes.json()

      return analysis
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const url = e.target.url.value

    try {
      return analyzeUrl({
        url
      })
    } catch (error) {
      console.error('Error submitting url', error)
    }
  }
  return (
    <main>
      <Container maxWidth='md'>
        <Grid
          container
          justifyContent='space-between'  
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              pl: 3
            }}
          >
            <Typography
              variant='h1'
              component='h1'
            >Webperf</Typography>

            <Typography
              variant='body1'
              gutterBottom
            >
              Simple web analysis tool
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: 3
              }}
            >
              <AuthButton />
            </Box>
          </Grid>
        </Grid>

        <Paper
          sx={{
            padding: 2,
            my: 5
          }}
        >
          {/* form to submit a url and recieve analysis results */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={1}>
              <Typography
                variant='h3'
                component='h2'
                gutterBottom
              >Enter url to analyse</Typography>

              <TextField
                type='text'
                id='url'
                name='url'
                value={url}
                label='URL'
                onChange={(e) => setUrl(e.target.value)}
              />
              
              <Button
                type='submit'
                disable={isAnalyzing}
                size='large'
                sx={{
                  background: '#eee',
                  border: '1px solid #ccc'
                }}
              >Submit</Button>
            </Stack>
          </form>
        </Paper>
      </Container>

      <ResultsCard
        analysisData={analysisData}
        isAnalyzing={isAnalyzing}
        isAnalysisError={isAnalysisError}
        analysisError={analysisError}
      />
    </main>
  )
}

