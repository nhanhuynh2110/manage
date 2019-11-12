import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'

import ToolBar from './toolBar'
import Drawer from './drawer'
import MenuList from './menu'

import appBarStyle from './appBarStyle'

const useStyles = makeStyles(appBarStyle)

export default function MiniDrawer ({ children }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
        <ToolBar open={open} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <Drawer open={open} handleDrawerClose={handleDrawerClose}>
        <MenuList />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
