import React from 'react'
import { connect } from 'react-redux'
import { getPlans } from '../actions'


class PlanShow extends React.Component {

  componentDidMount(){
    this.props.getPlans()
  }

  createItem(plan){
    return (
      <div>{plan[0]} ,  {plan[1]},   {plan[2]}</div>
    )
  }

  renderList(){
    console.log(this.props.plans)
    return this.props.plans.map((plan) => {
      return (this.createItem(plan))
    })

  }


  render(){
      console.log(this.renderList())
      return (<div>
        <div><strong>Plan ID</strong> ,<strong>Plan_Name</strong>  , <strong>Attainment_Rule</strong></div>
        <div>{this.renderList()}</div>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans)
  }
}

export default connect(mapStateToProps, { getPlans })(PlanShow)
