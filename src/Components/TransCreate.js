import React from 'react'
import { connect } from 'react-redux'
import { createTrans, getTrans,getUsers } from '../actions'
import moment from 'moment'

import { Field, reduxForm } from 'redux-form'

import TransForm from './TransForm'

class TransCreate extends React.Component {
  componentDidMount(){
    this.props.getTrans()
    this.props.getUsers()
  }

  onSubmit = (formValues) => {
    this.props.createTrans(formValues)
  }

  populateDropdown(){
    return this.props.users
  }


  render(){
      return (
        <div><TransForm onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    trans: Object.values(state.trans.trans),
    users: Object.values(state.users.users)
  }
}

export default connect(mapStateToProps, { getTrans, createTrans, getUsers })(TransCreate)
