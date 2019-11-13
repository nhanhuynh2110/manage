import API from './api'

export default class CategoryAPI extends API {
  grid (payload = {}) {
    return super.get(super.baseAPI(), payload, 'category')
  }
}
