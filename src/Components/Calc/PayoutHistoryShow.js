import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory_show,calcPlans,loadCalcs,setFilter,clearFilter,getYears } from '../../actions'

import Loader from '../../Loader'
import Login from '../Accounts/Login'
import XLSX from 'xlsx';

import globals from '../globals'

import { saveAs } from 'file-saver'

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

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




  componentDidMount(){
    this.props.clearFilter()
    this.props.getYears()
    this.props.getPayoutsHistory_show({'selected_year':this.props.month['cal_year']})

  }


  handleYearChange(){

  }

  createYearOption(year){
    return (
      <option key={year} value={year}>{year}</option>
    )
  }

  renderYearOptions(){
    return this.props.years.map((year) => {
      return this.createYearOption(year)
    })
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
    'rule':14,
    'type':16,
    'date':17

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

      return true
        }
    )

    if(
      check
    ){
      payout[4] = Number(payout[4])
      payout[5] = Number(payout[5])
      payout[6] = Number(payout[6])
      payout[7] = Number(payout[7])
      statement_details.push(payout)


    return (
      <tr key={payout[0]}>
        <td className='center aligned'>{payout[0]}</td><td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>$ {formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[12]}</td><td className='center aligned'>{payout[13]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[17]}</td>


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
      statement_details.push([globals.payout_id, globals.trans_id,globals.seller_id,globals.payee,globals.revenue,globals.gp,globals.attainment,globals.payout,globals.split,globals.location,globals.multiplier,globals.order_num,globals.custom_field,globals.period_id,globals.rule,globals.payee_id,globals.type,globals.date,globals.calc_type])

    return (

      <div className='ui  grid'>
    <div className='sixteen wide column'>
       <select style={{'marginLeft':'2em'}} className='ui dropdown' onChange={(e) => e.stopPropagation(this.props.getPayoutsHistory_show({'selected_year':e.target.value}))}>
        <option value={this.props.month['cal_year']}>{this.props.month['cal_year']}</option>
        <option value="all">All</option>

        {this.renderYearOptions()}


      </select>
    </div>
    <div className='one wide column'></div>
    <div className='fourteen wide column'>
      <div className='ui center aligned grid'>
        <h1 className=''>All Payouts</h1>

        </div>
      </div>
    <div className='one wide column'></div>
    <div className='sixteen wide column'>





    </div>
        <div className='six wide column'></div>
        <div className="four wide column"><button className='rightitem fluid ui button positive' onClick={this.generateStatement}>Export Payouts </button></div>
        <div className='six wide column'></div>


    <div style={{overflow:'auto', whitespace:'nowrap',"transform":"rotateX(180deg)"}} className='ui container containermargin'>
    <table  className='ui celled small compact unstackable table' style={{"transform":"rotateX(180deg)"}}>

        <thead className='ui sticky'>
        <tr>
          <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
          <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('transaction_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payee',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('period_id',e.target.value))} placeholder="Search..."/>
            </div>
          </td><td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
          <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
          <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
        </tr>
          <tr>
          <th className='center aligned'><strong>{globals.payout_id}</strong></th>
          <th className='center aligned'><strong>{globals.trans_id}</strong></th>
          <th className='center aligned'><strong>{globals.seller_id}</strong></th>
          <th className='center aligned'><strong>{globals.payee}</strong></th>
          <th className='center aligned'><strong>{globals.revenue}</strong></th>
          <th className='center aligned'><strong>{globals.gp}</strong></th>
          <th className='center aligned'><strong>{globals.attainment}</strong></th>
          <th className='center aligned'><strong>{globals.payout}</strong></th>
          <th className='center aligned'><strong>{globals.split}</strong></th>
          <th className='center aligned'><strong>{globals.location}</strong></th>
          <th className='center aligned'><strong>{globals.multiplier}</strong></th>
          <th className='center aligned'><strong>{globals.order_num}</strong></th>
          <th className='center aligned'><strong>{globals.custom_field}</strong></th>
          <th className='center aligned'><strong>{globals.period_id}</strong></th>
          <th className='center aligned'><strong>{globals.rule}</strong></th>
          <th className='center aligned'><strong>{globals.type}</strong></th>
          <th className='center aligned'><strong>{globals.date}</strong></th>
          </tr>
        </thead>
        <tbody>
        {this.renderList()}
        </tbody>
      </table>
      </div>

      </div>)
  }

  render(){
    if(this.props.account['role'] === 'admin'){
      if(this.props.calcs === 'Running'){
        return (
          <Loader filler="Calculations Running..."/>
        )
    }



    // else if(typeof(this.props.payouts[0]) === 'undefined' ){
    //   return<div><Loader filler='Loading Payouts...'/></div>
    // }
    else {
      return (<div>
        {this.renderContent()}
        </div>
      )
    }
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
    payouts: Object.values(state.payouts.payouts_history_show),
    calcs: state.payouts.calcs,
    account: state.account.account,
    filter: state.filter.filter,
    month:state.month.month,
    years:state.month.years
  }
}

export default connect(mapStateToProps, { getPayoutsHistory_show,calcPlans,loadCalcs,setFilter,clearFilter,getYears })(PayoutShow)
