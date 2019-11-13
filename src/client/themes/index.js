import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppBar } from '../component'

import theme from './themesStyle'

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        {children}
      </AppBar>
    </ThemeProvider>
  )
}
