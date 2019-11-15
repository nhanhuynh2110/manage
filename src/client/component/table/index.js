/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableRow, Paper, Checkbox, FormControlLabel, Switch } from '@material-ui/core'

import EnhancedTableToolbar from './toolBarTable'
import EnhancedTableHead from './tableHead'
import Pagination from './pagination'

import tableStyle from './tableStyle'
import { desc } from './utils'

function createData (name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rowsData = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
]

const useStyles = makeStyles(tableStyle)

export default ({ data = [], data1 = null }) => {
  console.log('data1', data1)
  const classes = useStyles()
  const [filter, setFilter] = React.useState({
    order: 'asc',
    orderBy: 'calories',
    page: 0,
    rowsPerPage: 5
  })
  const [rows, setRows] = React.useState(data)
  const [selected, setSelected] = React.useState([])
  const [dense, setDense] = React.useState(false)

  const forceFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

  const handleRequestSort = (event, property) => {
    const isDesc = filter.orderBy === property && filter.order === 'desc'
    forceFilter({ order: isDesc ? 'asc' : 'desc', orderBy: property })
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

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

  const handleChangePage = (event, newPage) => forceFilter({ page: newPage  })

  const handleChangeRowsPerPage = event => forceFilter({ page: 0, rowsPerPage: parseInt(event.target.value, 10) })

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows = filter.rowsPerPage - Math.min(filter.rowsPerPage, rows.length - filter.page * filter.rowsPerPage)

  const renderRow = (row, index) => {
    const isItemSelected = isSelected(row.name)
    const labelId = `enhanced-table-checkbox-${index}`
    return (
      <TableRow hover onClick={event => handleClick(event, row.name)} role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected}>
        <TableCell padding='checkbox'><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
        <TableCell component='th' id={labelId} scope='row' padding='none'>{row.name}</TableCell>
        <TableCell align='right'>{row.calories}</TableCell>
        <TableCell align='right'>{row.fat}</TableCell>
        <TableCell align='right'>{row.carbs}</TableCell>
        <TableCell align='right'>{row.protein}</TableCell>
      </TableRow>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'} aria-label='enhanced table'>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={filter.order}
              orderBy={filter.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              setFilter={setFilter}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => renderRow(row, index))}
              {emptyRows > 0 && <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}><TableCell colSpan={6} /></TableRow>}
            </TableBody>
          </Table>
        </div>
        <Pagination total={rows.length} page={filter.page} rowsPerPage={filter.rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
    </div>
  )
}
