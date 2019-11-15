import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CategoryAPI } from '../../../api'
import { Treeview, Table } from '../../../component'
import { DataTable } from '../../../core'

import { dataTableModel } from '../../../model'

const model = dataTableModel.CategoryModel

const payload = {
  strKey: '',
  level: 'parent',
  isDelete: false,
  pageSize: 10,
  pageNumber: 1,
  colSort: 'createDate',
  typeSort: 'asc'
}

export default () => {
  const [list, setList] = React.useState(new DataTable(model, payload, null))

  list.on('change', (newDataTable) => {
    const newFormState = Object.assign(Object.create(Object.getPrototypeOf(newDataTable)), newDataTable)
    setList(newFormState)
  })

  const getList = () => {
    CategoryAPI.grid(payload).then(data => list.setData(data.list, data.total))
  }

  React.useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Treeview />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Table data1={list} />
          {/* {list.rows && list.mapRows((r, _id) => {
            r.mapColumns((value, name) => {
            })
          })} */}
        </Grid>
      </Grid>
    </div>
  )
}
