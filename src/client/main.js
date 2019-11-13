import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withData } from 'react-hooks-usemodel'
import Theme from './themes'
import routerLink from './router'

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Theme>
        <Switch>
          {routerLink().map(el => {
            const { key, ...other } = el
            return <Route key={key} {...other} />
          })}
        </Switch>
      </Theme>
    </BrowserRouter>
  )
}

const Application = withData({})(App)

ReactDom.render(<Application />, document.getElementById('root'))
