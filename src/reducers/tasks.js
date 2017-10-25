import { combineReducers } from 'redux'
import {
  FETCH_TASKS_SUCCESS,
  POST_TASKS_SUCCESS,
  UPDATE_TASKS
} from '../actions'

function tasks(
  state = {
    foundFetchError: false,
    foundPostError: false,
    isModified: false,
    items: [],
  },
  action
){
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      if (action.data.error) {
        return Object.assign({}, state, {
          foundFetchError: true
        })
      }
      return Object.assign({}, state, {
        foundFetchError: false,
        isModified: false,
        items: action.data.tasks || []
      })
    case POST_TASKS_SUCCESS:
      if (action.data.error) {
        return Object.assign({}, state, {
          foundPostError: true
        })
      }
      return Object.assign({}, state, {
        foundPostError: false,
        hasSaved: true,
        isModified: false,
        items: action.data.tasks || []
      })
    case UPDATE_TASKS:
      return Object.assign({}, state, {
        isModified: true,
        items: action.tasks,
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
