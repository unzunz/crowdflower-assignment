import fetch from 'isomorphic-fetch'

export const REQUEST_TASKS = 'REQUEST_TASKS'
export const REQUEST_TASKS_FAILURE = 'REQUEST_TASKS_FAILURE'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const HIDE_ALERT_MESSAGE = 'HIDE_ALERT_MESSAGE'
export const SHOW_ALERT_MESSAGE = 'SHOW_ALERT_MESSAGE'
export const UPDATE_TASKS = 'UPDATE_TASKS'

function receiveTasks(json) {
  return {
    type: RECEIVE_TASKS,
    data: json
  }
}

function showAlertMessage() {
  return {
    type: SHOW_ALERT_MESSAGE,
  }
}

export function updateTasks(tasks) {
  return {
    type: UPDATE_TASKS,
    tasks: tasks
  }
}

export function postTasks(tasks) {
  console.log(tasks)
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
      .then(
        json => {
          console.log(json)
          return dispatch(receiveTasks(json))
        }
      )
  }
}

export function fetchTasks() {
  return dispatch => {
    // dispatch(requestTasks())
    return fetch('http://cfassignment.herokuapp.com/unzipark/tasks')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(
        json => dispatch(receiveTasks(json))
      )
  }
}
