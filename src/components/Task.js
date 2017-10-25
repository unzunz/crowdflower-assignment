import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

const Task = ({ text, onChange, onDelete }) => (
  <div className='task'>
    <input
      className='task-text'
      onChange={ onChange }
      value={ text }></input>
    <i
      className="fa fa-trash-o task-delete-icon"
      onClick={ onDelete }></i>
  </div>
)

Task.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Task;
