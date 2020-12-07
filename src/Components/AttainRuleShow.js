import React from 'react'
import { connect } from 'react-redux'
import { getAttainmentRules,deleteAttainmentRule,getTime } from '../actions'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'



class AttainRuleShow extends React.Component {

  componentDidMount(){
    this.props.getAttainmentRules()
    this.props.getTime()
  }

  createItem(attainRule){
    return (
      <tr>
        <td>{attainRule[0]}</td><td>{attainRule[1]}</td><td>{attainRule[2]}</td><td>{attainRule[3]}</td><td>{attainRule[4].toUpperCase()}</td><td>{attainRule[5].toUpperCase()}</td><td>{attainRule[6]}</td><td>{attainRule[8].toUpperCase()}</td>
        <td>
        <Link onClick={(e) => e.stopPropagation()} to={`/attainRuleShow/edit/${attainRule[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={{pathname:`/attainRuleShow/delete/${attainRule[0]}`, state:{plan_id:attainRule[7]}}} className='ui small button negative'>
          Delete
        </Link>
        </td>
      </tr>
    )
  }

  renderList(){

    return this.props.attainmentRules.map((attainRule) => {
      return (this.createItem(attainRule))
    })

  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui grid'>
        <h1>Attainment Rules</h1>

        <table className='ui celled table'>

          <thead>
            <tr>
              <th><strong>Attainment Rule ID</strong></th>
              <th><strong>Attainment Rule Name</strong></th>
              <th><strong>Calculation Type</strong></th>
              <th><strong>Filter</strong></th>
              <th><strong>Metric</strong></th>
              <th><strong>Timeframe</strong></th>
              <th><strong>Plan Name</strong></th>
              <th><strong>Goal Use</strong></th>
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
    attainmentRules: Object.values(state.attainmentRules.attainmentRules),
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getAttainmentRules,deleteAttainmentRule,getTime })(AttainRuleShow)
