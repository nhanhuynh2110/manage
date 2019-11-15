import React from 'react'
import { TablePagination } from '@material-ui/core'

export default ({ total, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={total}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        'aria-label': 'previous page'
      }}
      nextIconButtonProps={{
        'aria-label': 'next page'
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}
