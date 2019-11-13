import React from 'react'
import { CategoryAPI } from '../../../api'

export default () => {
  const [list, setList] = React.useState([])

  const table = new DataTable(model, data)

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

  return <div>{list.length}</div>
}
