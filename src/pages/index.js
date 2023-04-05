import { useForm, Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import analytics from '../services/analytics'
import ResultsCard from '../components/ResultsCard'
import AuthButton from '../components/AuthButton'

const track = (event, {
  url,
  formFactor,
  statusCode,
  statusText,
  error,
  timeToComplete
}) => {
  return analytics.track(event, {
    url,
    formFactor,
    statusCode,
    statusText,
    error,
    timeToComplete
  })
}

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      formFactor: 'mobile'
    }
  })

  const {
    mutateAsync: analyzeUrl,
    isLoading: isAnalyzing,
    isError: isAnalysisError,
    error: analysisError,
    data: analysisData
  } = useMutation({
    mutationFn: async ({
      url,
      formFactor = 'mobile'
    }) => {
      const startTime = Date.now()

      try {
        const analysisRes = await fetch('/api/analyse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url,
            formFactor
          })
        })

        if (!analysisRes.ok) {
          track('analysis-error', {
            url,
            formFactor,
            statusCode: analysisRes.status,
            statusText: analysisRes.statusText,
            timeToComplete: Date.now() - startTime
          })
          
          return Promise.reject('Brokeded')
        }
        
        track('analysis-success', {
          url,
          formFactor,
          statusCode: analysisRes.status,
          statusText: analysisRes.statusText,
          timeToComplete: Date.now() - startTime
        })

        const analysis = analysisRes.json()

        return analysis
      } catch (err) {
        track('analysis-error', {
          url,
          formFactor,
          error: err.message,
          timeToComplete: Date.now() - startTime
        })

        return Promise.reject(err)
      }
    }
  })

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
          <form onSubmit={handleSubmit(analyzeUrl)}>
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
                label='URL'
                {...register('url', {
                  required: 'URL is required'
                })}
                error={!!errors.url}
                helperText={errors.url?.message}
              />

              {/* mobile or desktop formFactor, default mobile */}
              {/* select buttons */}
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Form Factor</FormLabel>
                
                <Controller
                  name='formFactor'
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      aria-label='formFactor'
                      name='formFactor'
                      {...field}
                    >
                      {['mobile', 'desktop'].map((formFactor) => (
                        <FormControlLabel
                          key={formFactor}
                          value={formFactor}
                          control={<Radio />}
                          label={formFactor}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <Button
                type='submit'
                disabled={isAnalyzing}
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

