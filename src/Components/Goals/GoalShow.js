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
        <th>{goal[0]}</th><th>{goal[7]}</th><th>{goal[6]}</th><th>{goal[3]}</th><th>{goal[4]}</th><th>{goal[5]}</th><th>{goal[8].toUpperCase()}</th>

        <Link onClick={(e) => e.stopPropagation()} to={`/goalShow/edit/${goal[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/goalShow/delete/${goal[0]}`} className='ui small button negative'>
          Delete
        </Link>
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
        <h1>Goals</h1>

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
