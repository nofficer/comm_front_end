import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './Components/Accounts/LoginForm'

const LoginModal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
      <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
        <div className='header blacktext'>{props.title}</div>
        <div className='content blacktext'><LoginForm onSubmit={props.onSubmit}/>
          <div className='ui center aligned grid'>
            <strong style={{color:'red'}}>
              {props.issue}
            </strong>
          </div>
        </div>

        <div onClick={props.onDismiss} className='actions blacktext'><div className=''></div></div>

      </div>
    </div>,
    document.querySelector('#login')
  )
}

export default LoginModal;
