import React from 'react'
import { connect } from 'react-redux'
import { createRateTable,getTime,getAttainmentRules } from '../../actions'
import Login from '../Accounts/Login'
import { Field, reduxForm } from 'redux-form'

import RateTableForm from './RateTableForm'

class RateTableCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
  }

  onSubmit = (formValues) => {
    this.props.createRateTable(formValues)
  }

  populateDropdown(){
    return this.props.attainmentRules
  }




  render(){
    if(this.props.account['role'] == 'admin'){
        return (
          <div><RateTableForm title='Creating Rate' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
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
    plans: Object.values(state.plans.plans),
    rateTables: Object.values(state.rateTables.rateTables),
    account: state.account.account,
    attainmentRules: state.attainmentRules.attainmentRules
  }
}

export default connect(mapStateToProps, { createRateTable,getTime,getAttainmentRules })(RateTableCreate)
