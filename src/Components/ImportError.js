import React from 'react'
import { connect } from 'react-redux'


import Modal from '../Modal'
import history from '../history'
import Login from './Accounts/Login'


class ImportError extends React.Component {

  renderActions(){

    return (
      <React.Fragment>
                <button className='ui button'
                onClick={() => history.push('/import')}
                >OK
                </button>

      </React.Fragment>
    )
  }



  render(){

    if(this.props.account['role'] ==='admin'){
      return  (<Modal
          title="Import Error"
          content={history.location.state.detail}
          actions={this.renderActions()}
          onDismiss={() => history.push('/import')}
        />)
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
    account:state.account.account
  }
}

export default connect(mapStateToProps, {})(ImportError)
