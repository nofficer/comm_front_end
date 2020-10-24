import React from 'react'
import { connect } from 'react-redux'
import { getUsers} from '../actions'
import history from '../history'


class UserShow extends React.Component {

  componentDidMount(){
    this.props.getUsers()
  }

  createItem(user){
    return (
      <tr><th>{user[0]}</th><th>{user[1]}</th><th>{user[2]}</th><th>{user[4]}</th></tr>

    )
  }

  renderList(){
    console.log(this.props.users)
    return this.props.users.map((user) => {
      return (this.createItem(user))
    })

  }


  render(){
      console.log(this.renderList())
      return (<div>
        <table className='ui celled table'>
          <thead>
            <tr>
              <th><strong>User ID</strong></th>
              <th><strong> Name</strong></th>
              <th><strong>Plan ID</strong></th>
              <th><strong>Plan Name</strong></th>
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

export default connect(mapStateToProps, { getUsers })(UserShow)
