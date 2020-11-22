import React from 'react'
import { connect } from 'react-redux'
import { createCalc,changeDone } from '../actions'

import { Field, reduxForm } from 'redux-form'
// import { createProduct } from '../../actions'
import CalcForm from './CalcForm'

class Calc extends React.Component {


  onSubmit = (formValues) => {
    this.props.createCalc(formValues)
  }



  render(){
      return (
        <div><CalcForm onSubmit={this.onSubmit} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans)
  }
}

export default connect(mapStateToProps, {createCalc,changeDone })(Calc)
