import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@material-ui/icons'

import toolBartableStyle from './toolbarTableStyle'

const useToolbarStyles = makeStyles(toolBartableStyle)

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}>
      {numSelected > 0
        ? <Typography className={classes.title} color='inherit' variant='subtitle1'>{numSelected} selected</Typography>
        : <Typography className={classes.title} variant='h6' id='tableTitle'>Nutrition</Typography>}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default EnhancedTableToolbar
