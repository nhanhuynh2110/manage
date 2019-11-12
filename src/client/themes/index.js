import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppBar, Breadcrumbs } from '../component'

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
