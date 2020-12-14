import React from 'react'
import { connect } from 'react-redux'
import { getGoals,getTime,clearFilter,setFilter,clearGoalError } from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import Login from '../Accounts/Login'






class GoalShow extends React.Component {

  componentDidMount(){
    this.props.getGoals()
    this.props.getTime()
    this.props.clearFilter()
  }

  filterMap = {
    'goal_id':0,
    'user_name':7,
    'rule_name':6,
    'start':3,
    'end':4,
    'goal':5,
    'timeframe':8
  }

  createItem(goal){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(goal[this.filterMap[filter]] == null){
        check = false
      }
      else if(goal[this.filterMap[filter]] != null){
        if(!goal[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
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
        <td>{goal[0]}</td><td>{goal[7]}</td><td>{goal[6]}</td><td>{goal[3]}</td><td>{goal[4]}</td><td>{goal[5]}</td><td>{goal[8].toUpperCase()}</td>
        <td>
        <Link onClick={(e) => e.stopPropagation()} to={`/goalShow/edit/${goal[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/goalShow/delete/${goal[0]}`} className='ui small button negative'>
          Delete
        </Link>
        </td>
      </tr>
    )
  }
  }

  renderList(){

    return this.props.goals.map((goal) => {
      return (this.createItem(goal))
    })

  }


  render(){
    if(this.props.error == 'id'){
      return <Modal onDismiss={this.props.clearGoalError} title='Error in Goal Creation' content='A goal with that ID already exists' actions='Ok'/>
    }

    else{
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui grid'>
      <div className='sixteen wide column'>
        <h1 className='pagetitle'>Goals</h1>
        </div>

        <table className='ui celled table'>

          <thead>
          <tr>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('goal_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('user_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('start',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('end',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('goal',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('timeframe',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>

            </td>
            </tr>
            <tr>
              <th><strong>Goal ID</strong></th>
              <th><strong>User</strong></th>
              <th><strong>Attainment Rule</strong></th>
              <th><strong>Start Date</strong></th>
              <th><strong>End Date</strong></th>

              <th><strong>Goal</strong></th>
              <th><strong>Timeframe</strong></th>
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
}

const mapStateToProps = (state) => {
  return {
    rateTables: Object.values(state.rateTables.rateTables),
    account: state.account.account,
    goals: state.goals.goals,
    filter: state.filter.filter,
    error: state.errors.errors
  }
}

export default connect(mapStateToProps, { getGoals,getTime,clearFilter,setFilter,clearGoalError })(GoalShow)
