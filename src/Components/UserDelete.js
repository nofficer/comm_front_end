import React from 'react'
import { connect } from 'react-redux'
import { getUser ,deleteUser,checkUserUse,getTime} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'
import Login from './Accounts/Login'

class UserDelete extends React.Component {

  componentDidMount(){
    this.props.getUser({"user_id": this.props.match.params.user_id})
    this.props.checkUserUse({"user_id": this.props.match.params.user_id})
    this.props.getTime()
  }

  renderContent(){
    if(!this.props.user){
      return 'Are you sure you wish to delete this plan?'
    }
    else if(this.props.check != "In Use"){
      return `Are you sure you wish to delete ${this.props.user.name}`
    }
    else {
      return `You cannot delete ${this.props.user.name} because it is in use`
    }


  }


  renderActions(){
    const id = this.props.match.params.user_id
    if(this.props.check != "In Use"){
    return (
      <React.Fragment>
                <button
                onClick={() => this.props.deleteUser({"user_id": this.props.user.user_id})}
                className='ui button negative'>Delete
                </button>
                <Link className='ui button' to='/userShow'>Cancel</Link>
      </React.Fragment>
    )
  }
  else{
    return (
      <React.Fragment>
                <Link className='ui button' to='/userShow'>Cancel</Link>
      </React.Fragment>
    )
  }
  }



  render(){
    if(this.props.account['role'] == 'admin'){
      return(<Modal
        title="Delete User"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/userShow')}
      />)
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
    user: state.users.user,
    users: state.users.users,
    check: state.check.check,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getUser,deleteUser,checkUserUse,getTime })(UserDelete)
