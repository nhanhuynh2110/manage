
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CheckCircleRounded as CheckCircleRoundedIcon, DeleteForeverOutlined as DeleteForeverOutlinedIcon, KeyboardReturnOutlined } from '@material-ui/icons'

const CheckCircleRoundedIconStyle  = () => {
  return {
    active: {
      color: '#1976d2',
      cursor: 'pointer'
    },
    unActive: {
      cursor: 'pointer'
    }
  }
}

const useStyles = makeStyles(CheckCircleRoundedIconStyle)

const active = (dataTable, data) => {
  const classes = useStyles()
  return {
    component: () => {
      if (data.isActive) return <CheckCircleRoundedIcon key={'active' + data._id} onClick={() => dataTable.update(data._id, { isActive: false })} className={classes.active} />
      return <CheckCircleRoundedIcon key={'unactive' + data._id} onClick={() => dataTable.update(data._id, { isActive: true })} className={classes.unActive} />
    }
  }
}
const isDelete = (dataTable, data) => {
  return {
    component: () =><DeleteForeverOutlinedIcon key={'delete' + data._id} onClick={() => dataTable.update(data._id, { isDelete: true })} />
  }
}

const revertDelete = (dataTable, data) => {
  return {
    component: () =><KeyboardReturnOutlined key={'revert' + data._id} onClick={() => dataTable.update(data._id, { isDelete: false })} />
  }
}

export {
  active,
  isDelete,
  revertDelete
}