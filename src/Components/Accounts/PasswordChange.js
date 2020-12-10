import React from 'react'
import { connect } from 'react-redux'
import {  getPlans ,getUser,editUser,getTime,updateAccount } from '../../actions'
import moment from 'moment'
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form'
import history from '../../history'

import UserForm from '../UserForm'

class PasswordChange extends React.Component {
  componentDidMount(){
    this.props.getUser({"user_id": history.location.state.detail})
    this.props.getPlans()
    this.props.getTime()

    const user_id = this.props.match.params.user_id
  }

  onSubmit = (formValues) => {
    formValues['user_id'] = history.location.state.detail
    this.props.updateAccount(formValues)
  }

  populateDropdown(){
    return this.props.plans
  }


// {'trans_gp':this.props.trans['trans_gp'], 'trans_rev':this.props.trans['trans_rev'], 'trans_seller_id':this.props.trans['trans_seller_id'],'trans_type':this.props.trans['trans_type']} initialValues={this.props.trans}
  render(){
    if(this.props.account['role'] == 'admin'){
      return <div> <UserForm title='Enter New Password' onSubmit={this.onSubmit} editing="password" populateDropdown={this.populateDropdown()} /></div>
    }
    else if (this.props.account['user_id'] == history.location.state.detail){
      return <div> <UserForm title='Enter New Password'  onSubmit={this.onSubmit} editing="password" populateDropdown={this.populateDropdown()} /></div>
    }
    else{
      return("You don't have permission to do that")
    }
}
}

const mapStateToProps = (state) => {
  return {
    trans: state.trans.trans,
    users: state.users.users,
    user: state.users.user,
    plans: state.plans.plans,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlans, getUser,editUser ,getTime,updateAccount})(PasswordChange)
