import { Home, Category } from './container'

export default () => {
  return [
    { key: 'home', path: '/', exact: true, component: Home },
    { key: 'category', path: '/category', exact: true, component: Category }
  ]
}
