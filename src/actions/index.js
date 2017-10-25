import 'isomorphic-fetch'

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
export const POST_TASKS_SUCCESS = 'POST_TASKS_SUCCESS'
export const UPDATE_TASKS = 'UPDATE_TASKS'

function fetchTasksSuccess(data) {
  return {
    type: FETCH_TASKS_SUCCESS,
    data
  }
}

export function fetchTasks() {
  return dispatch => {
    return fetch('http://cfassignment.herokuapp.com/unzipark/tasks')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(fetchTasksSuccess(json))
      )
    }
}

function postTasksSuccess(data) {
  return {
    type: POST_TASKS_SUCCESS,
    data
  }
}

export function postTasks(tasks) {
  return dispatch => {
    return fetch('http://cfassignment.herokuapp.com/unzipark/tasks', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ tasks })
    })
    .then(
      response => response.json(),
      error => console.log('An error occured.', error)
    )
    .then(json =>
      dispatch(postTasksSuccess(json))
    )
  }
}

export function updateTasks(tasks) {
  return {
    type: UPDATE_TASKS,
    tasks: tasks
  }
}
