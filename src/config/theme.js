import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = ({
  font = {
    fontFamily: 'sans-serif'
  }
}) => {
  return createTheme({
    typography: font,
    palette: {
      mode: 'dark',
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
    components: {
      MuiPaper: {
        props: {
          elevation: 0
        }
      }
    }
  })
}

export default theme