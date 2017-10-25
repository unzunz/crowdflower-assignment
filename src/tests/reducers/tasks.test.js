import tasksReducer from '../../reducers/tasks'
import {
  ADD_TASK,
  DELETE_TASK,
  FETCH_TASKS_SUCCESS,
  POST_TASKS_SUCCESS,
  UPDATE_TASK
} from '../../actions'

describe('tasks reducer', () => {
  it('should return the initial state', () => {
    expect(tasksReducer(undefined, {})).toEqual({
      fetchAttempts: 0,
      foundFetchError: false,
      foundPostError: false,
      postAttempts: 0,
      isModified: false,
      items: []
    })
  })

  it('should handle ADD_TASK', () => {
    expect(
      tasksReducer({ items: [] }, {
        type: ADD_TASK,
        task: { text: 'sample text' }
      })
    ).toEqual({
      isModified: true,
      items: [{ text: 'sample text' }]
    })
  })

  it('should handle DELETE_TASK', () => {
    expect(
      tasksReducer({ items: [{ text: 'sample text' }] }, {
        type: DELETE_TASK,
        index: 0
      })
    ).toEqual({
      isModified: true, items: []
    })
  })

  it('should handle UPDATE_TASK', () => {
    expect(
      tasksReducer({ items: [{ text: 'sample text' }] }, {
        type: UPDATE_TASK,
        index: 0,
        text: 'updated text'
      })
    ).toEqual({
      isModified: true, items: [{ text: 'updated text'}]
    })
  })

  it('should handle FETCH_TASKS_SUCCESS', () => {
    expect(
      tasksReducer({ fetchAttempts: 0, foundFetchError: false }, {
        type: FETCH_TASKS_SUCCESS,
        data: { error: 'An error has occured' }
      })
    ).toEqual({
      fetchAttempts: 1,
      foundFetchError: true
    })

    expect(
      tasksReducer({ fetchAttempts: 1,
                     foundFetchError: true,
                     isModified: true,
                     items: [] }, {
        type: FETCH_TASKS_SUCCESS,
        data: { tasks: [{ text: 'sample text' }] }
      })
    ).toEqual({
      fetchAttempts: 0,
      foundFetchError: false,
      isModified: false,
      items: [{ text: 'sample text' }]
    })
  })

  it('should handle POST_TASKS_SUCCESS', () => {
    expect(
      tasksReducer({ postAttempts: 0, foundPostError: false }, {
        type: POST_TASKS_SUCCESS,
        data: { error: 'An error has occured' }
      })
    ).toEqual({
      postAttempts: 1,
      foundPostError: true
    })

    expect(
      tasksReducer({ foundPostError: true,
                     isModified: true,
                     items: [],
                     postAttempts: 1 }, {
        type: POST_TASKS_SUCCESS,
        data: { tasks: [{ text: 'sample text' }] }
      })
    ).toEqual({
      foundPostError: false,
      hasSaved: true,
      isModified: false,
      items: [{ text: 'sample text' }],
      postAttempts: 0
    })
  })
})
