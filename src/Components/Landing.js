import React from 'react'
import { connect } from 'react-redux'
//import { } from '../actions'

import { Field, reduxForm } from 'redux-form'



class Landing extends React.Component {
  componentDidMount(){

  }



  render(){
      return (
        <div className='ui text container ' ><h1 className='centertext'>Hello World</h1></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {})(Landing)
