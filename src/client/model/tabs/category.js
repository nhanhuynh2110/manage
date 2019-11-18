export default () => {
  return {
    parent: {
      label: 'Parent',
      query: {
        isDelete: false,
        level: 'parent'
      }
    },
    children: {
      label: 'Children',
      query: {
        isDelete: false,
        level: 'children'
      }
    },
    trash: {
      label: 'Delete',
      query: {
        level: '',
        isDelete: true
      }
    }
  }
}
