import _ from 'lodash'

class DataRows {
  constructor (model, data) {
    this._model = model
    this._data = data

    Object.defineProperties(this,
      _.mapValues(model, ({ formatter }, p) => {
        return {
          get () {
            return typeof formatter === 'function' ? formatter(data[p]) : data[p]
          }
        }
      })
    )
  }

  mapColumns (iterator) {
    return Object.keys(this._model).filter(p => !this._model[p].hidden).map((name, index) => iterator(this[name], name, index))
  }
}

export default DataRows
