import React from 'react'
import { connect } from 'react-redux'
import {login} from '../../actions'
import LoginForm from './LoginForm'





class Login extends React.Component {
  componentDidMount(){

  }

  save = 'no'

  onSubmit = (formValues) => {
    this.props.login(formValues,this.save)
  }

  onClick = () => {
    if(this.save=='no'){
      this.save='yes'
    }
    else {
      this.save='no'
    }
  }

  render(){
    if(this.props.account == "wrong_password"){

      return <LoginForm onSubmit={this.onSubmit} issue='Incorrect Password'/>
    }
    else if(this.props.account == "wrong_username"){

      return <LoginForm onSubmit={this.onSubmit} issue='Username not found'/>
    }
      return (<div>
        <LoginForm onSubmit={this.onSubmit}/>

        </div>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account
  }
}

export default connect(mapStateToProps, { login })(Login)
