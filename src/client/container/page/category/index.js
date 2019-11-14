import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CategoryAPI } from '../../../api'
import { Treeview, Table } from '../../../component'

export default () => {
  const [list, setList] = React.useState([])

  // const table = new DataTable(model, data)

  const getList = () => {
    const payload = {
      strKey: '',
      level: 'parent',
      isDelete: false,
      pageSize: 10,
      pageNumber: 1,
      colSort: 'createDate',
      typeSort: 'asc'
    }
    CategoryAPI.grid(payload).then(data => setList(data.list))
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
          <Table />
        </Grid>
      </Grid>

      {list.length}
    </div>
  )
}
