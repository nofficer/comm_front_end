import React from 'react'
import { connect } from 'react-redux'
import { getPlan, editPlan, getAttainmentRules } from '../actions'

import { Field, reduxForm } from 'redux-form'

import PlanForm from './PlanForm'

class PlanEdit extends React.Component {
  componentDidMount(){
    this.props.getPlan({"plan_id": this.props.match.params.plan_id})
    this.props.getAttainmentRules()
  }

  onSubmit = (formValues) => {
    this.props.editPlan(formValues)
  }

  populateDropdown(){
    console.log(this.props.attainmentRules)
    return this.props.attainmentRules
  }


  render(){
      return (
        <div><PlanForm onSubmit={this.onSubmit} initialValues={this.props.plans} populateDropdown={this.populateDropdown()} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
    attainmentRules: Object.values(state.attainmentRules.attainmentRules)
  }
}

export default connect(mapStateToProps, { getPlan, editPlan, getAttainmentRules })(PlanEdit)
