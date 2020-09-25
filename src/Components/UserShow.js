import React from 'react'
import { connect } from 'react-redux'
import { getUsers , goPush} from '../actions'


class UserShow extends React.Component {

  componentDidMount(){
    this.props.getUsers()
  }

  createItem(user){
    return (
      <div>{user[0]} ,  {user[1]},   {user[2]}</div>
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
        <div><strong>User_ID</strong> ,<strong>User_Name</strong>  , <strong>Plan_ID</strong></div>
        <div>{this.renderList()}</div>
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
