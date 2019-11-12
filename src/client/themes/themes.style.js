import { createMuiTheme } from '@material-ui/core/styles'
// import grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    }
  },
  spacing: 8
})

export default theme
