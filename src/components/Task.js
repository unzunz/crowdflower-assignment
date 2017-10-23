import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ text, onChange, onDelete }) => (
  <div>{ text }</div>
)

Task.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Task;
