import React from 'react'
import { connect } from 'react-redux'
import { getTran ,deleteTrans} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'
import Login from './Accounts/Login'


class PasswordError extends React.Component {

  renderActions(){

    return (
      <React.Fragment>
                <button className='ui button'
                onClick={() => history.push('/')}
                >OK
                </button>

      </React.Fragment>
    )
  }



  render(){

    if(typeof(this.props.account['user_id']) != 'undefined' &&typeof(history.location.state) != 'undefined' ){
      return  (<Modal
          title="Password Status"
          content={history.location.state.detail}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />)
    }
      else if(typeof(this.props.account['user_id']) != "undefined"){
        return "You do not have sufficient permissions to access this page"
      }
      else{
        return <Login/>
      }





}

}

const mapStateToProps = (state) => {
  return {
    account:state.account.account
  }
}

export default connect(mapStateToProps, {})(PasswordError)
