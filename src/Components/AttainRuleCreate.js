import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createAttainRule, getAttainmentRules } from '../actions'

import { Field, reduxForm } from 'redux-form'

import AttainRuleForm from './AttainRuleForm'

class AttainRuleCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
  }

  onSubmit = (formValues) => {
    this.props.createAttainRule(formValues)
  }




  render(){
      return (
        <div><AttainRuleForm onSubmit={this.onSubmit} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    attainmentRules: Object.values(state.attainmentRules.attainmentRules)
  }
}

export default connect(mapStateToProps, { createAttainRule, getAttainmentRules })(AttainRuleCreate)
