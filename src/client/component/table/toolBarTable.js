import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Toolbar, Typography, Tooltip, IconButton, FormControl, Input, InputAdornment } from '@material-ui/core'
import { Delete as DeleteIcon, FilterList as FilterListIcon, Search as SearchIcon } from '@material-ui/icons'

import toolBartableStyle from './toolbarTableStyle'

const useToolbarStyles = makeStyles(toolBartableStyle)

const SearchBox = ({ handleSearch }) => {
  const ref = React.useRef(null)

  let timeout = null

  const onChange = () => {
    if (typeof handleSearch !== 'function') return
    handleSearch({ ref, value: ref.current.value })
  }

  const onChangeDelay = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => onChange(), 500)
  }

  return (
    <FormControl>
      <Input
        inputRef={ref}
        onChange={onChangeDelay}
        id='input-with-icon-adornment'
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected, handleSearch } = props

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
        <>
          <SearchBox handleSearch={handleSearch} />
          <Tooltip title='Filter list'>
            <IconButton aria-label='filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default EnhancedTableToolbar
