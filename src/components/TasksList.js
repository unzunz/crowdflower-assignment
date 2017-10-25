import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const TasksList = ({ tasks, onChange, onDelete }) => (
  <div>
    { tasks.map((task, index) => (
      <Task
        key={ index }
        text={ task.text }
        onChange={ (event) => onChange(event, index) }
        onDelete={ () => onDelete(index) } />
      )) }
  </div>
)

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
