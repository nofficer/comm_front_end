import React from 'react'
import { connect } from 'react-redux'
import { createRoleHierarchy,getTime,checkCalcStatus  } from '../../actions'
import Login from '../Accounts/Login'


import Loader from '../../Loader'
import RoleForm from './RoleForm'

class RoleHierarchyCreate extends React.Component {
  componentDidMount(){
    this.props.getTime()
    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.createRoleHierarchy(formValues)
  }






  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calc === 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><RoleForm title='Creating Role Hierarchy Item' onSubmit={this.onSubmit} /></div>
        )
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
    roles: Object.values(state.roles.roles),
    account: state.account.account,
    calc: state.calc.calc

  }
}

export default connect(mapStateToProps, { createRoleHierarchy,getTime,checkCalcStatus  })(RoleHierarchyCreate)
