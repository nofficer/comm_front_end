import React from 'react'
import { connect } from 'react-redux'
import { getGoals,getTime } from '../../actions'
import { Link } from 'react-router-dom'

import Login from '../Accounts/Login'






class GoalShow extends React.Component {

  componentDidMount(){
    this.props.getGoals()
    this.props.getTime()
  }

  createItem(goal){
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

  renderList(){

    return this.props.goals.map((goal) => {
      return (this.createItem(goal))
    })

  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui grid'>
      <div className='sixteen wide column'>
        <h1 className='pagetitle'>Goals</h1>
        </div>

        <table className='ui celled table'>

          <thead>
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

const mapStateToProps = (state) => {
  return {
    rateTables: Object.values(state.rateTables.rateTables),
    account: state.account.account,
    goals: state.goals.goals
  }
}

export default connect(mapStateToProps, { getGoals,getTime })(GoalShow)
