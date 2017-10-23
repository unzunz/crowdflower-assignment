import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const TasksList = ({ tasks, onChange, onDelete }) => (
  <div>
    { tasks.map(task => (
      <Task
        key={task.id}
        text={task.text}
        onChange={() => onChange(task.id)}
        onDelete={() => onDelete(task.id)} />
      )) }
  </div>
)

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TasksList;
