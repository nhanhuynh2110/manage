import Eventhandler from '../eventHandler'
import DataRow from './dataRow'

class DataTable extends Eventhandler {
  constructor (model, filter, data) {
    super()
    super.initEvents(['change'])

    this.model = model
    this._filter = filter
    this.initData(data)
  }

  initData (data, total = 0) {
    this._data = data
    this.total = total
    this._rows = data ? data.map(item => new DataRow(this.model, item)) : null
  }

  setData (data, total = 0) {
    this._data = data
    this.total = total
    this._rows = data ? data.map(item => new DataRow(this.model, item)) : null
    this.triggerChange()
  }

  get length () {
    return this.rows ? this.rows.length : 0
  }

  get rows () { return this._rows }

  get Data () { return this.data }

  // set filter (_filter) {
  //   this.filter = { ...this.filter, ..._filter }
  // }

  triggerChange () {
    super.trigger('change', this)
  }

  mapRows (iterator) {
    return this.rows.map((r, index) => iterator(r, r.id, index))
  }
}

export default DataTable
