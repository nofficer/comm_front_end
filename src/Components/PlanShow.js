import React from 'react'
import { connect } from 'react-redux'
import { getPlans ,deletePlan,getAttainmentRules} from '../actions'
import { Link } from 'react-router-dom'

class PlanShow extends React.Component {

  componentDidMount(){
    this.props.getPlans()
    this.props.getAttainmentRules()
  }

  createItem(plan){
    return (

      <tr>
        <th>{plan[0]}</th><th>{plan[1]}</th><th>{plan[2]}</th>

        <Link onClick={(e) => e.stopPropagation()} to={`/planShow/edit/${plan[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <button onClick={() => this.props.deletePlan({"plan_id": plan[0]}) } className='ui small button negative'>
          Delete
        </button>

      </tr>
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
        <table className='ui celled table'>
        <thead>
          <tr>
            <th><strong>Plan ID</strong></th>
            <th><strong>Plan Name</strong></th>
            <th><strong>Attainment Rule</strong></th>
            <th><strong>Options</strong></th>
          </tr>
        </thead>
        {this.renderList()}
        </table>
        </div>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans)
  }
}

export default connect(mapStateToProps, { getPlans,deletePlan,getAttainmentRules })(PlanShow)
