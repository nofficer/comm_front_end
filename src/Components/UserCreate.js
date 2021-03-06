import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createUser ,getTime,checkCalcStatus } from '../actions'
import Login from './Accounts/Login'


import UserForm from './UserForm'

import Loader from '../Loader'

class UserCreate extends React.Component {
  componentDidMount(){
    this.props.getPlans()
    this.props.getTime()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.createUser(formValues)
  }

  populateDropdown(){
    return this.props.plans
  }


  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div><UserForm title='Creating new User' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
        )
      }

    }


    else if(typeof(this.props.account['user_id']) !== "undefined"){
      return "You do not have sufficient permissions to access this page"
    }
    else{
      return <Login/>
    }


  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans),
    account: state.account.account,
    calc: state.calc.calc,
    error:state.errors.errors
  }
}

export default connect(mapStateToProps, { getPlans, createUser,getTime,checkCalcStatus  })(UserCreate)
