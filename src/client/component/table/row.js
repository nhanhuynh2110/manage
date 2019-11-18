import React from 'react'
import { TableRow, TableCell, Checkbox } from '@material-ui/core'

export default ({ dataTable, model, _id, handleClick, handleUpdate, isSelected, actions, index, tabData, tabActive }) => {
  const selected = isSelected(_id)
  const labelId = `enhanced-table-checkbox-${index}`
  console.log('tabActive', tabActive)
  // const listActions = actions.list
  // const actionsGroup = actions.render('active')
  // const ComponentCheckBox = actionsGroup.component
  // const components = listActions.map(el => {
  //   const actionsItem = actions.render(el)
  //   const ComponentItem = actionsItem.component
  //   return ComponentItem
  // })

  // const tabSelect = tabData ? Object.keys(tabData) :
  return (
    <TableRow hover key={_id} role='checkbox' aria-checked={selected} tabIndex={-1} selected={selected}>
      <TableCell padding='checkbox'><Checkbox checked={selected} onClick={event => handleClick(event, _id)} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
      {model.mapColumns((value, name, i) => {
        const align = model._model[name].numeric ? 'right' : 'left'
        return <TableCell align={align} key={i} name={name}>{value}</TableCell>
      })}
      {actions && tabData && <TableCell align='right' padding='checkbox'>
        <div style={{ display: 'flex'}}>
          {
          Object.keys(actions(Object.keys(tabData)[tabActive])).map(el => {
            return actions(Object.keys(tabData)[tabActive])[el](dataTable, model._data).component()
          })}
        </div>
       
        {/* {components.map((Com, index) => <Com key={index} />)} */}
        {/* <ComponentCheckBox defaultChecked={actionsGroup.render(model._data)} handleCheckBox={(value) => handleUpdate(_id, actionsGroup.handle(value))}/> */}
      </TableCell>}
    </TableRow>
  )
}