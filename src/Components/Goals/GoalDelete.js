import React from 'react'
import { connect } from 'react-redux'
import { getGoal ,deleteGoal,getGoals,getTime,checkCalcStatus} from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import history from '../../history'
import Login from '../Accounts/Login'
import Loader from '../../Loader'

class GoalDelete extends React.Component {

  componentDidMount(){
    this.props.getTime()
    this.props.getGoal({"goal_id": this.props.match.params.goal_id})
    this.props.checkCalcStatus()
  }

  renderContent(){
    if(!this.props.rule){
      return 'Are you sure you wish to delete this goal?'
    }
  }

  renderActions(){
    console.log(this.props.rateTable)
      return (

        <React.Fragment>
                  <button
                  onClick={() => this.props.deleteGoal({"goal_id": this.props.goal.goal_id})}
                  className='ui button negative'>Delete
                  </button>
                  <Link className='ui button' to='/GoalShow'>Cancel</Link>
        </React.Fragment>
      )


  }



  render(){

    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }
      else {
        return(<Modal
          title="Delete Goal"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/GoalShow')}
        />)
      }

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
    rateTables: state.rateTables.rateTables,
    rateTable: state.rateTables.rateTable,
    account: state.account.account,
    goals: state.goals.goals,
    calc: state.calc.calc,
    goal: state.goals.goal
  }
}

export default connect(mapStateToProps, { getGoal,deleteGoal,getGoals,getTime,checkCalcStatus})(GoalDelete)
