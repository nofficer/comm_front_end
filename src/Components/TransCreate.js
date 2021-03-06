import React from 'react'
import { connect } from 'react-redux'
import { createTrans,getUsers ,getTime,checkCalcStatus } from '../actions'
import moment from 'moment'
import Login from './Accounts/Login'

import Loader from '../Loader'
import TransForm from './TransForm'

class TransCreate extends React.Component {
  componentDidMount(){

    this.props.getUsers()
    this.props.getTime()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.createTrans(formValues)
  }

  populateDropdown(){
    return this.props.users
  }


  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><TransForm title='Creating Transaction' onSubmit={this.onSubmit} month={this.props.month}  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
        )
      }

    }

    else if(typeof(this.props.account['user_id']) !== "undefined"){
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
    calc: state.calc.calc,
    account: state.account.account

  }
}

export default connect(mapStateToProps, {createTrans, getUsers,getTime,checkCalcStatus  })(TransCreate)
