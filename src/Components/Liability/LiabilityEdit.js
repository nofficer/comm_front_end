import React from 'react'
import { connect } from 'react-redux'
import { getPlans, getLiability,editLiability,getTime,getAttainmentRules,getUsers } from '../../actions'
import Login from '../Accounts/Login'





import { Field, reduxForm } from 'redux-form'

import LiabilityForm from './LiabilityForm'

class LiabilityEdit extends React.Component {
  componentDidMount(){
    this.props.getLiability({"liability_id": this.props.match.params.liability_id})
    this.props.getPlans()
    this.props.getTime()
    this.props.getAttainmentRules()
    this.props.getUsers()
  }

  onSubmit = (formValues) => {
    this.props.editLiability(formValues,{"liability_id": this.props.match.params.liability_id})
  }




  render(){

    if(this.props.account['role'] == 'admin'){
      return (
        <div><LiabilityForm title='Editing Liability' onSubmit={this.onSubmit} editing="yes" initialValues={this.props.liability}  /></div>
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
    rateTables: state.rateTables.rateTables,
    rateTable: state.rateTables.rateTable,
    plans: Object.values(state.plans.plans),
    account: state.account.account,
    attainmentRules: state.attainmentRules.attainmentRules,
    users: state.users.users,
    liability: state.payouts.liability
  }
}

export default connect(mapStateToProps, { editLiability, getLiability, getPlans,getTime,getAttainmentRules,getUsers})(LiabilityEdit)
