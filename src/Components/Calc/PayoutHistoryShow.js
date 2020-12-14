import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs,setFilter,clearFilter } from '../../actions'
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
      Title: "Payouts Report",
      Subject: "Payouts",
      Author: "EasyComp",
      CreatedDate: new Date(2020,1,1)
    }
    wb.SheetNames.push('Payouts')
    var ws_data = statement_details

    var ws = XLSX.utils.aoa_to_sheet(ws_data)
    wb.Sheets['Payouts'] = ws


    var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary'});

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EasyComp Payout Report.xlsx' )
  }


  componentWillReceiveProps(nextProps) {
  const newValue =  nextProps.calculatedValue;

  if (newValue !== this.props.calculatedValue && newValue  === 'something') {
    this.props.actionB();
  }
}

  componentDidMount(){
    this.props.clearFilter()
    this.props.getPayoutsHistory()

  }

  filterMap = {
    'payout_id':0,
    'transaction_id':1,
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
    'rule':14

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
      statement_details.push(payout)

    return (
      <tr>
        <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>${payout[4]}</td><td>${payout[5]}</td><td>{payout[6]}</td><td>${payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td>


      </tr>
    )
  }
  }

  renderList(){


    return this.props.payouts.map((payout) => {
      return (this.createItem(payout))
    })

  }
  runCalc = () => {
    this.props.loadCalcs()
    this.props.calcPlans()
  }
  renderContent(){
      statement_details = []
      statement_details.push(["Payout_ID", "Transaction_ID","Seller_ID","Payee","Revenue","GP","Attainment","Payout","Split_Percent","Location","Payout_Multiplier","Order_Number","Custom_Field","Period_ID","Rule"])

    return (<div className='ui  grid'>
    <div className='sixteen wide column'></div>
    <div className='one wide column'></div>
    <div className='fourteen wide column'>
      <div className='ui center aligned grid'>
        <h1 className=''>Payouts</h1>
        </div>
      </div>
    <div className='one wide column'></div>
        <div className='six wide column'></div>
        <div class="four wide column"><button className='rightitem fluid ui button positive' onClick={this.generateStatement}>Export Payouts </button></div>
        <div className='six wide column'></div>


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
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('transaction_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payee',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('period_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td>
            <div class="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule'))} placeholder="Search..."/>
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
          <th><strong>Rule</strong></th>

          </tr>
        </thead>
        {this.renderList()}
      </table>

      </div>)
  }

  render(){
    if(this.props.account['role'] == 'admin'){
      if(this.props.calcs == 'Running'){
        return (
          <Loader filler="Calculations Running..."/>
        )
    }
    else {
      return (<div>
        {this.renderContent()}
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
    payouts: Object.values(state.payouts.payouts),
    calcs: state.payouts.calcs,
    account: state.account.account,
    filter: state.filter.filter
  }
}

export default connect(mapStateToProps, { getPayoutsHistory,calcPlans,loadCalcs,setFilter,clearFilter })(PayoutShow)
