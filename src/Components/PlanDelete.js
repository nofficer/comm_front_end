import React from 'react'
import { connect } from 'react-redux'
import { getPlan ,deletePlan,getAttainmentRules,checkPlanUse} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'

class PlanDelete extends React.Component {

  componentDidMount(){
    this.props.getPlan({"plan_id": this.props.match.params.plan_id})
    this.props.checkPlanUse({"plan_id": this.props.match.params.plan_id})
  }

  renderContent(){
    if(!this.props.plans){
      return 'Are you sure you wish to delete this plan?'
    }
    else if(this.props.check != "In Use"){
      return `Are you sure you wish to delete ${this.props.plans.plan_name}`
    }
    else {
      return `You cannot delete ${this.props.plans.plan_name} because it is in use`
    }


  }


  renderActions(){
    const id = this.props.match.params.plan_id
    if(this.props.check != "In Use"){
    return (
      <React.Fragment>
                <button
                onClick={() => this.props.deletePlan({"plan_id": this.props.plans.plan_id})}
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
    return(<Modal
      title="Delete Plan"
      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/planShow')}
    />)


}

}

const mapStateToProps = (state) => {
  return {
    plans: state.plans.plans,
    check: state.check.check
  }
}

export default connect(mapStateToProps, { getPlan,deletePlan,getAttainmentRules,checkPlanUse })(PlanDelete)
