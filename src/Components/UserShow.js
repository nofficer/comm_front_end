import React from 'react'
import { connect } from 'react-redux'
import { getUsers,deleteUser} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'


class UserShow extends React.Component {

  componentDidMount(){
    this.props.getUsers()
  }

  createItem(user){
    return (
      <tr><th>{user[0]}</th><th>{user[1]}</th><th>{user[2]}</th><th>{user[4]}</th>

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

      return (<div>
        <h1>Users</h1>
        <table className='ui celled table'>
          <thead>
            <tr>
              <th><strong>User ID</strong></th>
              <th><strong> Name</strong></th>
              <th><strong>Plan ID</strong></th>
              <th><strong>Plan Name</strong></th>
              <th><strong>Options</strong></th>
            </tr>
          </thead>
          {this.renderList()}
        </table>


        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users.users)
  }
}

export default connect(mapStateToProps, { getUsers,deleteUser })(UserShow)
