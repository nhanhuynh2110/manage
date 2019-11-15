class Filter {
  constructor (_filter) {
    this._payload = _filter
  }

  get payload () {
    return this._payload
  }

  set payload (newFilter) {
    this._payload = { ...this.payload, ...newFilter }
  }
}

export default Filter
