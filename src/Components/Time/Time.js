import React from 'react'
import { connect } from 'react-redux'
import { getTime,updateTime,revertTime} from '../../actions'
import history from '../../history'
import Modal from '../../Modal'
import Login from '../Accounts/Login'


var months = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}


class Time extends React.Component {
  componentDidMount(){
    this.props.getTime()

  }

  handleClick = () =>{
    history.push({pathname:'/areyousure',state:{change:'next'}})
  }

  handleClickRevert = () => {
    history.push({pathname:'/areyousure',state:{change:'revert'}})
  }

  render(){
    if(this.props.account['user_id'] == 1){
      if(this.props.month['current.month_id'] == 1){
        return (
          <div className='ui text container ' >
            <h1 className='centertext'>Current Month: {months[this.props.month['current.month_id']]}</h1>

            <button onClick={this.handleClick}>Next</button>

            <h2 className='centertext'>Current Year: {months[this.props.month['cal_year']]}</h2>

          </div>
        )
      }
      else {
        return (
          <div className='ui text container ' >
            <h1 className='centertext'>Current month: {months[this.props.month['current.month_id']]}</h1>
            <button onClick={this.handleClickRevert}>Revert to Previous</button>
            <button onClick={this.handleClick}>Next</button>
            <h4 >Current Year: {this.props.month['cal_year']}</h4>

          </div>
        )
      }
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
    month: state.month.month,
    account:state.account.account
  }
}

export default connect(mapStateToProps, {getTime,updateTime,revertTime})(Time)
