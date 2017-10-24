import { combineReducers } from 'redux'
import {
  REQUEST_TASKS,
  RECEIVE_TASKS
} from '../actions'

function tasks(
  state = {
    foundError: false,
    isFetching: false,
    items: []
  },
  action
){
  switch (action.type) {
    case REQUEST_TASKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TASKS:
      if (action.data.error) {
        return Object.assign({}, state, {
          foundError: true,
          isFetching: false
        })
      } else {
        return Object.assign({}, state, {
          foundError: false,
          isFetching: false,
          items: action.data.tasks || []
        })
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
