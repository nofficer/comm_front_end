import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createRateTable } from '../../actions'

import { Field, reduxForm } from 'redux-form'

import RateTableForm from './RateTableForm'

class RateTableCreate extends React.Component {
  componentDidMount(){
    this.props.getPlans()
  }

  onSubmit = (formValues) => {
    this.props.createRateTable(formValues)
  }

  populateDropdown(){
    return this.props.plans
  }




  render(){
      return (
        <div><RateTableForm onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans),
    rateTables: Object.values(state.rateTables.rateTables)
  }
}

export default connect(mapStateToProps, { createRateTable,getPlans })(RateTableCreate)
