export default (theme) => {
  return {
    root: {
      marginTop: theme.spacing(3)
    },
    paper: {
      width: '100%',
      padding: theme.spacing(2, 2),
      marginBottom: theme.spacing(2)
    },
    treeview: {
      flexGrow: 1,
      marginTop: 20
      // maxWidth: 300,
    }
  }
}