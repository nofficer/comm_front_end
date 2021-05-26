import React from 'react'
import { connect } from 'react-redux'
import { getAttainmentRules,deleteAttainmentRule,getTime,clearFilter,setFilter } from '../actions'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'
import globals from './globals'


const custom_field = globals.custom_field




class AttainRuleShow extends React.Component {

  componentDidMount(){
    this.props.clearFilter()
    this.props.getAttainmentRules()
    this.props.getTime()
  }

  fixField(item){
    if(item === 'Ote_Custom'){
      return ('Ote_' + custom_field)
    }
    else if(item === 'Custom'){
      return(custom_field)
    }
    else if(item === 'Retro_Custom'){
      return('Retro_' + custom_field)
    }
    else {
      return item
    }
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

      return true
        }
    )

    if(
      check
    ){
    return (
      <tr key={attainRule[0]}>
        <td className='center aligned'>{attainRule[0]}</td><td className='center aligned'>{attainRule[1]}</td><td className='center aligned'>{this.fixField(attainRule[2])}</td><td className='center aligned'>{attainRule[3]}</td><td className='center aligned'>{attainRule[4].toUpperCase()}</td><td className='center aligned'>{attainRule[5].toUpperCase()}</td><td className='center aligned'>{attainRule[6]}</td><td className='center aligned'>{attainRule[8].toUpperCase()}</td>
        <td className='center aligned'>
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
    if(this.props.account['role'] === 'admin'){
      return (<div className='ui container containermargin'>
      <div className='ui grid marginbox'>
      <div className='sixteen wide column'></div>

      <div className='sixteen wide column'>
      <div className='ui center aligned grid'>
        <h1 className=''>Attainment Rules</h1>
        </div>
      </div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      </div>
      <div style={{overflow:'auto', whitespace:'nowrap',"transform":"rotateX(180deg)"}} className='ui container containermargin'>
      <table  className='ui celled unstackable table' style={{"transform":"rotateX(180deg)"}}>

          <thead>
          <tr>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('calc_type',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('filter',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('metric',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('timeframe',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('plan_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('goal_use',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>

            </td>
            </tr>
            <tr>
              <th className='center aligned'><strong>Attainment Rule ID</strong></th>
              <th className='center aligned'><strong>Attainment Rule Name</strong></th>
              <th className='center aligned'><strong>Calculation Type</strong></th>
              <th className='center aligned'><strong>Filter</strong></th>
              <th className='center aligned'><strong>Metric</strong></th>
              <th className='center aligned'><strong>Timeframe</strong></th>
              <th className='center aligned'><strong>Plan Name</strong></th>
              <th className='center aligned'><strong>Goal Use</strong></th>
              <th className='center aligned'><strong>Options</strong></th>
            </tr>
          </thead>
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
        </div>

        </div>
      )
    }

    else if(typeof(this.props.account['user_id']) !== "undefined"){
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
