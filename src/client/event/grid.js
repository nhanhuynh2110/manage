export default {
  triggerChange: (newDataTable, forceUpdate) => {
    const newFormState = Object.assign(Object.create(Object.getPrototypeOf(newDataTable)), newDataTable)
    forceUpdate(newFormState)
  }
}
