import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CategoryChip = ({ category }) => {
  const categoryColor = {
    'good': 'primary',
    'needsImprovement': 'secondary',
    'poor': 'error'
  }

  return (
    <Chip
      label={category}
      color={categoryColor[category]}
      size='small'
    />
  )
}

const AccordianC = ({
  panelTitle,
  panelCategory,
  panelSummary,
  panelDetails
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded)
  }

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel-content'
      >
        <Box>
          <Typography
          variant='h5'
          gutterBottom
        >
          {panelTitle}
        </Typography>

        <CategoryChip category={panelCategory} />

        <Typography
          variant='body2'
          sx={{ color: 'text.secondary' }}
        >
          {panelSummary}
        </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          variant='body1'
        >
          {panelDetails}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordianC