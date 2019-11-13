import React from 'react'
import {TreeItem} from '@material-ui/lab'
import { fade, withStyles } from '@material-ui/core/styles'

import TransitionComponent from './transition'

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />)



export default StyledTreeItem