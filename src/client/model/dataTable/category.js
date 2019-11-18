export default {
  _id: {
    hidden: true
  },
  title: {
    label: 'Title'
  },
  parentId: {
    label: 'Parent',
    formatter: (v) => !v ? 'Parent' : 'Childen'
  },
  createDate: {
    label: 'Create Date'
  }
}
