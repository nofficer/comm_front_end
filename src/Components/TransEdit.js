import React from 'react'
import { connect } from 'react-redux'
import {  getTran ,getUsers,editTrans,getTime } from '../actions'
import moment from 'moment'
import _ from 'lodash'
import Login from './Accounts/Login'

import { Field, reduxForm } from 'redux-form'

import TransForm from './TransForm'

class TransEdit extends React.Component {
  componentDidMount(){
    this.props.getUsers()
    this.props.getTran({"trans_id": this.props.match.params.trans_id})
    this.props.getTime()

    const trans_id = this.props.match.params.trans_id
  }

  onSubmit = (formValues) => {
    this.props.editTrans(formValues)
  }

  populateDropdown(){
    return this.props.users
  }


// {'trans_gp':this.props.trans['trans_gp'], 'trans_rev':this.props.trans['trans_rev'], 'trans_seller_id':this.props.trans['trans_seller_id'],'trans_type':this.props.trans['trans_type']} initialValues={this.props.trans}
  render(){
    if(this.props.account['role'] == 'admin'){
      return (
        <div><TransForm onSubmit={this.onSubmit} initialValues={this.props.tran} month={this.props.month} editing="yes"  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
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
    trans: state.trans.trans,
    tran:state.trans.tran,
    users: Object.values(state.users.users),
    month: state.month.month,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getTran, getUsers,editTrans,getTime })(TransEdit)
