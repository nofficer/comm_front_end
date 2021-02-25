import React from 'react'
import ReactDOM from 'react-dom'

const LoaderNoButton = props => {

  return ReactDOM.createPortal(
    <div className='ui dimmer modals visible active'>

        <div class="ui active dimmer">
          <div class="ui text loader">{props.filler}</div>


      <p></p>
      </div>
    </div>,
    document.querySelector('#loadernobutton')
  )
}

export default LoaderNoButton;
