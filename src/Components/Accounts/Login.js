import React from 'react'
import { connect } from 'react-redux'
import {login, getTime,selectMonth,selectYear} from '../../actions'

import LoginModal from '../../LoginModal'
import history from '../../history'





class Login extends React.Component {
  componentDidMount(){
    this.props.getTime()

  }

  save = 'no'

  onSubmit = (formValues) => {

      var dateData = this.props.month
      this.props.selectMonth(dateData['current.month_id'].toString())
      this.props.selectYear(dateData['cal_year'].toString())
      this.props.login(formValues,this.save)
      history.push({pathname:'/',state:{detail:this.props.month}})



  }

  onClick = () => {
    if(this.save==='no'){
      this.save='yes'
    }
    else {
      this.save='no'
    }
  }

  render(){
    if(this.props.account === "wrong_password"){

      return <LoginModal onDismiss={(e) => e.stopPropagation(history.push('/'))} title="Log in to EasyComp" onSubmit={this.onSubmit} issue='Incorrect Password'/>
    }
    else if(this.props.account === "wrong_username"){

      return <LoginModal onDismiss={(e) => e.stopPropagation(history.push('/'))} title="Log in to EasyComp" onSubmit={this.onSubmit} issue='Username not found'/>
    }

      return (<div>
        <LoginModal onDismiss={(e) => e.stopPropagation(history.push('/'))} title="Log in to EasyComp" onSubmit={this.onSubmit}/>

        </div>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    month: state.month.month
  }
}

export default connect(mapStateToProps, { login,getTime,selectMonth,selectYear })(Login)
