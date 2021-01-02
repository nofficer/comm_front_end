import React from 'react'
import { connect } from 'react-redux'
import { } from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'
import Login from './Accounts/Login'
class ImportSuccess extends React.Component {





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

    if(this.props.account['role'] == 'admin'){
      const url = history.location.state.url
      return(<Modal
        title="Import Success!"
        content={"Rows Ignored: "+ history.location.state.ignored + " and Rows Updated: " + history.location.state.updated}
        actions={this.renderActions()}
        onDismiss={() => history.push(url)}
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
    account: state.account.account
  }
}

export default connect(mapStateToProps, {})(ImportSuccess)
