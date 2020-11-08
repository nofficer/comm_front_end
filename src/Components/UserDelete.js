import React from 'react'
import { connect } from 'react-redux'
import { getUser ,deleteUser,checkUserUse} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'

class UserDelete extends React.Component {

  componentDidMount(){
    this.props.getUser({"user_id": this.props.match.params.user_id})
    this.props.checkUserUse({"user_id": this.props.match.params.user_id})
  }

  renderContent(){
    if(!this.props.users){
      return 'Are you sure you wish to delete this plan?'
    }
    else if(this.props.check != "In Use"){
      return `Are you sure you wish to delete ${this.props.users.name}`
    }
    else {
      return `You cannot delete ${this.props.users.name} because it is in use`
    }


  }


  renderActions(){
    const id = this.props.match.params.user_id
    if(this.props.check != "In Use"){
    return (
      <React.Fragment>
                <button
                onClick={() => this.props.deleteUser({"user_id": this.props.users.user_id})}
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
    return(<Modal
      title="Delete User"
      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/userShow')}
    />)


}

}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    check: state.check.check
  }
}

export default connect(mapStateToProps, { getUser,deleteUser,checkUserUse })(UserDelete)
