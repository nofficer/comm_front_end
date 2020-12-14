import React from 'react'
import { connect } from 'react-redux'
import { getUsers,deleteUser,getTime,setFilter,clearFilter,clearError,clearUserError} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'
import Modal from '../Modal'

class UserShow extends React.Component {

  componentDidMount(){
    this.props.clearFilter()
    this.props.getUsers()
    this.props.getTime()
  }

  filterMap = {
    'user_id':0,
    'name':1,
    'plan_id':2,
    'plan_name':3,
    'location':4,
    'username':5,
    'role':6,
    'annual_ti':7
  }

  createItem(user){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(user[this.filterMap[filter]] == null){
        check = false
      }
      else if(user[this.filterMap[filter]] != null){
        if(!user[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }


        }
    )

    if(
      check
    ){
    return (
      <tr><td>{user[0]}</td><td>{user[1]}</td><td>{user[2]}</td><td>{user[3]}</td><td>{user[4]}</td><td>{user[5]}</td><td>{user[6]}</td><td>{user[7]}</td>
      <td><Link onClick={(e) => e.stopPropagation()} to={`/userShow/edit/${user[0]}`} className='ui small button primary'>
        Edit
      </Link>
      <Link onClick={(e) => e.stopPropagation()} to={`/userShow/delete/${user[0]}`} className='ui small button negative'>
        Delete
      </Link>
      <button onClick={(e) => e.stopPropagation(history.push({pathname:'/passwordChange',state:{detail:user[0]} } ) ) } className='ui small button positive'>
        Change Password
      </button>
      </td>



      </tr>
    )
  }
  }

  renderList(){

    return this.props.users.map((user) => {
      return (this.createItem(user))
    })

  }


  render(){
    if(this.props.error == 'id'){
      return <Modal onDismiss={this.props.clearUserError} title='Error in User Creation' content='A user with that ID already exists' actions='Ok'/>
    }
    else if(this.props.error == 'import'){
      return <Modal onDismiss={this.props.clearUserError} title='Error in User Creation' content={this.props.error} actions='Ok'/>
    }
    else {
      if(this.props.account['role'] == 'admin'){
        return (<div>
          <h1 className='pagetitle'>Users</h1>
          <table className='ui celled table'>
            <thead>


            <tr>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('user_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('name',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
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
          <td>
          <div class="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td>
          <div class="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('username',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td>
          <div class="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('role',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td>
          <div class="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('annual_ti',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td>
          </td>
              </tr>


              <tr>
                <th><strong>User ID</strong></th>
                <th><strong> Name</strong></th>
                <th><strong>Plan ID</strong></th>
                <th><strong>Plan Name</strong></th>
                <th><strong>Location</strong></th>
                <th><strong>Username</strong></th>
                <th><strong>Role</strong></th>
                <th><strong>Annual TI</strong></th>
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
    users: Object.values(state.users.users),
    account: state.account.account,
    filter: state.filter.filter,
    error:state.errors.errors
  }
}

export default connect(mapStateToProps, { getUsers,deleteUser,getTime,setFilter,clearFilter,clearError,clearUserError})(UserShow)
