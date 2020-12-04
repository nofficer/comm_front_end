import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs, selectMonth,getTime,getPayouts_user } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Login from '../Accounts/Login'
import XLSX from 'xlsx';
import monthmap from '../monthmap'

import { saveAs } from 'file-saver'

function s2ab(s){
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i =0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

var statement_details = []



class PayoutShow extends React.Component {




  generateStatement(){

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Commission Statement",
      Subject: "Commissions",
      Author: "EasyComp",
      CreatedDate: new Date(2020,1,1)
    }
    wb.SheetNames.push('Statement')
    var ws_data = statement_details
    var ws = XLSX.utils.aoa_to_sheet(ws_data)
    wb.Sheets['Statement'] = ws
    console.log(statement_details)

    var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary'});


    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EasyComp Commission Statement.xlsx' )
  }


  componentDidMount(){

    this.props.getTime()
    this.props.getPayouts_user({user_id:this.props.account['user_id'], month_id:this.props.month['current.month_id']})
    this.props.selectMonth(this.props.month['current.month_id'])
    this.props.getPayoutsHistory()



  }

  createItem(payout){
    if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month){
      statement_details.push(payout)
      return (
        <tr>
          <th>{payout[0]}</th><th>{payout[1]}</th><th>{payout[2]}</th><th>{payout[3]}</th><th>$ {payout[4]}</th><th>$ {payout[5]}</th><th>$ {payout[6]}</th><th>{payout[7]}</th><th>{payout[8]}</th><th>{payout[9]}</th><th>{payout[10]}</th><th>{payout[11]}</th><th>{payout[12]}</th><th>{payout[13]}</th><th>{payout[14]}</th>
        </tr>
      )
    }

  }

  createSummaryItem(summary){

    statement_details.push([summary['rule_name'],summary['attainment'],summary['payout']])
      return (
        <tr>
          <th>{summary['rule_name']}</th><th>$ {summary['attainment']}</th><th>$ {summary['payout']}</th>
        </tr>
      )


  }

  handleChange = (e) => {
    var month = e.target.value
    this.props.selectMonth(month)
    this.props.getPayouts_user({user_id:this.props.account['user_id'], month_id:month})
  }

  renderList(){

    statement_details.push([])
    statement_details.push(['payout_id','trans_id','seller_id','Payee','revenue','gp','attainment','payout','split_percent','transaction_location','payout_multiplier','order_num','custom_field','month_id','rule_name','payee_id'])
    return this.props.payouts.map((payout) => {

      return (this.createItem(payout))
    })

  }

  renderSummary(){
    statement_details = [[`${monthmap[this.props.month['current.month_id']]} Commission statement for  ${this.props.account['username']}`],[],['Summary Performance'],[],['Rule','Attainment','Payout']]
    return this.props.summary.map((summary) => {
      return (this.createSummaryItem(summary))
    })
  }
  runCalc = () => {
    this.props.loadCalcs()
    this.props.calcPlans()
  }
  renderContent(){
      return (<div className='ui  grid'>
        <h1>Payouts</h1>
        <select onChange={this.handleChange}>
          <option value={this.props.month['current.month_id']}>Select a period...</option>
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
        <button onClick={this.generateStatement}>Download statement for {monthmap[this.props.selected_month]} </button>
        <h1>Summary Performance </h1>
        <table className='ui inverted celled center aligned table'>
        <thead>
          <tr>
            <th><strong>Attainment Rule</strong></th>
            <th><strong>Attainment</strong></th>
            <th><strong>Payout</strong></th>
          </tr>
          </thead>
          {this.renderSummary()}
        </table>

        <table className='ui inverted celled table'>

          <thead>
            <tr>
              <th><strong>Payout ID</strong></th>
              <th><strong>Transaction ID</strong></th>
              <th><strong>Seller ID</strong></th>
              <th><strong>Payee</strong></th>
              <th><strong>Revenue</strong></th>
              <th><strong>GP</strong></th>
              <th><strong>Attainment</strong></th>
              <th><strong>Payout</strong></th>
              <th><strong>Split Percent</strong></th>
              <th><strong>Location</strong></th>
              <th><strong>Payout Multiplier</strong></th>
              <th><strong>order_num</strong></th>
              <th><strong>custom_field</strong></th>
              <th><strong>period_id</strong></th>
              <th><strong>Attainment Rule</strong></th>

            </tr>
          </thead>
          {this.renderList()}
        </table>

        </div>)


  }

  render(){

    if(typeof(this.props.account['user_id']) == "number"){

          return(<div>
          {this.renderContent()}
          </div>)
    }

    else {
      return (
        <Login/>

      )
    }
  }




  }




const mapStateToProps = (state) => {
  return {
    payouts: Object.values(state.payouts.payouts),
    calcs: state.payouts.calcs,
    account: state.account.account,
    month: state.month.month,
    selected_month: state.account.selected_month,
    summary: state.payouts.summary
  }
}

export default connect(mapStateToProps, { getPayoutsHistory,calcPlans,loadCalcs,selectMonth,getTime,getPayouts_user })(PayoutShow)
