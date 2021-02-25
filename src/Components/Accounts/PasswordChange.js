import React from 'react'
import { connect } from 'react-redux'
import {  getPlans ,getUser,editUser,getTime,updateAccount } from '../../actions'



import history from '../../history'
import Login from './Login'

import UserForm from '../UserForm'

class PasswordChange extends React.Component {
  componentDidMount(){
    try{
      this.props.getUser({"user_id": history.location.state.detail})
    }
    catch{

      console.log('unauthorized attempt to change password')
    }

    this.props.getPlans()
    this.props.getTime()


  }

  onSubmit = (formValues) => {
    formValues['user_id'] = history.location.state.detail
    formValues['new_password'] = formValues['password']
    formValues['perms'] = 'seller'
    this.props.updateAccount(formValues)
  }
  onSubmitAdmin = (formValues) => {
    formValues['user_id'] = history.location.state.detail
    formValues['new_password'] = formValues['password']
    formValues['perms'] = 'admin'
    this.props.updateAccount(formValues)
  }


  populateDropdown(){
    return this.props.plans
  }


// {'trans_gp':this.props.trans['trans_gp'], 'trans_rev':this.props.trans['trans_rev'], 'trans_seller_id':this.props.trans['trans_seller_id'],'trans_type':this.props.trans['trans_type']} initialValues={this.props.trans}
  render(){
    if(typeof(history.location.state)=='undefined'){
      return(<Login/>)
    }
    if(this.props.account['role'] === 'admin'){
      return <div> <UserForm title={`Change Password - ${history.location.state.detail}`} perms='admin'  onSubmit={this.onSubmitAdmin} editing="password" populateDropdown={this.populateDropdown()} /></div>
    }
    else if (this.props.account['user_id'] === history.location.state.detail){
      return <div> <UserForm title='Change Password' perms='seller' errors={history.location.state.errors}  onSubmit={this.onSubmit} editing="password" populateDropdown={this.populateDropdown()} /></div>
    }
    else{
      return(<Login/>)
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
