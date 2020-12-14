import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs, selectMonth,getTime,getPayouts_user,clearFilter,setFilter } from '../../actions'
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


    var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary'});

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EasyComp Commission Statement.xlsx' )
  }


  componentDidMount(){

    this.props.getTime()
    this.props.getPayouts_user({user_id:this.props.account['user_id'], month_id:this.props.month['current.month_id']})
    this.props.selectMonth(this.props.month['current.month_id'])
    this.props.getPayoutsHistory()



  }

  filterMap = {
    'payout_id':0,
    'trans_id':1,
    'seller_id':2,
    'payee':3,
    'revenue':4,
    'gp':5,
    'attainment':6,
    'payout':7,
    'split_percent':8,
    'location':9,
    'payout_multiplier':10,
    'order_num':11,
    'custom_field':12,
    'period_id':13,
    'attainment_rule':14
  }

  createItem(payout){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(payout[this.filterMap[filter]] == null){
        check = false
      }
      else if(payout[this.filterMap[filter]] != null){
        if(!payout[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }


        }
    )

    if(
      check
    ){

    if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all"){
      payout[4] = parseInt(payout[4])
      payout[5] = parseInt(payout[5])
      payout[6] = parseInt(payout[6])
      payout[7] = parseInt(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>$ {payout[4]}</td><td>$ {payout[5]}</td><td>{payout[6]}</td><td>${payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month){
      payout[4] = parseInt(payout[4])
      payout[5] = parseInt(payout[5])
      payout[6] = parseInt(payout[6])
      payout[7] = parseInt(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>$ {payout[4]}</td><td>$ {payout[5]}</td><td>{payout[6]}</td><td>$ {payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td>
        </tr>

      )
    }
  }

  }

  createSummaryItem(summary){

    if(this.props.selected_month == "all"){
      statement_details.push([summary['rule_name'],summary['attainment'],summary['payout'],monthmap[summary['month_id']]])
      console.log(statement_details)
        return (
          <tr>
            <td> {monthmap[summary['month_id']]}</td><td>{summary['rule_name']}</td><td> {summary['attainment']}</td><td>$ {summary['payout']}</td>
          </tr>
        )
    }
    else if(summary['month_id'] == this.props.selected_month){
      statement_details.push([summary['rule_name'],summary['attainment'],summary['payout'],monthmap[summary['month_id']]])
      console.log(statement_details)
        return (
          <tr>
            <td> {monthmap[summary['month_id']]}</td><td>{summary['rule_name']}</td><td> {summary['attainment']}</td><td>$ {summary['payout']}</td>
          </tr>
        )
    }




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
    statement_details = [[`${monthmap[this.props.selected_month]} Commission statement for  ${this.props.account['username']}`],[],['Summary Performance'],[],['Rule','Attainment','Payout','Month']]
    return this.props.summary.map((summary) => {
      return (this.createSummaryItem(summary))
    })
  }
  renderTotal(){
     var total_payout = 0
     this.props.summary.map((summary) => {
       if(this.props.selected_month=="all"){
         total_payout+=parseInt(summary['payout'])
       }
       else if (summary['month_id']==this.props.selected_month){
         total_payout+=parseInt(summary['payout'])
       }

    })
    return <h2 className="marginleft ui dropdown">{monthmap[this.props.selected_month]} Payout: $ {total_payout}</h2>
  }


  renderContent(){
      return (<div className='ui  grid'>

      <div class='sixteen wide column'><h1 className='pagetitle center aligned'>Commissions Report - {this.props.account['username']}</h1></div>
      <div class="sixteen wide column">

      </div>
      <div class="four wide column"><h2 className='marginleft'>{this.renderTotal()}</h2></div>
      <div class="eight wide column"></div>
      <div class="four wide column"></div>

      <div class="four wide column">

      <select className='marginleft ui dropdown' onChange={this.handleChange}>
        <option value="none">Select a period...</option>
        <option value="all">Year To Date</option>
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
      <div class="four wide column"></div>
      <div class="four wide column"></div>
      <div class="four wide column"><button className='rightitem ui button positive' onClick={this.generateStatement}>Download statement for {monthmap[this.props.selected_month]} </button></div>



      <div class="four wide column"></div>
      <div class="eight wide column"><h2 className='pagetitle center aligned'>Summary Performance</h2></div>
      <div class="four wide column"></div>

        <table className='ui celled center aligned table'>
        <thead>
          <tr>
            <th><strong>Month</strong></th>
            <th><strong>Attainment Rule</strong></th>
            <th><strong>Attainment</strong></th>
            <th><strong>Payout</strong></th>

          </tr>
          </thead>
          {this.renderSummary()}
        </table>

        <div class="four wide column"></div>
        <div class="eight wide column"><h2 className='pagetitle center aligned'>Detailed Transaction Listing</h2></div>
        <div class="four wide column"></div>

        <table className='ui celled table'>

          <thead>
            <tr>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('trans_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payee',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('period_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment_rule',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
            </tr>
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
    summary: state.payouts.summary,
    filter:state.filter.filter
  }
}

export default connect(mapStateToProps, { getPayoutsHistory,calcPlans,loadCalcs,selectMonth,getTime,getPayouts_user,clearFilter,setFilter })(PayoutShow)
