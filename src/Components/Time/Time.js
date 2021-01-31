import React from 'react'
import { connect } from 'react-redux'
import { getTime,updateTime,revertTime,getPayroll,selectMonth,getUsers,castUser,checkCalcStatus,calcPlans,loadCalcs } from '../../actions'
import history from '../../history'
import Modal from '../../Modal'
import Login from '../Accounts/Login'
import Loader from '../../Loader'


import XLSX from 'xlsx';
import monthmap from '../monthmap'

import { saveAs } from 'file-saver'

function s2ab(s){
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i =0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }


var months = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}


class Time extends React.Component {
  componentDidMount(){
    this.props.getTime()
    this.props.getUsers()
    this.props.checkCalcStatus()
  }
  runCalc = () => {
    this.props.loadCalcs()
    this.props.calcPlans()
  }



  buildPayFile(payroll){

    var statement_details = [...payroll]
    statement_details.unshift(['ID','Name','Payout','Liability Balance (Inclusive of current month liability)'])
    statement_details.unshift([''])
    statement_details.unshift(['Payroll Export File - ' + monthmap[this.props.selected_month]])

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: `Payroll Export ${monthmap[this.props.selected_month]}`,
      Subject: "Payroll",
      Author: "EasyComp",
      CreatedDate: new Date(2020,1,1)
    }
    wb.SheetNames.push('Payroll')
    var ws_data = statement_details

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets['Payroll'] = ws;

    var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary'});


    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Payroll Export '+ monthmap[this.props.selected_month]+ '.xlsx' )

  }

  handlePayroll(e){
    this.props.getPayroll({month_id:e.target.value,year_id:this.props.month['current.year_id']})
    this.props.selectMonth(e.target.value)

  }

  handleClick = () =>{
    history.push({pathname:'/areyousure',state:{change:'next'}})
  }

  exportPayroll = () => {

    //console.log(this.props.payroll)
    this.buildPayFile(this.props.payroll)
  }

  handleClickRevert = () => {
    history.push({pathname:'/areyousure',state:{change:'revert'}})
  }

  handleClickFYE = () => {
    history.push({pathname:'/areyousure',state:{change:'FYE'}})
  }


  renderCalcButton(){

      return(
        <React.Fragment>
        <div className='six wide column'></div>
          <div className='four wide column'>
            <div onClick={(e) => e.stopPropagation(history.push('/runCalcs'))}s className='ui fluid button positive'>Run Calculations <i class="calculator icon   "></i></div>
          </div>
        <div className='six wide column'></div>
        </React.Fragment>
      )

  }



  render(){

    if(!this.props.month['current.year_id']){
      return(
        <Loader filler='loading...'/>
      )
    }
    else{
    if(this.props.account['role'] == 'admin'){
      if(this.props.calc == 'Running'){
        return(
          <Loader filler='You may not access the admin panel calculations are currently running...'/>
        )
      }
      else if(this.props.month['current.month_id'] == 1){
        return (
          <div className='ui grid'>

          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className='ui header bigfont'>{months[this.props.month['current.month_id']]}</h1>
            </div>
          </div>
          <div class='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className='ui header bigfont'>{this.props.month['cal_year']}</h1>
            </div>
          </div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'></div>


            <div className='sixteen wide column'>
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
            {this.renderCalcButton()}


            <div className='six wide column'></div>
              <div className='four wide column'>
                <div onClick={(e) => {e.stopPropagation(history.push('/liabilityShow'))}} className='ui fluid button orange'>Review Liability Balances</div>
              </div>
            <div className='six wide column'></div>

            <div className='six wide column'></div>
            <div className='four wide column'>


            <select onChange={(e) => e.stopPropagation(this.handlePayroll(e))} name="months" multiple="" class="ui fluid dropdown">
            <option value="">Select a month to export...</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
          </select>


            </div>
            <div className='six wide column'></div>

            <div className='six wide column'></div>
            <div className='four wide column'><div onClick={this.exportPayroll} className='ui fluid button positive'>Export Payroll File for {months[this.props.selected_month]}</div></div>
            <div className='six wide column'></div>
          </div>
        )
      }
      else if(this.props.month['current.month_id'] == 12){
        return (
          <div className='ui grid'>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className='ui header bigfont'>{months[this.props.month['current.month_id']]}</h1>
            </div>
          </div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className='ui header bigfont'>{this.props.month['cal_year']}</h1>
            </div>
          </div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'></div>

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
                      Next Fiscal Year
                    </div>
                    <div onClick={this.handleClickFYE} class="ui primary button">
                      Next
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className='sixteen wide column bottom'></div>
            {this.renderCalcButton()}

            <div className='six wide column'></div>
              <div className='four wide column'>
                <div onClick={(e) => {e.stopPropagation(history.push('/liabilityShow'))}} className='ui fluid button orange'>Review Liability Balances</div>
              </div>
            <div className='six wide column'></div>

            <div className='six wide column'></div>
            <div className='four wide column'>


            <select onChange={(e) => e.stopPropagation(this.handlePayroll(e))} name="months" multiple="" class="ui fluid dropdown">
            <option value="">Select a month to export...</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
          </select>


            </div>
            <div className='six wide column'></div>
            <div className='six wide column'></div>
              <div className='four wide column'>
                <div onClick={this.exportPayroll} className='ui fluid button teal'>Export Payroll File for {months[this.props.selected_month]}</div>
              </div>
            <div className='six wide column'></div>

          </div>
        )
      }
      else {
        return (
          <div className='ui grid'>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className='ui header bigfont'>{months[this.props.month['current.month_id']]}</h1>
            </div>
          </div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className='ui header bigfont'>{this.props.month['cal_year']}</h1>
            </div>
          </div>
          <div class='sixteen wide column'></div>
          <div class='sixteen wide column'></div>

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
            {this.renderCalcButton()}

            <div className='six wide column'></div>
              <div className='four wide column'>
                <div onClick={(e) => {e.stopPropagation(history.push('/liabilityShow'))}} className='ui fluid button orange'>Review Liability Balances</div>
              </div>
            <div className='six wide column'></div>

            <div className='six wide column'></div>
            <div className='four wide column'>


            <select onChange={(e) => e.stopPropagation(this.handlePayroll(e))} name="months" multiple="" class="ui fluid dropdown">
            <option value="">Select a month to export...</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
          </select>


            </div>
            <div className='six wide column'></div>
            <div className='six wide column'></div>
              <div className='four wide column'>
                <div onClick={this.exportPayroll} className='ui fluid button teal'>Export Payroll File for {months[this.props.selected_month]}</div>
              </div>
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
}

const mapStateToProps = (state) => {
  return {
    month: state.month.month,
    account:state.account.account,
    payroll: state.payouts.payroll,
    selected_month: state.account.selected_month,
    calc: state.calc.calc,
    users: state.users.users
  }
}

export default connect(mapStateToProps, {getTime,updateTime,revertTime,getPayroll,selectMonth,getUsers,castUser,checkCalcStatus,calcPlans,loadCalcs })(Time)
