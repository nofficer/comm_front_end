import React from 'react'
import { connect } from 'react-redux'
import { getRoleHierarchies,getTime,setFilter,clearFilter } from '../../actions'
import { Link } from 'react-router-dom'

import Login from '../Accounts/Login'






class RoleHierarchyShow extends React.Component {

  filterMap = {
    'user_id':'user_id',
    'mgr_id':'mgr_id',
    'level':'level',
    'dept':'dept'

  }

  componentDidMount(){
    this.props.clearFilter()
    this.props.getRoleHierarchies()
    this.props.getTime()
  }

  createItem(role){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(role[this.filterMap[filter]] === null){
        check = false
      }
      else if(role[this.filterMap[filter]] != null){
        if(!role[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
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
            <tr key={role['user_id']}>
              <td className='center aligned'>{role['user_id']}</td><td className='center aligned'>{role['mgr_id']}</td><td className='center aligned'>{role['level']}</td><td className='center aligned'>{role['dept']}</td>
              <td className='center aligned'>
              <Link onClick={(e) => e.stopPropagation()} to={`/RoleHierarchyShow/edit/${role['user_id']}`} className='ui small button primary'>
                Edit
              </Link>
              <Link onClick={(e) => e.stopPropagation()} to={`/RoleHierarchyShow/delete/${role['user_id']}`} className='ui small button negative'>
                Delete
              </Link>
              </td>
            </tr>
          )
    }


  }

  renderList(){

    return this.props.roles.map((role) => {
      return (this.createItem(role))
    })

  }


  render(){
    if(this.props.account['role'] === 'admin'){
      return (<div className='ui container containermargin'>
        <div className='ui grid'>
        <div className='sixteen wide column'></div>

        <div className='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>Role Hierarchy</h1>
          </div>
        </div>
        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>

        </div>
        <div className='containermargin' style={{"overflowX": "scroll"}}>
        <table className='ui celled table'>

          <thead>
          <tr>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('user_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('mgr_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('level',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('dept',e.target.value))} placeholder="Search..."/>
              </div>
            </td>

            </tr>
            <tr>
              <th className='center aligned'><strong>User ID</strong></th>
              <th className='center aligned'><strong>Mgr ID</strong></th>
              <th className='center aligned'><strong>Level</strong></th>
              <th className='center aligned'><strong>Department</strong></th>
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
    roles: Object.values(state.roles.roles),
    account: state.account.account,
    filter: state.filter.filter
  }
}

export default connect(mapStateToProps, { getRoleHierarchies,getTime,setFilter,clearFilter })(RoleHierarchyShow)
