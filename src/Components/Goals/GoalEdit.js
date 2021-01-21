import React from 'react'
import { connect } from 'react-redux'
import { getPlans, getGoal,editGoal,getTime,getAttainmentRules,getUsers,checkCalcStatus  } from '../../actions'
import Login from '../Accounts/Login'

import Loader from '../../Loader'



import { Field, reduxForm } from 'redux-form'

import GoalForm from './GoalForm'

class GoalEdit extends React.Component {
  componentDidMount(){
    this.props.getGoal({"goal_id": this.props.match.params.goal_id})
    this.props.getPlans()
    this.props.getTime()
    this.props.getAttainmentRules()
    this.props.getUsers()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.editGoal(formValues,{"goal_id": this.props.match.params.goal_id})
  }

  populateDropdown(){
    return this.props.attainmentRules
  }
  populateDropdownUser(){
    return this.props.users
  }



  render(){

    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><GoalForm title='Editing Goal' onSubmit={this.onSubmit} editing="yes" initialValues={this.props.goal} populateDropdown={this.populateDropdown()} populateDropdownUser={this.populateDropdownUser()}  /></div>
        )
      }


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
    calc: state.calc.calc,
    attainmentRules: state.attainmentRules.attainmentRules,
    users: state.users.users,
    goal: state.goals.goal
  }
}

export default connect(mapStateToProps, { editGoal, getGoal, getPlans,getTime,getAttainmentRules,getUsers,checkCalcStatus })(GoalEdit)
