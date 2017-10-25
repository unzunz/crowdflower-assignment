import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
  fetchTasks,
  postTasks,
  updateTasks,
  FETCH_TASKS_SUCCESS,
  POST_TASKS_SUCCESS,
  UPDATE_TASKS } from '../../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('creates an action to update tasks', () => {
  const tasks = [{ text: 'sample text '}];
  const expectedAction = {
    type: UPDATE_TASKS,
    tasks
  }
  expect(updateTasks(tasks)).toEqual(expectedAction)
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
