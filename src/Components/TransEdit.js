import React from 'react'
import { connect } from 'react-redux'
import {  getTran ,getUsers,editTrans,getTime ,checkCalcStatus } from '../actions'
import moment from 'moment'

import Login from './Accounts/Login'

import Loader from '../Loader'



import TransForm from './TransForm'

class TransEdit extends React.Component {
  componentDidMount(){
    this.props.getUsers()
    this.props.getTran({"trans_id": this.props.match.params.trans_id})
    this.props.getTime()
    this.props.checkCalcStatus()


  }

  onSubmit = (formValues) => {
    this.props.editTrans(formValues)
  }

  populateDropdown(){
    return this.props.users
  }




// {'trans_gp':this.props.trans['trans_gp'], 'trans_rev':this.props.trans['trans_rev'], 'trans_seller_id':this.props.trans['trans_seller_id'],'trans_type':this.props.trans['trans_type']} initialValues={this.props.trans}
  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><TransForm title='Editing Transaction' populateDropdownID={this.props.match.params.trans_id} onSubmit={this.onSubmit} initialValues={this.props.tran} month={this.props.month} editing="yes"  populateDropdown={this.populateDropdown()} date={moment().format('YYYY-MM-DD')}  /></div>
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
    trans: state.trans.trans,
    tran:state.trans.tran,
    users: Object.values(state.users.users),
    calc: state.calc.calc,
    month: state.month.month,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getTran, getUsers,editTrans,getTime,checkCalcStatus  })(TransEdit)
