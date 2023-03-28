import { useState } from 'react'
import { useMutation } from 'react-query'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Paper } from '@mui/material'

import ResultsCard from '../components/ResultsCard'

const suggestedUrls = [
  // 'https://paifit.com/',
  // 'https://phukettopteam.com/'
]

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
    <>
      <main>
        <Container maxWidth='md'>
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

          <Paper
            sx={{
              padding: 2,
              my: 3
            }}
          >
            {/* form to submit a url and recieve analysis results */}
            <form onSubmit={handleSubmit}
              style={{
                marginBottom: 8
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant='h3'
                  component='h2'
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
                  disabled={isAnalyzing}
                  size='large'
                  style={{
                    background: '#eee',
                    border: '1px solid #ccc'
                  }}
                >Submit</Button>
              </Stack>
            </form>
          </Paper>

          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div>
              {suggestedUrls.map((suggestedUrl, index) => (
                <button
                  key={index}
                  onClick={() => setUrl(suggestedUrl)}
                  style={{
                    marginRight: 8
                  }}
                >
                  {suggestedUrl}
                </button>
              ))}
            </div>
          </div>
        </Container>

        <ResultsCard
          analysisData={analysisData}
          isAnalyzing={isAnalyzing}
          isAnalysisError={isAnalysisError}
          analysisError={analysisError}
        />
      </main>
    </>
  )
}
