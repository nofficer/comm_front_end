import React from 'react'
import ReactDOM from 'react-dom'
import history from './history'

const Loader = props => {

  return ReactDOM.createPortal(
    <div className='ui dimmer modals visible active'>

        <div className="ui active dimmer">
          <div className="ui text loader">{props.filler}</div>
          <div className='ui grid'>
          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>

          <div className='sixteen wide column'><div className='ui button' onClick={(e) => e.stopPropagation(history.push({pathname:'/' }))}>OK</div></div>

          </div>

      <p></p>
      </div>
    </div>,
    document.querySelector('#loader')
  )
}

export default Loader;
