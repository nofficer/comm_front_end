import React from 'react'
import { connect } from 'react-redux'
import {  getPlans ,getUser,editUser } from '../actions'
import moment from 'moment'
import _ from 'lodash'

import { Field, reduxForm } from 'redux-form'

import UserForm from './UserForm'

class UserEdit extends React.Component {
  componentDidMount(){
    this.props.getUser({"user_id": this.props.match.params.user_id})
    this.props.getPlans()

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
      console.log(this.props.users)
      return (
        <div><UserForm onSubmit={this.onSubmit} initialValues={this.props.users}  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    trans: state.trans.trans,
    users: state.users.users,
    plans: state.plans.plans
  }
}

export default connect(mapStateToProps, { getPlans, getUser,editUser })(UserEdit)
