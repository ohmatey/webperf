import React from 'react'
import Link from 'next/link'
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'

import scheduledAnalyses from '../modules/scheduledAnalyses'

const ScheduledAnalyses = ({
  allScheduledAnalyses
}) => {
  const handleDeleteScheduledAnalysis = (scheduledAnalysisId) => async e => {
    e.preventDefault()

    if (!confirm('Are you sure you want to delete this scheduled analysis?')) {
      return
    }
    
    await fetch(`/api/scheduledAnalysis?scheduledAnalysisId=${scheduledAnalysisId}`, {
      method: 'DELETE'
    })
  }

  return (
    <Container maxWidth='md'>
      <Typography
        variant='h1'
        component='h1'
      >Scheduled Analyses</Typography>

      <Paper
        sx={{
          p: 2,
          background: 'background.paper'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>Cron</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allScheduledAnalyses.map((scheduledAnalysis) => (
              <TableRow key={scheduledAnalysis.id}>
                <TableCell>{scheduledAnalysis.url}</TableCell>
                <TableCell>{scheduledAnalysis.cron}</TableCell>
                <TableCell>
                  <Link href={`/scheduledAnalysis/${scheduledAnalysis.id}`}>
                    <Button variant='contained' color='primary'>View</Button>
                  </Link>

                  <Button onClick={handleDeleteScheduledAnalysis(scheduledAnalysis.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

export async function getServerSideProps() {
  try {
    const allScheduledAnalyses = await scheduledAnalyses.getAll()

    return {
      props: {
        allScheduledAnalyses
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        allScheduledAnalyses: []
      }
    }
  }
}

export default ScheduledAnalyses