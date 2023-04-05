import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'

import getWebReportCategoryColorCode from '../utils/getWebReportCategoryColorCode'

const getRangeRank = (value, ranges = []) => {
  const rangeRank = ranges?.find(range => {
    if (value >= range.min && value <= range.max) {
      return range.rank
    }
  })

  if (!rangeRank) {
    return ranges?.[ranges?.length - 1]
  }

  return rangeRank
}

const CwvMetricCard = ({
  title,
  displayValue,
  numericUnit,
  score,
  description,
  numericValue,
  metric = {}
}) => {
  const colorCode = getWebReportCategoryColorCode(score * 100)
  const rangeRank = getRangeRank(numericValue, metric?.ranges)

  return (
    <Paper
      sx={{
        padding: `8px 16px`,
        border: `1px solid ${colorCode?.color}`
      }}
    >
      <Typography
        variant='h4'
        component='h4'
        gutterBottom
      >{title}: {Math.round(score * 100)}</Typography>
      
      <Typography
        variant='body1'
        sx={{
          wordBreak: 'break-word'
        }}
      >{description}</Typography>

      <Typography variant='body1'>
        <strong>{displayValue}</strong>{' '}{numericUnit}
      </Typography>

      <div>
        <ul>
          {metric?.ranges?.map(range => (
            <li key={range.rank}>
              {range.rank}: {range.min}{range.max ? ` - ${range.max}` : '+'} {range.rank === rangeRank?.rank && '👈'}
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  )
}

const ScrapedPageCoreWebVitals = ({
  coreWebVitalMetrics = []
}) => {
  return (
    <section>
      <Typography
        variant='h3'
        gutterBottom
      >Core Web Vitals</Typography>

      {/* css container for grid with 50% columns */}
      <Grid container spacing={1}>
        {coreWebVitalMetrics?.map((metric, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
          >
            <CwvMetricCard
              {...metric}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default ScrapedPageCoreWebVitals