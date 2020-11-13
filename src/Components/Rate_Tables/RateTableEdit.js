import React from 'react'
import { connect } from 'react-redux'
import { getPlans, editAttainmentRule, getAttainmentRule } from '../../actions'

import { Field, reduxForm } from 'redux-form'

import AttainRuleForm from './AttainRuleForm'

class AttainRuleEdit extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRule({"rule_id": this.props.match.params.rule_id})
  }

  onSubmit = (formValues) => {
    this.props.editAttainmentRule(formValues)
  }




  render(){
    console.log(this.props.attainmentRule)
      return (
        <div><AttainRuleForm onSubmit={this.onSubmit} initialValues={this.props.attainmentRule} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    attainmentRule: state.attainmentRules.attainmentRules
  }
}

export default connect(mapStateToProps, { editAttainmentRule, getAttainmentRule })(AttainRuleEdit)
