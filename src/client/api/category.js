import API from './api'

export default class CategoryAPI extends API {
  grid (payload = {}) {
    return super.get(super.baseAPI(), payload, 'category')
  }

  update (_id, payload = {}) {
    return super.put(super.baseAPI(), {}, payload, 'category/' + _id)
  }

  delete (payload = {}) {
    return super.delete(super.baseAPI(), {}, payload, 'category')
  }
}
