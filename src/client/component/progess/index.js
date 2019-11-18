import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import progessStyle from './progessStyle'

const useStyles = makeStyles(progessStyle)

export default function CircularUnderLoad ({ enable = false }) {
  const classes = useStyles()
  return (
    <>
      {enable &&
        <div className={classes.root}>
          <CircularProgress disableShrink />
        </div>}
    </>
  )
}
