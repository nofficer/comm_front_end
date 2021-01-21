import React from 'react'
import { connect } from 'react-redux'
import { getPayout,getUsers,updatePayout,checkCalcStatus} from '../../actions'
import Loader from '../../Loader'

import Login from '../Accounts/Login'





import { Field, reduxForm } from 'redux-form'

import PayoutForm from './PayoutForm'

class PayoutEdit extends React.Component {
  componentDidMount(){
    this.props.getPayout({payout_id:this.props.match.params.payout_id})
    this.props.getUsers()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    formValues['payout_id'] = this.props.match.params.payout_id
    this.props.updatePayout(formValues)
  }

  populateDropdown(){

    return this.props.users
  }





  render(){
    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }
      else {
        return (
          <div><PayoutForm onSubmit={this.onSubmit} initialValues={this.props.payout} populateDropdown={this.populateDropdown()} /></div>
        )
      }

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
    payout:state.payouts.payout,
    users:state.users.users,
    calc: state.calc.calc,
    account:state.account.account
  }
}

export default connect(mapStateToProps, {getPayout,getUsers,updatePayout,checkCalcStatus})(PayoutEdit)
