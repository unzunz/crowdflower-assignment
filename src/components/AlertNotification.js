import React from 'react';
import PropTypes from 'prop-types';

import './AlertNotification.css';


const AlertNotification = ({ isHidden = false, text, onClick }) => {
  if (isHidden) {
    return null
  }

  return (
    <div className='alert-message'>
      <div>{ text }</div>
      <i onClick={ onClick } className='fa fa-times alert-x-icon'></i>
    </div>
  )
}

AlertNotification.propTypes = {
  isHidden: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AlertNotification
