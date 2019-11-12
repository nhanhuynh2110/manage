import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Breadcrumbs, Link } from '@material-ui/core/'
import { Home as HomeIcon, Whatshot as WhatshotIcon, Grain as GrainIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2)
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}))

function handleClick (event) {
  event.preventDefault()
  // alert('You clicked a breadcrumb.')
}

export default function IconBreadcrumbs () {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link color='inherit' href='/' onClick={handleClick} className={classes.link}>
          <HomeIcon className={classes.icon} />
          Material-UI
        </Link>
        <Link
          color='inherit'
          href='/getting-started/installation/'
          onClick={handleClick}
          className={classes.link}
        >
          <WhatshotIcon className={classes.icon} />
          Core
        </Link>
        <Typography color='textPrimary' className={classes.link}>
          <GrainIcon className={classes.icon} />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </Paper>
  )
}
