import React from 'react'
import { connect } from 'react-redux'
import { getPlans ,deletePlan,getAttainmentRules,getTime,setFilter,clearFilter} from '../actions'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'

class PlanShow extends React.Component {

  componentDidMount(){
    this.props.getPlans()
    this.props.getAttainmentRules()
    this.props.getTime()
    this.props.clearFilter()
  }

  filterMap = {
    'plan_id':0,
    'plan_name':1
  }

  createItem(plan){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(plan[this.filterMap[filter]] == null){
        check = false
      }
      else if(plan[this.filterMap[filter]] != null){
        if(!plan[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }


        }
    )

    if(
      check
    ){
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
  }

  renderList(){
    return this.props.plans.map((plan) => {
      return (this.createItem(plan))
    })

  }


  render(){

    if(this.props.account['role'] == 'admin'){
      return (<div>
        <div className='ui grid'>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>Plans</h1>
          </div>
        </div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        </div>
        <table className='ui celled table'>
        <thead>
        <tr>
          <td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('plan_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
          <td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('plan_name',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
          </tr>
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
    account: state.account.account,
    filter: state.filter.filter
  }
}

export default connect(mapStateToProps, { getPlans,deletePlan,getAttainmentRules,getTime,setFilter,clearFilter })(PlanShow)
