import React from 'react'
import { connect } from 'react-redux'
import { createGoal,getTime,getAttainmentRules,getUsers } from '../../actions'
import Login from '../Accounts/Login'
import { Field, reduxForm } from 'redux-form'

import GoalForm from './GoalForm'

class GoalCreate extends React.Component {
  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
    this.props.getUsers()
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
    if(this.props.account['role'] == 'admin'){
        return (
          <div className='ui container containermargin'><GoalForm title='Creating Goal' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} populateDropdownUser={this.populateDropdownUser()} /></div>
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
    attainmentRules: state.attainmentRules.attainmentRules,
    users: state.users.users
  }
}

export default connect(mapStateToProps, { createGoal,getTime,getAttainmentRules,getUsers })(GoalCreate)
