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
        <Link onClick={(e) => e.stopPropagation()} to={`/planShow/delete/${plan[0]}`} className='ui small button negative'>
          Delete
        </Link>

      </tr>
    )
  }

  renderList(){
    return this.props.plans.map((plan) => {
      return (this.createItem(plan))
    })

  }


  render(){

      return (<div>
        <h1>Plans</h1>
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
