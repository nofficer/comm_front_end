import React from 'react'
import { connect } from 'react-redux'
import {  getTran ,getUsers,editTrans } from '../actions'
import moment from 'moment'
import _ from 'lodash'

import { Field, reduxForm } from 'redux-form'

import TransForm from './TransForm'

class TransEdit extends React.Component {
  componentDidMount(){
    this.props.getUsers()
    this.props.getTran({"trans_id": this.props.match.params.trans_id})

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

      return (
        <div><TransForm onSubmit={this.onSubmit} initialValues={this.props.trans}  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    trans: state.trans.trans,
    users: Object.values(state.users.users)
  }
}

export default connect(mapStateToProps, { getTran, getUsers,editTrans })(TransEdit)
