export default () => {
  return {
    parent: {
      label: 'Parent',
      query: {
        level: 'parent'
      }
    },
    children: {
      label: 'Children',
      query: {
        level: 'children'
      }
    },
    all: {
      label: 'All',
      query: {
        level: '',
        isDelete: false
      }
    },
    delete: {
      label: 'Delete',
      query: {
        level: '',
        isDelete: true
      }
    }
  }
}
