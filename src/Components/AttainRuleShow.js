import React from 'react'
import { connect } from 'react-redux'
import { getAttainmentRules,deleteAttainmentRule,getTime,clearFilter,setFilter } from '../actions'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'



class AttainRuleShow extends React.Component {

  componentDidMount(){
    this.props.clearFilter()
    this.props.getAttainmentRules()
    this.props.getTime()
  }

  filterMap = {
    'rule_id':0,
    'rule_name':1,
    'calc_type':2,
    'filter':3,
    'metric':4,
    'timeframe':5,
    'plan_name':6,
    'goal_use':8
  }

  createItem(attainRule){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(attainRule[this.filterMap[filter]] == null){
        check = false
      }
      else if(attainRule[this.filterMap[filter]] != null){
        if(!attainRule[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
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
  }

  renderList(){

    return this.props.attainmentRules.map((attainRule) => {
      return (this.createItem(attainRule))
    })

  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui grid'>
        <h1 className='pagetitle'>Attainment Rules</h1>

        <table className='ui celled table'>

          <thead>
          <tr>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('calc_type',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('filter',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('metric',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('timeframe',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('goal_use',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>

            </td>
            </tr>
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
    account: state.account.account,
    filter: state.filter.filter
  }
}

export default connect(mapStateToProps, { getAttainmentRules,deleteAttainmentRule,getTime,clearFilter,setFilter })(AttainRuleShow)
