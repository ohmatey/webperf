import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'

const ScrapedPageEntities = ({
  entities = []
}) => {
  return (
    <section>
      <Typography
        variant='h3'
        gutterBottom
      >Page entities</Typography>

      <Grid container spacing={1}>
        {entities?.map((entity, index) => (
          <Grid
            key={index}
            item
            xs={6}
            sm={6}
          >
            <Paper
              sx={{
                padding: 1,
              }}
            >
              <Typography variant='h5'>{entity.name}</Typography>
              {entity.category && (
                <Typography variant='body1'>{entity.category}</Typography>
              )}

              {entity.homepage && (
                <Typography
                  variant='body1'
                  color='text.secondary'
                ><a href={entity.homepage}>{entity.homepage}</a></Typography>
              )}

              {!entity.homepage && (
                <ul>
                  {entity.origins.map((origin, index) => (
                    <li key={index}>
                      {/* link */}
                      <a href={origin}>{origin}</a>
                    </li>
                  ))}
                </ul>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default ScrapedPageEntities