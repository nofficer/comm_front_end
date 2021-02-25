import React from 'react'
import { connect } from 'react-redux'
import { createRateTable,getTime,getAttainmentRules,checkCalcStatus  } from '../../actions'
import Login from '../Accounts/Login'


import Loader from '../../Loader'
import RateTableForm from './RateTableForm'

class RateTableCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.createRateTable(formValues)
  }

  populateDropdown(){
    return this.props.attainmentRules
  }




  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><RateTableForm title='Creating Rate' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
        )
      }


    }

    else if(typeof(this.props.account['user_id']) !== "undefined"){
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
    calc: state.calc.calc,
    attainmentRules: state.attainmentRules.attainmentRules
  }
}

export default connect(mapStateToProps, { createRateTable,getTime,getAttainmentRules,checkCalcStatus  })(RateTableCreate)
