import { combineReducers } from 'redux'

const readingAll = (state0 = 'initial', action) => {
  switch (action.type) {
    case 'TRY_READ_SITES': return 'in-progress'
    case 'READ_SITES_SUCCESS': return 'done'
    case 'READ_SITES_ERROR': return 'error'
    default: return state0
  }
}

const creating = (state0 = 'initial', action) => {
  switch (action.type) {
    case 'SUBMIT_CREATE_SITE': return 'in-progress'
    case 'CREATE_SITE_SUCCESS': return 'done'
    case 'CREATE_SITE_ERROR': return 'error'
    default: return state0
  }
}

const patching = (state0 = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_PATCH_SITE': {
      return {
        ...state0,
        [action.id]: 'in-progress'
      }
    }
    case 'PATCH_SITE_SUCCESS': {
      const state1 = { ...state0 }
      delete state1[action.object.id]
      return state1
    }
    case 'PATCH_SITE_ERROR': {
      return {
        ...state0,
        [action.id]: 'error'
      }
    }
    default: return state0
  }
}

const deleting = (state0 = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_DELETE_SITE': {
      return {
        ...state0,
        [action.id]: 'in-progress'
      }
    }
    case 'DELETE_SITE_SUCCESS': {
      const state1 = { ...state0 }
      delete state1[action.id]
      return state1
    }
    case 'DELETE_SITE_ERROR': {
      return {
        ...state0,
        [action.id]: 'error'
      }
    }
    default: return state0
  }
}

const objects = (state0 = {}, action) => {
  switch (action.type) {
    case 'READ_SITES_SUCCESS': {
      return action.objects.reduce((acc, object) => {
        acc[object.id] = object
        return acc
      }, {})
    }
    case 'READ_SITE_SUCCESS':
    case 'PATCH_SITE_SUCCESS': {
      const state1 = { ...state0 }
      state1[action.object.id] = action.object
      return state1
    }
    case 'CREATE_SITE_SUCCESS': {
      const state1 = { ...state0 }
      state1[action.object.id] = action.object
      return state1
    }
    case 'DELETE_SITE_SUCCESS': {
      const state1 = { ...state0 }
      delete state1[action.id]
      return state1
    }
    default:
      return state0
  }
}

export default combineReducers({
  readingAll,
  creating,
  patching,
  deleting,
  objects
})
