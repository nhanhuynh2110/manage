import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CategoryAPI } from '../../../api'
import { Treeview, Table } from '../../../component'
import { useDataTable } from '../../../core'
import { dataTableModel, TabsModel, ActionsModel } from '../../../model'

const dataTable = dataTableModel.CategoryModel
const tabs = TabsModel.CategoryModel()
const actions = ActionsModel.CategoryModel

export default () => {
  const list = useDataTable(dataTable,
    { level: 'children' },
    1,
    CategoryAPI.grid,
    CategoryAPI.update,
    CategoryAPI.delete
  )

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Treeview />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Table.Default data={list} tabData={tabs} tabActive={1} actions={actions}/>
        </Grid>
      </Grid>
    </div>
  )
}
