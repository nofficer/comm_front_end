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
      <tr><th>{user[0]}</th><th>{user[1]}</th><th>{user[2]}</th><th>{user[5]}</th><th>{user[3]}</th>

        <Link onClick={(e) => e.stopPropagation()} to={`/userShow/edit/${user[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/userShow/delete/${user[0]}`} className='ui small button negative'>
          Delete
        </Link>

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
        <h1>Users</h1>
        <table className='ui celled table'>
          <thead>
            <tr>
              <th><strong>User ID</strong></th>
              <th><strong> Name</strong></th>
              <th><strong>Plan ID</strong></th>
              <th><strong>Plan Name</strong></th>
              <th><strong>Location</strong></th>
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
