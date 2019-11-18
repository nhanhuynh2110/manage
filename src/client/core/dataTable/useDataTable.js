import React from 'react'
import DataTable from './index'

export default (model, filter, tabActive, api, updateApi, deleteApi) => {
  const [dataTableState, setData] = React.useState(new DataTable(model, filter, null, tabActive))
  dataTableState.bindAPI(api)
  dataTableState.updateAPI(updateApi)
  dataTableState.deleteAPI(deleteApi)

  React.useEffect(() => {
    dataTableState.call()
    const triggerChange = (newDataTable) => {
      const newFormState = Object.assign(Object.create(Object.getPrototypeOf(newDataTable)), newDataTable)
      setData(newFormState)
    }
    dataTableState.on('change', triggerChange)
    return () => dataTableState.off('change', triggerChange)
  }, [])

  return dataTableState
}
