import fetch from 'isomorphic-fetch'

export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'

function requestTasks() {
  return {
    type: REQUEST_TASKS
  }
}

function receiveTasks(json) {
  return {
    type: RECEIVE_TASKS,
    data: json
  }
}

export function fetchTasks() {
  return dispatch => {
    dispatch(requestTasks())
    return fetch('http://cfassignment.herokuapp.com/unzipark/tasks')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(
        json => {
          return dispatch(receiveTasks(json))
        }
      )
  }
}
