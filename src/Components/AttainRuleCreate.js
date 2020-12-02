import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createAttainRule, getAttainmentRules,getTime } from '../actions'
import Login from './Accounts/Login'





import { Field, reduxForm } from 'redux-form'

import AttainRuleForm from './AttainRuleForm'

class AttainRuleCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
  }

  onSubmit = (formValues) => {
    this.props.createAttainRule(formValues)
  }




  render(){
    if(this.props.account['role'] == 'admin'){
      return (
        <div><AttainRuleForm onSubmit={this.onSubmit} /></div>
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

export default connect(mapStateToProps, { createAttainRule, getAttainmentRules,getTime })(AttainRuleCreate)
