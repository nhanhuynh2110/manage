import React from 'react'
import ReactDom from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {withData} from 'react-hooks-usemodel'

import Button from '@material-ui/core/Button'

const App = () => {
  return <React.Fragment>
    <CssBaseline />
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  </React.Fragment>
}

const Application = withData({})(App)

ReactDom.render(<Application />, document.getElementById('root'))
