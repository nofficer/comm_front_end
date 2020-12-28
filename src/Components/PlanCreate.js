import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createPlan, getAttainmentRules,getTime } from '../actions'
import Login from './Accounts/Login'
import { Field, reduxForm } from 'redux-form'

import PlanForm from './PlanForm'

class PlanCreate extends React.Component {
  componentDidMount(){
    this.props.getTime()
    this.props.getPlans()
    this.props.getAttainmentRules()
  }

  onSubmit = (formValues) => {
    this.props.createPlan(formValues)
  }

  populateDropdown(){
    return this.props.attainmentRules
  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (
        <div className='ui container containermargin'><PlanForm title='Creating Plan' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
      )
    }

    else if(typeof(this.props.account['user_id']) == "number"){
      return "You do not have sufficient permissions to access this page"
    }
    else{
      return <Login/>
    }


  }
}

const mapStateToProps = (state) => {
  return {
    attainmentRules: Object.values(state.attainmentRules.attainmentRules),
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlans, createPlan, getAttainmentRules,getTime })(PlanCreate)
