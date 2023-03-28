import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Accordian from './Accordian'
import CodeBlock from './CodeBlock'

const ScrapedPageAccessibilityReport = ({
  violations = []
}) => {
  return (
    <section>
      <Typography
        variant='h3'
        gutterBottom
      >Accessibility {violations?.length}</Typography>

      <div>
        {violations?.map((violation, index) => (
          <Accordian
            key={index}
            panelTitle={violation.id}
            panelCategory={violation.impact}
            panelSummary={violation.description}
            panelDetails={(
              <div>
                {violation.nodes.map((node, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      py: 1,
                      mb: 1
                    }}
                  >
                    <Typography
                      variant='body1'
                      paragraph
                    >
                      {node.failureSummary}
                    </Typography>

                    <Typography
                      variant='body1'
                      paragraph
                    >
                      {node.target}
                    </Typography>

                    <CodeBlock>
                      {node.html}
                    </CodeBlock>

                    <ul>
                      {node?.any?.map((any, index) => (
                        <li key={index}>
                          <Typography
                            variant='body2'
                            gutterBottom
                          >
                            {any.message}
                          </Typography>
                        </li>
                      ))}
                    </ul>

                    <Typography variant='body1'>
                      {node.help}
                    </Typography>
                  </Box>
                ))}
              </div>
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default ScrapedPageAccessibilityReport