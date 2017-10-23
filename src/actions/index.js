export const getTasks = () => {
  return {
    type: 'GET_TASKS'
  }
}

export const updateTasks = tasks => {
  return {
    type: 'UPDATE_TASKS'
  }
}
