import Eventhandler from '../eventHandler'
import DataRow from './dataRow'

// const buildColumns = model => _.mapValues(model, col => col)
const defaultFilter = {
  strKey: '',
  isDelete: false,
  pageSize: 5,
  pageNumber: 1,
  colSort: 'createDate',
  typeSort: 'asc'
}
class DataTable extends Eventhandler {
  constructor (model, filter = {}, data, tabActive) {
    super()
    super.initEvents(['change'])

    this.model = model
    this._filter = { ...defaultFilter, ...filter }
    this._tabActive = tabActive
    this.initData(data)
    // this.header = buildColumns(this.model)
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

  triggerChange () {
    super.trigger('change', this)
  }

  mapHeader (iterator) {
    return Object.keys(this.model).map((m, index) => !this.model[m].hidden ? iterator(this.model[m].label, m, index, this.model[m]) : null)
  }

  mapRows (iterator) {
    if (!this.rows) return
    return this.rows.map((r, index) => iterator(r, r._id, index))
  }

  call () {
    this._api(this._filter).then(data => this.setData(data.list, data.total))
  }

  changeFilter (newFilter) {
    this._filter = { ...this._filter, ...newFilter }
  }

  bindAPI (api) {
    if (!(typeof api === 'function')) return
    this._api = api
  }

  updateAPI (api) {
    if (!(typeof api === 'function')) return
    this._updateApi = api
  }

  update(_id, value) {
    this._updateApi(_id, value).then(data => {
      this.call()
    })
  }

  deleteAPI (api) {
    if (!(typeof api === 'function')) return
    this._deleteApi = api
  }
}

export default DataTable
