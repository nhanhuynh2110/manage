import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />)

export default ({ label, handleCheckBox, defaultChecked = false }) => {

  // const [state, setState] = React.useState(defaultChecked)

  const handleChange = event => {
    // setState(event.target.checked)
    console.log('event.target.checked', event.target.checked)
    handleCheckBox(event.target.checked)
  }

  return (
    <FormControlLabel
        control={
          <GreenCheckbox
            checked={defaultChecked}
            onChange={handleChange}
            value='checkedG'
          />
        }
        label={label || ''}
      />
  )
}