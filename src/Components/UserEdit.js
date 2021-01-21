import React from 'react'
import { connect } from 'react-redux'
import {  getPlans ,getUser,editUser,getTime ,checkCalcStatus } from '../actions'
import moment from 'moment'
import _ from 'lodash'
import Login from './Accounts/Login'
import { Field, reduxForm } from 'redux-form'

import Loader from '../Loader'

import UserForm from './UserForm'

class UserEdit extends React.Component {
  componentDidMount(){
    this.props.getUser({"user_id": this.props.match.params.user_id})
    this.props.getPlans()
    this.props.getTime()
    this.props.checkCalcStatus()

    const user_id = this.props.match.params.user_id
  }

  onSubmit = (formValues) => {
    this.props.editUser(formValues,this.user_id)
  }

  populateDropdown(){
    return this.props.plans
  }


// {'trans_gp':this.props.trans['trans_gp'], 'trans_rev':this.props.trans['trans_rev'], 'trans_seller_id':this.props.trans['trans_seller_id'],'trans_type':this.props.trans['trans_type']} initialValues={this.props.trans}
  render(){
    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div><UserForm title={this.props.user['name']} onSubmit={this.onSubmit} initialValues={this.props.user} editing="yes"  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
        )
      }


    }

    else if(typeof(this.props.account['role']) == "seller"){
      return "You do not have sufficient permissions to access this page"
    }
    else{
      return <Login/>
    }

  }
}

const mapStateToProps = (state) => {
  return {
    trans: state.trans.trans,
    users: state.users.users,
    user: state.users.user,
    plans: state.plans.plans,
    calc: state.calc.calc,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlans, getUser,editUser ,getTime,checkCalcStatus })(UserEdit)
