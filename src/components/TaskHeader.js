import React from 'react'
import PropTypes from 'prop-types'

import './TaskHeader.css'

const TaskHeader = ({ isSaveDisabled, onAdd, onSave }) => (
  <div className='header'>
    <h2 className='header-text'>Task</h2>
    <div className='header-buttons'>
      <button className='header-add-button'
              onClick={ onAdd }>Add Task</button>
      <button className='header-save-button'
              disabled={ isSaveDisabled }
              onClick={ onSave }>Save</button>
    </div>
  </div>
)

TaskHeader.propTypes = {
  isSaveDisabled: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default TaskHeader;
