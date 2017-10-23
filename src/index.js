import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import tasks from './reducers/tasks'
import App from './containers/App'

let store = createStore(
  combineReducers({ tasks })
);

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)
