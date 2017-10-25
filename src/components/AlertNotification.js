import React from 'react';
import PropTypes from 'prop-types';

import './AlertNotification.css';


const AlertNotification = ({ text, isHidden = false, onClick }) => {
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


export default AlertNotification
