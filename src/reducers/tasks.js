import { combineReducers } from 'redux'
import {
  HIDE_ALERT_MESSAGE,
  REQUEST_TASKS,
  RECEIVE_TASKS,
  SHOW_ALERT_MESSAGE,
  UPDATE_TASKS
} from '../actions'

function tasks(
  state = {
    foundFetchError: false,
    foundPostError: false,
    isModified: false,
    items: [],
    showAlertMesage: false
  },
  action
){
  switch (action.type) {
    case REQUEST_TASKS:
      break;
    case RECEIVE_TASKS:
      if (action.data.error) {
        return Object.assign({}, state, {
          foundFetchError: true,
        })
      }
      return Object.assign({}, state, {
        foundFetchError: false,
        isModified: false,
        items: action.data.tasks || []
      })

    case SHOW_ALERT_MESSAGE:
      return Object.assign({}, state, {
        showAlertMessage: true
      })
    case HIDE_ALERT_MESSAGE: {
      return Object.assign({}, state, {
        showAlertMesage: false
      })
    }
    case UPDATE_TASKS:
      return Object.assign({}, state, {
        isModified: true,
        items: action.tasks,
        showAlertMesage: false
      })

    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export default rootReducer
