import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
  addTask,
  deleteTask,
  fetchTasks,
  postTasks,
  updateTask,
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS_SUCCESS,
  POST_TASKS_SUCCESS,
  UPDATE_TASK } from '../../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


it('creates an action to add a task', () => {
  const task = { text: 'sample text '};
  const expectedAction = {
    type: ADD_TASK,
    task
  }
  expect(addTask(task)).toEqual(expectedAction)
})

it('creates an action to delete a task', () => {
  const index = 0;
  const expectedAction = {
    type: DELETE_TASK,
    index
  }
  expect(deleteTask(index)).toEqual(expectedAction)
})

it('creates an action to update a task', () => {
  const index = 0,
        text = 'sample text ';
  const expectedAction = {
    type: UPDATE_TASK,
    text,
    index
  }
  expect(updateTask(text, index)).toEqual(expectedAction)
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_TASKS_SUCCESS when fetching tasks has been done', () => {
    const expectedTasks = { 'tasks': [{ 'text': 'sample text' }] }
    fetchMock
      .getOnce('http://cfassignment.herokuapp.com/unzipark/tasks', {
        body: expectedTasks,
        headers: { 'content-type': 'application/json' }
      })

    const store = mockStore({ tasks: [] })

    return store.dispatch(fetchTasks()).then(() => {
      expect(store.getActions()).toEqual(
        [{ 'data': expectedTasks, 'type': FETCH_TASKS_SUCCESS }]
      )
    })
  })

  it ('creates POST_TASKS_SUCCESS when posting tasks has been done', () => {
    const updatedTasks = { 'tasks': [{ 'text': 'sample text' }] }
    fetchMock
      .postOnce('http://cfassignment.herokuapp.com/unzipark/tasks', {
        body: updatedTasks,
        headers: { 'content-type': 'application/json' }
      })

    const store = mockStore({ tasks: [] })

    return store.dispatch(postTasks(updatedTasks)).then(() => {
      expect(store.getActions()).toEqual(
        [{ 'data': updatedTasks, 'type': POST_TASKS_SUCCESS }]
      )
    })
  })
})
