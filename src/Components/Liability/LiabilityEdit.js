import React from 'react'
import { connect } from 'react-redux'
import { getPlans, getLiability,editLiability,getTime,getAttainmentRules,getUsers,checkCalcStatus  } from '../../actions'
import Login from '../Accounts/Login'
import Loader from '../../Loader'






import LiabilityForm from './LiabilityForm'

class LiabilityEdit extends React.Component {
  componentDidMount(){
    this.props.getLiability({"liability_id": this.props.match.params.liability_id})
    this.props.getPlans()
    this.props.getTime()
    this.props.getAttainmentRules()
    this.props.getUsers()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.editLiability(formValues,{"liability_id": this.props.match.params.liability_id})
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
          <div className='ui container containermargin'><LiabilityForm title='Editing Liability' onSubmit={this.onSubmit} editing="yes" initialValues={this.props.liability}  /></div>
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
    rateTables: state.rateTables.rateTables,
    rateTable: state.rateTables.rateTable,
    plans: Object.values(state.plans.plans),
    account: state.account.account,
    calc: state.calc.calc,
    attainmentRules: state.attainmentRules.attainmentRules,
    users: state.users.users,
    liability: state.payouts.liability
  }
}

export default connect(mapStateToProps, { editLiability, getLiability, getPlans,getTime,getAttainmentRules,getUsers,checkCalcStatus })(LiabilityEdit)
