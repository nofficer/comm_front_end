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
    if(this.props.account['role'] == 'admin'){
      if(this.props.month['current.month_id'] == 1){
        return (
          <div className='ui grid'>
          <div className='six wide column'></div>
          <div className='four wide column'><h1 className='centertext'>{months[this.props.month['current.month_id']]}</h1></div>
          <div className='six wide column'></div>
          <div className='six wide column'></div>
          <div className='four wide column'><h1 className='pagetitle'>{this.props.month['cal_year']}</h1></div>
          <div className='six wide column'></div>

            <div className='sixteen wide column bottom'>
                      <div class="ui placeholder segment">
              <div class="ui two column stackable center aligned grid">

                <div class="middle aligned row">

                  <div class="column">
                    <div class="ui icon header">
                      <i class="arrow right icon"></i>
                      Next period
                    </div>
                    <div onClick={this.handleClick} class="ui primary button">
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className='sixteen wide column bottom'></div>
            <div className='six wide column'></div>
            <div className='four wide column'><div className='ui fluid button positive'>Export Payroll File for {months[this.props.month['current.month_id']]}</div></div>
            <div className='six wide column'></div>
          </div>
        )
      }
      else {
        return (
          <div className='ui grid'>
          <div className='six wide column'></div>
          <div className='four wide column'><h1 className='centertext'>{months[this.props.month['current.month_id']]}</h1></div>
          <div className='six wide column'></div>
          <div className='six wide column'></div>
          <div className='four wide column'><h1 className='pagetitle'>{this.props.month['cal_year']}</h1></div>
          <div className='six wide column'></div>

            <div className='sixteen wide column bottom'>
                      <div class="ui placeholder segment">
              <div class="ui two column stackable center aligned grid">
                <div class="ui vertical divider">Or</div>
                <div class="middle aligned row">
                <div class="column">
                  <div class="ui icon header">
                    <i class="arrow left icon"></i>
                    Previous period
                  </div>
                  <div onClick={this.handleClickRevert} class="ui negative button">
                    Revert
                  </div>
                </div>
                  <div class="column">
                    <div class="ui icon header">
                      <i class="arrow right icon"></i>
                      Next period
                    </div>
                    <div onClick={this.handleClick} class="ui primary button">
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className='sixteen wide column bottom'></div>
            <div className='six wide column'></div>
            <div className='four wide column'><div className='ui fluid button positive'>Export Payroll File for {months[this.props.month['current.month_id']]}</div></div>
            <div className='six wide column'></div>

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
