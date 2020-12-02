import React from 'react'
import { connect } from 'react-redux'
import { getPlan ,deletePlan,getAttainmentRules,checkPlanUse,getTime} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'
import Login from './Accounts/Login'

class PlanDelete extends React.Component {

  componentDidMount(){
    this.props.getPlan({"plan_id": this.props.match.params.plan_id})
    this.props.checkPlanUse({"plan_id": this.props.match.params.plan_id})
    this.props.getTime()
  }

  renderContent(){
    if(!this.props.plan){
      return 'Are you sure you wish to delete this plan?'
    }
    else if(this.props.check != "In Use"){
      return `Are you sure you wish to delete ${this.props.plan.plan_name}`
    }
    else {
      return `You cannot delete ${this.props.plan.plan_name} because it is in use`
    }


  }


  renderActions(){
    const id = this.props.match.params.plan_id
    if(this.props.check != "In Use"){
    return (
      <React.Fragment>
                <button
                onClick={() => this.props.deletePlan({"plan_id": this.props.plan.plan_id})}
                className='ui button negative'>Delete
                </button>
                <Link className='ui button' to='/planShow'>Cancel</Link>
      </React.Fragment>
    )
  }
  else{
    return (
      <React.Fragment>
                <Link className='ui button' to='/planShow'>Cancel</Link>
      </React.Fragment>
    )
  }
  }



  render(){
    if(this.props.account['role'] == 'admin'){
      return(<Modal
        title="Delete Plan"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/planShow')}
      />)
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
    plan: state.plans.plan,
    plans: state.plans.plans,
    check: state.check.check,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlan,deletePlan,getAttainmentRules,checkPlanUse ,getTime})(PlanDelete)
