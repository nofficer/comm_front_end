import React from 'react'
import { connect } from 'react-redux'
import { getPlans, getRateTable,editRateTable,getTime,getAttainmentRules } from '../../actions'
import Login from '../Accounts/Login'





import { Field, reduxForm } from 'redux-form'

import RateTableForm from './RateTableForm'

class RateTableEdit extends React.Component {
  componentDidMount(){
    this.props.getRateTable({"rate_id": this.props.match.params.rate_id})
    this.props.getPlans()
    this.props.getTime()
    this.props.getAttainmentRules()
  }

  onSubmit = (formValues) => {
    this.props.editRateTable(formValues,{"rate_id": this.props.match.params.rate_id})
  }

  populateDropdown(){
    return this.props.attainmentRules
  }




  render(){

    if(this.props.account['role'] == 'admin'){
      return (
        <div className='ui container containermargin'><RateTableForm title='Editing Rate' onSubmit={this.onSubmit} editing="yes" initialValues={this.props.rateTable} populateDropdown={this.populateDropdown()} /></div>
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
    rateTables: state.rateTables.rateTables,
    rateTable: state.rateTables.rateTable,
    plans: Object.values(state.plans.plans),
    account: state.account.account,
    attainmentRules: state.attainmentRules.attainmentRules
  }
}

export default connect(mapStateToProps, { editRateTable, getRateTable, getPlans,getTime,getAttainmentRules})(RateTableEdit)
