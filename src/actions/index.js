import 'isomorphic-fetch'

export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
export const POST_TASKS_SUCCESS = 'POST_TASKS_SUCCESS'
export const UPDATE_TASK = 'UPDATE_TASK'

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

export function updateTask(text, index) {
  return {
    type: UPDATE_TASK,
    index,
    text
  }
}

export function addTask(task) {
  return {
    type: ADD_TASK,
    task
  }
}

export function deleteTask(index) {
  return {
    type: DELETE_TASK,
    index
  }
}
