import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableBody, TableCell, TableRow, Paper, FormControlLabel, Switch, Checkbox, TableSortLabel } from '@material-ui/core'

import EnhancedTableToolbar from './toolBarTable'
import Pagination from './pagination'
import Tabs from './tabs'
import tableStyle from './tableStyle'

const useStyles = makeStyles(tableStyle)

const TableDefault = ({ data, tabData = null }) => {
  const classes = useStyles()

  const [selected, setSelected] = React.useState([])
  const [dense, setDense] = React.useState(false)

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.rows.map(n => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const isSelected = _id => selected.indexOf(_id) !== -1

  const forceFilter = (newFilter) => {
    const _filter = { ...data._filter, ...newFilter }
    data.changeFilter(_filter)
    data.call()
  }

  const handleRequestSort = (event, property) => {
    const isDesc = data._filter.colSort === property && data._filter.typeSort === 'desc'
    forceFilter({ pageNumber: 1, typeSort: isDesc ? 'asc' : 'desc', colSort: property })
  }

  const handleSearch = ({ value }) => {
    forceFilter({ strKey: value })
  }

  const createSortHandler = property => event => handleRequestSort(event, property)

  const handleChangePage = (event, newPage) => forceFilter({ pageNumber: newPage + 1 })

  const handleChangeRowsPerPage = event => forceFilter({ pageNumber: 1, pageSize: parseInt(event.target.value, 10) })

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const numSelected = selected.length
  const rowCount = data ? data.length : 0
  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <Tabs tabData={tabData}>
          <EnhancedTableToolbar numSelected={numSelected} handleSearch={handleSearch} />
          <Table aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'} aria-label='enhanced table'>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                {data && data.mapHeader((label, name, index, header) => {
                  const align = header.numeric ? 'right' : 'left'
                  const padding = header.disablePadding ? 'none' : 'default'
                  const sortDirection = data._filter.colSort === name ? data._filter.typeSort : false
                  return (
                    <TableCell align={align} padding={padding} sortDirection={sortDirection} key={name + '_' + index}>
                      <TableSortLabel active={data._filter.colSort === name} direction={data._filter.typeSort} onClick={createSortHandler(name)}>
                        {label}
                        {data._filter.colSort === name
                          ? <span className={classes.visuallyHidden}>{data._filter.typeSort === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                          : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {data && data.mapRows((r, _id, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow onClick={event => handleClick(event, r._id)} key={_id} role='checkbox' aria-checked={isSelected(r._id)} tabIndex={-1} selected={isSelected(r._id)}>
                    <TableCell padding='checkbox'><Checkbox checked={isSelected(r._id)} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
                    {r.mapColumns((value, name) => {
                      const align = r._model[name].numeric ? 'right' : 'left'
                      return <TableCell align={align} key={name}>{value}</TableCell>
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {data && <Pagination total={data.total || 0} page={data._filter.pageNumber - 1} rowsPerPage={data._filter.pageSize || 5} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />}
        </Tabs>
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />} label='Dense padding' />

    </div>
  )
}

export default TableDefault
