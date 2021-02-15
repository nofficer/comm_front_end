import React from 'react'
import { connect } from 'react-redux'
import {  getRoleHierarchy,editRoleHierarchy,getTime,checkCalcStatus  } from '../../actions'
import Login from '../Accounts/Login'

import Loader from '../../Loader'



import { Field, reduxForm } from 'redux-form'

import RoleForm from './RoleForm'

class RoleHierarchyEdit extends React.Component {
  componentDidMount(){
    this.props.getRoleHierarchy({"user_id": this.props.match.params.user_id})

    this.props.getTime()

    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.editRoleHierarchy(formValues,{"user_id": this.props.match.params.user_id})
  }

  populateDropdown(){
    return this.props.attainmentRules
  }




  render(){

    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler="Calculations Running - Please check back later..."/>
        )
      }

      else {
        return (
          <div className='ui container containermargin'><RoleForm title= {`Editing User: ${this.props.match.params.user_id}`} onSubmit={this.onSubmit} editing="yes" initialValues={this.props.role} populateDropdown={this.populateDropdown()} /></div>
        )
      }

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
    roles: state.roles.roles,
    role: state.roles.role,
    account: state.account.account,
    calc: state.calc.calc
  }
}

export default connect(mapStateToProps, { editRoleHierarchy, getRoleHierarchy,getTime,checkCalcStatus})(RoleHierarchyEdit)
