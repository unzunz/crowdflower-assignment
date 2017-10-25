import React from 'react';
import { shallow } from 'enzyme'
import { App } from '../containers/App'

function setup() {
  const props = {
    dispatch: jest.fn(),
    foundFetchError: false,
    foundPostError: false,
    fetchAttempts: 0,
    handleAddTask: jest.fn(),
    handleFetchTasks: jest.fn(),
    handleDeleteTask: jest.fn(),
    handlePostTasks: jest.fn(),
    handleUpdateTask: jest.fn(),
    isModified: false,
    postAttempts: 0,
    tasks: []
  }

  const enzymeWrapper = shallow(<App {...props } />)

  return {
    props,
    enzymeWrapper
  }
}

it ('correctly components and subcomponents', () => {
  let { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('TaskHeader').length).toBe(1)
  expect(enzymeWrapper.find('TasksList').length).toBe(1)
  expect(enzymeWrapper.find('AlertNotification').length).toBe(1)
})

it ('correctly adds a task', () => {
  const { enzymeWrapper, props } = setup();
  enzymeWrapper.instance().handleAdd()
  expect(props.handleAddTask.mock.calls[0][0]).toEqual({ text: '' })
})

it ('correctly deletes a task', () => {
  const { enzymeWrapper, props } = setup();
  enzymeWrapper.instance().handleDelete(0)
  expect(props.handleDeleteTask.mock.calls[0][0]).toBe(0)
})

it ('correctly updates a task', () => {
  const { enzymeWrapper, props } = setup();
  enzymeWrapper.instance().handleChange({ target: { value: 'sample text' } }, 0)
  expect(props.handleUpdateTask.mock.calls[0][0]).toEqual('sample text')
  expect(props.handleUpdateTask.mock.calls[0][1]).toBe(0)
})

it ('correctly saves tasks', () => {
  const { enzymeWrapper, props } = setup();
  enzymeWrapper.instance().handleSave()
  expect(props.handlePostTasks.mock.calls[0][0]).toEqual([])
})
