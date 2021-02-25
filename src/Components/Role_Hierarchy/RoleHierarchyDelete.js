import React from 'react'
import { connect } from 'react-redux'
import { getRoleHierarchy ,deleteRoleHierarchy,getTime,checkCalcStatus } from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import history from '../../history'
import Login from '../Accounts/Login'
import Loader from '../../Loader'

class RoleHierarchyDelete extends React.Component {

  componentDidMount(){
    this.props.getTime()
    this.props.getRoleHierarchy({"user_id": this.props.match.params.user_id})
    this.props.checkCalcStatus()
  }

  renderContent(){

      return 'Are you sure you wish to delete this role hierarchy?'

  }

  renderActions(){

      return (

        <React.Fragment>
                  <button
                  onClick={() => this.props.deleteRoleHierarchy({"user_id": this.props.role.user_id})}
                  className='ui button negative'>Delete
                  </button>
                  <Link className='ui button' to='/roleHierarchyShow'>Cancel</Link>
        </React.Fragment>
      )


  }



  render(){

    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return(<Modal
          title="Delete Role Hierarchy Item"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/roleHierarchyShow')}
        />)
      }

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
    roles: state.roles.roles,
    role: state.roles.role,
    calc: state.calc.calc,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getRoleHierarchy,deleteRoleHierarchy,getTime,checkCalcStatus })(RoleHierarchyDelete)
