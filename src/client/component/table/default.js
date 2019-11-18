import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableBody, TableCell, TableRow, Paper, FormControlLabel, Switch, Checkbox, TableSortLabel } from '@material-ui/core'

import EnhancedTableToolbar from './toolBarTable'
import Pagination from './pagination'
import Tabs from './tabs'
import tableStyle from './tableStyle'
import Rows from './row'

const useStyles = makeStyles(tableStyle)

const TableDefault = ({ data, tabData = null, actions = null }) => {
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

  const handleSearch = ({ value }) => forceFilter({ strKey: value })

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

  const handleTab = (value, index) => {
    data._tabActive = index
    setSelected([])
    forceFilter({ ...tabData[value].query })
  }

  const handleUpdate = (_id, value) => {
    data.update(_id, value)
  }

  const numSelected = selected.length
  const rowCount = data ? data.length : 0
  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <Tabs tabData={tabData} handleTab={handleTab} tabActive={data ? data._tabActive : 0}>
          <EnhancedTableToolbar numSelected={numSelected} handleSearch={handleSearch} />
          <Table aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'} aria-label='enhanced table'>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected !== 0 && numSelected === rowCount}
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
                {actions && <TableCell align='right'>Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {data && data.length <= 0 && <TableRow><TableCell colSpan={6}>Empty</TableCell></TableRow>}
              {data && data.mapRows((r, _id, index) => <Rows tabData={tabData} tabActive={data._tabActive} dataTable={data} handleUpdate={handleUpdate} actions={actions} key={_id} model={r} isSelected={isSelected} _id={_id} handleClick={handleClick} index={index} />)}
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
