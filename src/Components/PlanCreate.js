import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createPlan, getAttainmentRules } from '../actions'

import { Field, reduxForm } from 'redux-form'

import PlanForm from './PlanForm'

class PlanCreate extends React.Component {
  componentDidMount(){
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
      return (
        <div><PlanForm onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    attainmentRules: Object.values(state.attainmentRules.attainmentRules)
  }
}

export default connect(mapStateToProps, { getPlans, createPlan, getAttainmentRules })(PlanCreate)
