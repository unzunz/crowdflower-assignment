import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import tasksReducer from './reducers/tasks'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    tasksReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
