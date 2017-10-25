import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

const Task = ({ text, onChange, onDelete, inputRef }) => (
  <div className='task'>
    <input
      className='task-input'
      ref={ inputRef }
      onChange={ onChange }
      value={ text }></input>
    <i
      className="fa fa-trash-o task-delete-icon"
      onClick={ onDelete }></i>
  </div>
)

Task.propTypes = {
  inputRef: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Task;
