import React from 'react'
import { connect } from 'react-redux'
import { getUsers,deleteUser,getTime} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'

class UserShow extends React.Component {

  componentDidMount(){
    this.props.getUsers()
    this.props.getTime()
  }

  createItem(user){
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

  renderList(){

    return this.props.users.map((user) => {
      return (this.createItem(user))
    })

  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (<div>
        <h1 className='pagetitle'>Users</h1>
        <table className='ui celled table'>
          <thead>
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

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users.users),
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getUsers,deleteUser,getTime })(UserShow)
