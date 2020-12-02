import React from 'react'
import { connect } from 'react-redux'
import { getPlan, editPlan, getAttainmentRules,getTime } from '../actions'
import Login from './Accounts/Login'
import { Field, reduxForm } from 'redux-form'

import PlanForm from './PlanForm'

class PlanEdit extends React.Component {
  componentDidMount(){
    this.props.getTime()
    this.props.getPlan({"plan_id": this.props.match.params.plan_id})
    this.props.getAttainmentRules()
  }

  onSubmit = (formValues) => {
    this.props.editPlan(formValues)
  }

  populateDropdown(){
    return this.props.attainmentRules
  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (
        <div><PlanForm onSubmit={this.onSubmit} initialValues={this.props.plan} populateDropdown={this.populateDropdown()} /></div>
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
    plans: state.plans.plans,
    plan: state.plans.plan,
    attainmentRules: Object.values(state.attainmentRules.attainmentRules),
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlan, editPlan, getAttainmentRules ,getTime})(PlanEdit)
