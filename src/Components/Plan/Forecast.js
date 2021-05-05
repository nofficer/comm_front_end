import React from 'react'
import { connect } from 'react-redux'
import { getTime,checkCalcStatus,inputForecast,getYears,getForecast } from '../../actions'
import Login from '../Accounts/Login'
import Loader from '../../Loader'
import history from '../../history'





import InputForm from './InputForm'

class Forecast extends React.Component {
  componentDidMount(){
    this.props.getYears()
    this.props.getForecast({"year": this.props.years[0] })

    this.props.getTime()

    this.props.checkCalcStatus()
  }

  onSubmit = (formValues) => {
    this.props.inputForecast(formValues)

  }

  populateDropdown(){

    return this.props.years
  }

  renderYearOptions(){
    return this.props.years.map((year) => {
      return this.createYearOption(year)
    })
  }

  createYearOption(year){
    return (
      <option key={year} value={year}>{year}</option>
    )
  }

  mapForecast(){
    var new_obj = {}
    var counter = 1
    this.props.forecast.map((forecast) => {
      var make_str = 'month_' + String(counter)
      new_obj[make_str] = Number(forecast)
      counter+=1
    })

    return new_obj

  }



  render(){
    if(this.props.account['role'] === 'admin'){



        return (
          <div className='ui container containermargin'>

          <select className='ui dropdown'  onChange={(e) => e.stopPropagation(this.props.getForecast({"year": e.target.value}))}>


            {this.renderYearOptions()}


          </select>
          <InputForm title="Input Payout Forecast" onSubmit={this.onSubmit} year={this.props.month.cal_year} populateDropdown={this.populateDropdown()} initialValues={this.mapForecast()}  />

          </div>
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
    years:state.month.years,
    forecast: state.forecast.forecast

  }
}

export default connect(mapStateToProps, {getTime,checkCalcStatus,inputForecast,getYears,getForecast })(Forecast)
