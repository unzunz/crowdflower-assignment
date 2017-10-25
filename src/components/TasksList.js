import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

const TasksList = ({ tasks, onChange, onDelete, firstRef }) => {
  const visibleTasks = tasks.slice();
  let firstTask = visibleTasks.shift();
  return (
    <div>
      { firstTask ?
          <Task
            key={ 0 }
            inputRef={ firstRef }
            text={ firstTask.text }
            onChange={ (event) => onChange(event, 0) }
            onDelete={ () => onDelete(0) } />
        : null }
     { visibleTasks.map((task, index) => (
       <Task
         key={ index + 1 }
         text={ task.text }
         onChange={ (event) => onChange(event, index + 1) }
         onDelete={ () => onDelete(index + 1) } />)) }
    </div>

  )
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TasksList;
