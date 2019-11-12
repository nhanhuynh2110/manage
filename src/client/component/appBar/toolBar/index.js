import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import { Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import toolBarStyle from './toolBarStyle'

const useStyles = makeStyles(toolBarStyle)

export default ({ open, handleDrawerOpen }) => {
  const classes = useStyles()

  return (
    <Toolbar>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={handleDrawerOpen}
        edge='start'
        className={clsx(classes.menuButton, {
          [classes.hide]: open
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap>
        Manager
      </Typography>
    </Toolbar>
  )
}
