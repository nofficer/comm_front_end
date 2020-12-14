import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
      <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
        <div className='header blacktext'>{props.title}</div>
        <div className='content blacktext'>{props.content}</div>
        <div onClick={props.onDismiss} className='actions blacktext'><div className='ui button'>{props.actions}</div></div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal;
