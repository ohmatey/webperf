import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import analytics from '../services/analytics'
import ScrapedPageEntities from './ScrapedPageEntities'
import ScrapedPageCoreWebVitals from './ScrapedPageCoreWebVitals'
import LighthouseCategoryResults from './LighthouseCategoryResults'
import ScrapedPageAccessibilityReport from './ScrapedPageAccessibilityReport'
import CreateUrlAnalysisScheduleButton from './CreateUrlAnalysisScheduleButton'
import CodeBlock from './CodeBlock'

const TabsRow = ({ selectedPanelIndex, handleChange }) => {
  return (
    <Tabs
      value={selectedPanelIndex}
      onChange={handleChange}
      indicatorColor='primary'
      textColor='primary'
      variant='scrollable'
      scrollButtons='auto'
      aria-label='scrollable auto tabs example'
    >
      <Tab label='Lighthouse' />
      <Tab label='Core web vitals' />
      <Tab label='Accessibility report' />
      <Tab label='Page entities' /> 
      <Tab label='Meta data' />
    </Tabs>
  )
}

const TabPanel = ({ children, panelIndex, selectedPanelIndex, ...other }) => {
  const isSelected = panelIndex === selectedPanelIndex
  return (
    <div
      role='tabpanel'
      hidden={!isSelected}
      id={`scrollable-auto-tabpanel-${selectedPanelIndex}`}
      aria-labelledby={`scrollable-auto-tab-${selectedPanelIndex}`}
      {...other}
    >
      {isSelected && children}
    </div>
  )
}

const ResultsCard = ({
  isAnalyzing,
  isAnalysisError,
  analysisError,
  analysisData
}) => {
  const [selectedPanelIndex, setselectedPanelIndex] = useState(0)

  const handleSelectPanel = (event, newPanelName) => {
    analytics.track('selectTab', {
      tabName: newPanelName
    })
    setselectedPanelIndex(newPanelName)
  }

  if (isAnalyzing) {
    return (
      <Container maxWidth='sm'>
        <Typography variant='body1'>Analysing...</Typography>
      </Container>
    )
  }

  if (isAnalysisError) {
    return (
      <Container maxWidth='sm'>
        <Typography
          variant='body1'
          color='error'
        >
          Error:
        </Typography>

        <Typography
          component='pre'
          variant='body1'
          color='error'
        >
          {JSON.stringify(analysisError, null, 2)}
        </Typography>
      </Container>
    )
  }

  if (!analysisData || !analysisData.webreport) {
    return null
  }

  return (
    <Container maxWidth='md'>
      <Stack spacing={2}>
        <Box>
          <Typography
            variant='h2'
            gutterBottom
          >Results</Typography>

          <CreateUrlAnalysisScheduleButton url={analysisData.url} />
        </Box>

        <TabsRow
          selectedPanelIndex={selectedPanelIndex}
          handleChange={handleSelectPanel}
        />

        <TabPanel
          panelIndex={0}
          selectedPanelIndex={selectedPanelIndex}
        >
          <LighthouseCategoryResults
            categories={analysisData?.webreport?.categories}
          />
        </TabPanel>

        <TabPanel
          panelIndex={1}
          selectedPanelIndex={selectedPanelIndex}
        >
          {/* coreWebVitalMetrics */}
          <ScrapedPageCoreWebVitals coreWebVitalMetrics={analysisData?.webreport?.coreWebVitalMetrics} />          
        </TabPanel>

        <TabPanel
          panelIndex={2}
          selectedPanelIndex={selectedPanelIndex}
        >
          {/* accessibilityReport */}
          <ScrapedPageAccessibilityReport
            violations={analysisData?.accessibilityReport?.violations}
          />
        </TabPanel>

        <TabPanel
          panelIndex={3}
          selectedPanelIndex={selectedPanelIndex}
        >
          {/* Page entities found */}
          <ScrapedPageEntities
            entities={analysisData?.webreport?.entities}
          />
        </TabPanel>

        <TabPanel
          panelIndex={4}
          selectedPanelIndex={selectedPanelIndex}
        >
          {/* Meta data */}
          <section>
            <Typography
              variant='h3'
              gutterBottom
            >Meta data</Typography>
            
            <Paper
              sx={{
                padding: `8px 16px`,
              }}
            >
              <Typography
                variant='body1'
                gutterBottom
              >Header metadata</Typography>

              <CodeBlock>
                {JSON.stringify(analysisData?.metadata, null, 2)}
              </CodeBlock>
            </Paper>
          </section>
        </TabPanel>
      </Stack>
    </Container>
  )
}

// all data
{/* {!isAnalyzing && !isAnalysisError && analysisData && (
<pre
  style={{
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    background: '#eee',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    display: 'inline-block',
    minWidth: 300
  }}
>
  {JSON.stringify(analysisData, null, 2)}
</pre>
)} */}

export default ResultsCard