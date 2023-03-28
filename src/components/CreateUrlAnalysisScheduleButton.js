import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// every 30 mins, 3 hrs, 12 hrs, 24 hrs, 7 days
const cronSchedules = [
  {
    label: 'Every 30 minutes',
    value: '0 */30 * * * *'
  },
  {
    label: 'Every 3 hours',
    value: '0 0 */3 * * *'
  },
  {
    label: 'Every 12 hours',
    value: '0 0 */12 * * *'
  },
  {
    label: 'Every 24 hours',
    value: '0 0 */24 * * *'
  },
  {
    label: 'Every 7 days',
    value: '0 0 */168 * * *'
  }
]

const CreateUrlAnalysisScheduleButton = ({
  url
}) => {
  const router = useRouter()
  const [cron, setCron] = useState(cronSchedules[3].value)
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false)

  const toggleIsCreatingSchedule = () => {
    setIsCreatingSchedule(!isCreatingSchedule)
  }

  const {
    mutateAsync: createUrlAnalysisSchedule,
    isLoading: isCreatingUrlAnalysisSchedule,
    error: createUrlAnalysisScheduleError
  } = useMutation(({
    url,
    cron
  }) => {
    return fetch('/api/scheduledAnalysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        cron
      })
    }).then(res => res.json())
  })

  const handleSubmit = async e => {
    e.preventDefault()

    const scheduledAnalysis = await createUrlAnalysisSchedule({
      url,
      cron
    })

    toggleIsCreatingSchedule()
    router.push(`/scheduledAnalysis/${scheduledAnalysis.id}`)
  }

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={toggleIsCreatingSchedule}
        disabled={isCreatingUrlAnalysisSchedule}
      >
        Schedule analysis
      </Button>

      {isCreatingSchedule && (
        <Dialog open={isCreatingSchedule} onClose={toggleIsCreatingSchedule}>
          <DialogTitle>Create analysis schedule</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText>
                Set a cron schedule for this URL to be analysed.
              </DialogContentText>
              
              <TextField
                value={url}
                disabled
              />

              <Select
                value={cron}
                onChange={(event) => setCron(event.target.value)}
              >
                {cronSchedules.map((cronSchedule) => (
                  <MenuItem key={cronSchedule.value} value={cronSchedule.value}>
                    {cronSchedule.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={toggleIsCreatingSchedule}
              disabled={isCreatingUrlAnalysisSchedule}
            >Cancel</Button>
            <Button
              onClick={handleSubmit}
              disabled={isCreatingUrlAnalysisSchedule}
            >Create</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default CreateUrlAnalysisScheduleButton