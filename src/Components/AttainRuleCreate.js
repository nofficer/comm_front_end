import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createAttainRule, getAttainmentRules,getTime,checkCalcStatus  } from '../actions'
import Login from './Accounts/Login'
import Loader from '../Loader'




import { Field, reduxForm } from 'redux-form'

import AttainRuleForm from './AttainRuleForm'

class AttainRuleCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
    this.props.getPlans()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.createAttainRule(formValues)
  }

  populateDropdown(){
    return this.props.plans
  }




  render(){
    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><AttainRuleForm title="Creating Attainment Rule" onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
        )
      }

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
    account: state.account.account,
    calc: state.calc.calc,
    plans: state.plans.plans
  }
}

export default connect(mapStateToProps, { createAttainRule, getAttainmentRules,getTime,getPlans,checkCalcStatus  })(AttainRuleCreate)
