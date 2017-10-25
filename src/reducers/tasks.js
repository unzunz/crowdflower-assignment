import {
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS_SUCCESS,
  POST_TASKS_SUCCESS,
  UPDATE_TASK
} from '../actions'

function tasksReducer(
  state = {
    fetchAttempts: 0,
    foundFetchError: false,
    foundPostError: false,
    postAttempts: 0,
    isModified: false,
    items: [],
  },
  action
){
  let tasks;
  switch (action.type) {
    case ADD_TASK:
      tasks = state.items.slice();
      tasks.unshift(action.task)
      return Object.assign({}, state, {
        isModified: true,
        items: tasks
      })
    case DELETE_TASK:
      tasks = state.items.slice();
      tasks.splice(action.index, 1);
      return Object.assign({}, state, {
        isModified: true,
        items: tasks
      })
    case UPDATE_TASK:
      tasks = state.items.slice();
      tasks[action.index].text = action.text;
      return Object.assign({}, state, {
        isModified: true,
        items: tasks
      })
    case FETCH_TASKS_SUCCESS:
      if (action.data.error) {
        return Object.assign({}, state, {
          fetchAttempts: state.fetchAttempts + 1,
          foundFetchError: true
        })
      }
      return Object.assign({}, state, {
        fetchAttempts: 0,
        foundFetchError: false,
        isModified: false,
        items: action.data.tasks || []
      })
    case POST_TASKS_SUCCESS:
      if (action.data.error) {
        return Object.assign({}, state, {
          postAttempts: state.postAttempts + 1,
          foundPostError: true
        })
      }
      return Object.assign({}, state, {
        foundPostError: false,
        hasSaved: true,
        postAttempts: 0,
        isModified: false,
        items: action.data.tasks || []
      })
    default:
      return state
  }
}

export default tasksReducer
