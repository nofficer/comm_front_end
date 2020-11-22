import React from 'react'
import { connect } from 'react-redux'
import { getPlans, getRateTable,editRateTable } from '../../actions'

import { Field, reduxForm } from 'redux-form'

import RateTableForm from './RateTableForm'

class RateTableEdit extends React.Component {
  componentDidMount(){
    this.props.getRateTable({"rate_id": this.props.match.params.rate_id})
    this.props.getPlans()
  }

  onSubmit = (formValues) => {
    this.props.editRateTable(formValues,{"rate_id": this.props.match.params.rate_id})
  }

  populateDropdown(){
    return this.props.plans
  }




  render(){

      return (
        <div><RateTableForm onSubmit={this.onSubmit} initialValues={this.props.rateTable} populateDropdown={this.populateDropdown()} /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    rateTable: state.rateTables.rateTables,
    plans: Object.values(state.plans.plans)
  }
}

export default connect(mapStateToProps, { editRateTable, getRateTable, getPlans})(RateTableEdit)
