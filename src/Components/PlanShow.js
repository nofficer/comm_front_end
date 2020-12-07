import React from 'react'
import { connect } from 'react-redux'
import { getPlans ,deletePlan,getAttainmentRules,getTime} from '../actions'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'

class PlanShow extends React.Component {

  componentDidMount(){
    this.props.getPlans()
    this.props.getAttainmentRules()
    this.props.getTime()
  }

  createItem(plan){
    return (

      <tr>
        <td>{plan[0]}</td><td>{plan[1]}</td>
        <td>
        <Link onClick={(e) => e.stopPropagation()} to={`/planShow/edit/${plan[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/planShow/delete/${plan[0]}`} className='ui small button negative'>
          Delete
        </Link>
        </td>
      </tr>
    )
  }

  renderList(){
    return this.props.plans.map((plan) => {
      return (this.createItem(plan))
    })

  }


  render(){

    if(this.props.account['role'] == 'admin'){
      return (<div>
        <h1>Plans</h1>
        <table className='ui celled table'>
        <thead>
          <tr>
            <th><strong>Plan ID</strong></th>
            <th><strong>Plan Name</strong></th>
            <th><strong>Options</strong></th>
          </tr>
        </thead>
        {this.renderList()}
        </table>
        </div>

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
    plans: Object.values(state.plans.plans),
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPlans,deletePlan,getAttainmentRules,getTime })(PlanShow)
