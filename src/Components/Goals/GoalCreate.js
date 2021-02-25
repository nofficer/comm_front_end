import React from 'react'
import { connect } from 'react-redux'
import { createGoal,getTime,getAttainmentRules,getUsers,checkCalcStatus } from '../../actions'
import Login from '../Accounts/Login'

import Loader from '../../Loader'

import GoalForm from './GoalForm'

class GoalCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
    this.props.getUsers()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.createGoal(formValues)
  }

  populateDropdown(){
    return this.props.attainmentRules
  }
  populateDropdownUser(){
    return this.props.users
  }




  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }
      else{
        return (
          <div className='ui container containermargin'><GoalForm title='Creating Goal' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} populateDropdownUser={this.populateDropdownUser()} /></div>
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
    attainmentRules: state.attainmentRules.attainmentRules,
    users: state.users.users
  }
}

export default connect(mapStateToProps, { createGoal,getTime,getAttainmentRules,getUsers,checkCalcStatus })(GoalCreate)
