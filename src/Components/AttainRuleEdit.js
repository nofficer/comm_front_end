import React from 'react'
import { connect } from 'react-redux'
import { getPlans, editAttainmentRule, getAttainmentRule ,getTime,checkCalcStatus } from '../actions'

import Login from './Accounts/Login'

import Loader from '../Loader'




import { Field, reduxForm } from 'redux-form'

import AttainRuleForm from './AttainRuleForm'

class AttainRuleEdit extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRule({"rule_id": this.props.match.params.rule_id})
    this.props.getTime()
    this.props.checkCalcStatus()
    this.props.getPlans()
  }

  onSubmit = (formValues) => {
    this.props.editAttainmentRule(formValues)
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
          <div className='ui container containermargin'><AttainRuleForm title={this.props.attainmentRule['rule_name']} onSubmit={this.onSubmit} initialValues={this.props.attainmentRule} populateDropdown={this.populateDropdown()} /></div>
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
    attainmentRule: state.attainmentRules.rule,
    attainmentRules: state.attainmentRules.attainmentRules,
    account: state.account.account,
    calc: state.calc.calc,
    plans: state.plans.plans
  }
}

export default connect(mapStateToProps, { editAttainmentRule, getAttainmentRule ,getTime,getPlans,checkCalcStatus })(AttainRuleEdit)
