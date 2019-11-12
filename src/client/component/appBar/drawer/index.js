import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Drawer, Avatar, IconButton, Divider } from '@material-ui/core'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons'
import drawerStyle from './drawerStyle'

const useStyles = makeStyles(drawerStyle)

export default ({ children, open, handleDrawerClose }) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      open={open}
    >
      <div className={classes.toolbar}>
        {/* <Avatar alt='Remy Sharp' src='https://material-ui.com/static/images/avatar/1.jpg' className={classes.bigAvatar} /> */}
        <Avatar className={classes.avatar}>NH</Avatar>

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      {children}
    </Drawer>
  )
}
