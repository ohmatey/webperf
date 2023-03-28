import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import getWebReportCategoryColorCode from '../utils/getWebReportCategoryColorCode'

const LighthouseCategoryResults = ({
  categories
}) => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant='h3'
          gutterBottom
        >Lighthouse</Typography>
      </Grid>
      
      {Object.keys(categories)?.map(categoryKey => {
        const category = categories[categoryKey]

        const colorCode = getWebReportCategoryColorCode(category?.score * 100)

        return (
          <Grid
            key={categoryKey}
            item
            xs={12}
            sm={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    // vertical center
                    alignItems: 'center',
                    marginBottom: 2
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{
                      marginRight: 2
                    }}
                  >{category.title} <strong>{Math.round(category.score * 100)}</strong></Typography>

                  <Box
                    sx={{
                      background: colorCode?.color,
                      height: 16,
                      width: 16,
                      borderRadius: '50%',
                    }}
                  />
                </Box>
                
                <Typography
                  variant='body1'
                  color='text.secondary'
                  gutterBottom
                >{category.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default LighthouseCategoryResults