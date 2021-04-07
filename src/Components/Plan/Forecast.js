import React from 'react'
import { connect } from 'react-redux'
import { getTime,checkCalcStatus,inputForecast,getYears } from '../../actions'
import Login from '../Accounts/Login'
import Loader from '../../Loader'





import InputForm from './InputForm'

class Forecast extends React.Component {
  componentDidMount(){
    this.props.getYears()

    this.props.getTime()

    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.inputForecast(formValues)
  }

  populateDropdown(){

    return this.props.years
  }




  render(){
    if(this.props.account['role'] === 'admin'){



        return (
          <div className='ui container containermargin'><InputForm title="Input Payout Forecast" onSubmit={this.onSubmit} year={this.props.month.cal_year} populateDropdown={this.populateDropdown()} /></div>
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
    month:state.month.month,
    years:state.month.years

  }
}

export default connect(mapStateToProps, {getTime,checkCalcStatus,inputForecast,getYears })(Forecast)
