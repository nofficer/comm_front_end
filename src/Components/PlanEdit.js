import React from 'react'
import { connect } from 'react-redux'
import { getPlan, editPlan, getAttainmentRules,getTime,checkCalcStatus  } from '../actions'
import Login from './Accounts/Login'


import Loader from '../Loader'

import PlanForm from './PlanForm'

class PlanEdit extends React.Component {
  componentDidMount(){
    this.props.getTime()
    this.props.getPlan({"plan_id": this.props.match.params.plan_id})
    this.props.getAttainmentRules()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.editPlan(formValues)
  }

  populateDropdown(){
    return this.props.attainmentRules
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
          <div className='ui container containermargin'><PlanForm title='Editing Plan' onSubmit={this.onSubmit} initialValues={this.props.plan} populateDropdown={this.populateDropdown()} /></div>
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
    plans: state.plans.plans,
    plan: state.plans.plan,
    calc: state.calc.calc,
    attainmentRules: Object.values(state.attainmentRules.attainmentRules),
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlan, editPlan, getAttainmentRules ,getTime,checkCalcStatus })(PlanEdit)
