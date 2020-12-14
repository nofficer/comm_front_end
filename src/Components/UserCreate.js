import React from 'react'
import { connect } from 'react-redux'
import { getPlans, createUser ,getTime} from '../actions'
import Login from './Accounts/Login'
import { Field, reduxForm } from 'redux-form'
// import { createProduct } from '../../actions'
import UserForm from './UserForm'

class UserCreate extends React.Component {
  componentDidMount(){
    this.props.getPlans()
    this.props.getTime()
  }

  onSubmit = (formValues) => {
    this.props.createUser(formValues)
  }

  populateDropdown(){
    return this.props.plans
  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (
        <div><UserForm title='Creating new User' onSubmit={this.onSubmit} populateDropdown={this.populateDropdown()} /></div>
      )
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
    plans: Object.values(state.plans.plans),
    account: state.account.account,
    error:state.errors.errors
  }
}

export default connect(mapStateToProps, { getPlans, createUser,getTime })(UserCreate)
