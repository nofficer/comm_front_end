import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createUser } from '../actions'

import { Field, reduxForm } from 'redux-form'
// import { createProduct } from '../../actions'
import UserForm from './UserForm'

class UserCreate extends React.Component {
  componentDidMount(){
    this.props.getPlans()
  }

  onSubmit = (formValues) => {
    this.props.createUser(formValues)
  }

  populateDropdown(){
    return this.props.plans
  }


  render(){
      return (
        <div><UserForm onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans)
  }
}

export default connect(mapStateToProps, { getPlans, createUser })(UserCreate)
