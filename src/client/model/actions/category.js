import { active, isDelete, revertDelete } from './common'

const tabs = (name) => {
  switch (name) {
    case 'children':
      return {
        active: active,
        isDelete: isDelete
      }
    case 'trash':
      return {
        revert: revertDelete
      }
    case 'parent':
      return {
        active: active,
        isDelete: isDelete
      }
    default:
      return null
  }
}

export default tabs
