import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import Stack from '@mui/material/Stack'

import scheduledAnalyses from '../../modules/scheduledAnalyses'

const ScheduleAnalysisPage = ({
  scheduledAnalysis = {}
}) => {
  return (
    <Container maxWidth='md'>
      <Typography
        variant='h1'
        component='h1'
      >Schedule Analysis</Typography>

      <Box
        sx={{
          p: 2,
          background: 'background.paper'
        }}
      >
        <Stack spacing={1}>
          <span>
            <Typography
              variant='subtitle1'
              component='p'
            >Url</Typography>

            <Typography
              variant='h5'
              component='p'
            >{scheduledAnalysis.url}</Typography>
          </span>

          <span>
            <Typography
              variant='subtitle1'
              component='p'
            >Cron</Typography>

            <Typography
              variant='h5'
              component='p'
            >{scheduledAnalysis.cron}</Typography>
          </span>
        </Stack>
      </Box>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const { scheduledAnalysisId } = context.params

  // get scheduledAnalysis from database
  const scheduledAnalysis = await scheduledAnalyses.getById(scheduledAnalysisId)

  return {
    props: {
      scheduledAnalysis,
    },
  }
}

export default ScheduleAnalysisPage