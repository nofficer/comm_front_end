import React from 'react'
import { connect } from 'react-redux'
import { getTime,checkCalcStatus,inputForecast } from '../../actions'
import Login from '../Accounts/Login'
import Loader from '../../Loader'





import InputForm from './InputForm'

class Forecast extends React.Component {
  componentDidMount(){

    this.props.getTime()

    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.inputForecast(formValues)
  }






  render(){
    if(this.props.account['role'] === 'admin'){



        return (
          <div className='ui container containermargin'><InputForm title="Input Payout Forecast" onSubmit={this.onSubmit}  /></div>
        )


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
    account: state.account.account,
    calc: state.calc.calc,

  }
}

export default connect(mapStateToProps, {getTime,checkCalcStatus,inputForecast })(Forecast)
