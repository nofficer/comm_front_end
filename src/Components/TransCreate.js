import React from 'react'
import { connect } from 'react-redux'
import { createTrans, getTrans,getUsers ,getTime} from '../actions'
import moment from 'moment'
import Login from './Accounts/Login'
import { Field, reduxForm } from 'redux-form'

import TransForm from './TransForm'

class TransCreate extends React.Component {
  componentDidMount(){
    this.props.getTrans()
    this.props.getUsers()
    this.props.getTime()
  }

  onSubmit = (formValues) => {
    this.props.createTrans(formValues)
  }

  populateDropdown(){
    return this.props.users
  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (
        <div><TransForm title='Creating Transaction' onSubmit={this.onSubmit} month={this.props.month}  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
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
    trans: Object.values(state.trans.trans),
    users: Object.values(state.users.users),
    month: state.month.month,
    account: state.account.account

  }
}

export default connect(mapStateToProps, { getTrans, createTrans, getUsers,getTime })(TransCreate)
