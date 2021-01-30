import React from 'react'
import { connect } from 'react-redux'
import { getTrans, deleteTrans,getTime,setFilter,clearFilter,clearTransError,clearTrans} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'
import Modal from '../Modal'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import LoaderNoButton from '../LoaderNoButton'

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


class TransShow extends React.Component {

  generateStatement(){

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Transactions Report",
      Subject: "Transactions",
      Author: "EasyComp",
      CreatedDate: new Date(2020,1,1)
    }
    wb.SheetNames.push('Transactions')
    var ws_data = statement_details

    var ws = XLSX.utils.aoa_to_sheet(ws_data)
    wb.Sheets['Transactions'] = ws


    var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary'});

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EasyComp Transactions Report.xlsx' )
  }

  componentDidMount(){
    this.props.getTrans({filter:'cy'})
    this.props.getTime()
    this.props.clearFilter()
  }

  handleChange = (e) => {
    var filter = e.target.value
    if (filter == 'all'){
      this.title = 'All'
    }
    else if (filter=='cy'){
      this.title = 'Current Year'
    }
    this.props.clearTrans()
    this.props.getTrans({filter:filter})
  }



  filterMap ={
    'trans_id':0,
    'seller_id':1,
    'type':2,
    'date':3,
    'revenue':4,
    'gp':5,
    'order_num':6,
    'location':7,
    'split_percent':8,
    'custom_field':9,
    'payout_multiplier':10,
    'period':11
  }

  title = 'Current Year'

  createItem(trans){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(trans[this.filterMap[filter]] == null){
        check = false
      }
      else if(trans[this.filterMap[filter]] != null){
        if(!trans[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }


        }
    )

    if(
      check
    ){
      var cur_year = this.props.month['cal_year']
      var trans_year = trans[3].split('-')[0]
      var cur_month = parseInt(this.props.month['current.month_id'])
      var trans_month = parseInt(trans[11])

      if(cur_year<trans_year){
        statement_details.push(trans)

        return (
          <tr><td className='center aligned'>{trans[0]}</td><td className='center aligned'>{trans[1]}</td><td className='center aligned'>{trans[2]}</td><td className='center aligned'>{trans[3].split("T")[0]}</td><td className='center aligned'>$ {formatMoney(trans[4])}</td><td className='center aligned'>$ {formatMoney(trans[5])}</td><td className='center aligned'>{trans[6]}</td><td className='center aligned'>{trans[7]}</td><td className='center aligned'>{trans[8]}</td><td className='center aligned'>{trans[9]}</td><td className='center aligned'>{trans[10]}</td><td className='center aligned'>{trans[11]}</td>
            <td className='center aligned'>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/edit/${trans[0]}`} className='ui small button primary'>
              Edit
            </Link>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/delete/${trans[0]}`} className='ui small button negative'>
              Delete
            </Link>
            </td>
              </tr>

        )
      }
      else if(cur_year==trans_year && cur_month <= trans_month){
        statement_details.push(trans)

        return (
          <tr><td className='center aligned'>{trans[0]}</td><td className='center aligned'>{trans[1]}</td><td className='center aligned'>{trans[2]}</td><td className='center aligned'>{trans[3].split("T")[0]}</td><td className='center aligned'>$ {formatMoney(trans[4])}</td><td className='center aligned'>$ {formatMoney(trans[5])}</td><td className='center aligned'>{trans[6]}</td><td className='center aligned'>{trans[7]}</td><td className='center aligned'>{trans[8]}</td><td className='center aligned'>{trans[9]}</td><td className='center aligned'>{trans[10]}</td><td className='center aligned'>{trans[11]}</td>
            <td className='center aligned'>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/edit/${trans[0]}`} className='ui small button primary'>
              Edit
            </Link>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/delete/${trans[0]}`} className='ui small button negative'>
              Delete
            </Link>

              </td>
              </tr>

        )
      }

      else{
        statement_details.push(trans)
        return (
          <tr><td className='center aligned'>{trans[0]}</td><td className='center aligned'>{trans[1]}</td><td className='center aligned'>{trans[2]}</td><td className='center aligned'>{trans[3].split("T")[0]}</td><td className='center aligned'>$ {formatMoney(trans[4])}</td><td className='center aligned'>$ {formatMoney(trans[5])}</td><td className='center aligned'>{trans[6]}</td><td className='center aligned'>{trans[7]}</td><td className='center aligned'>{trans[8]}</td><td className='center aligned'>{trans[9]}</td><td className='center aligned'>{trans[10]}</td><td className='center aligned'>{trans[11]}</td>
            <td className='center aligned'>

              </td>
              </tr>

        )
      }
  }

  }

  renderList(){
    statement_details = []
    statement_details.push([ "Transaction_ID","Seller","Type","Date","Revenue","Gross Profit","Order Number","Location","Split Percent","Custom Field","Payout Muiltiplier","Period ID"])

    return this.props.trans.map((trans) => {
      if(trans[3]) {
        return (this.createItem(trans))
      }
      else {
        return null
      }

    })

  }


  render(){
    if(this.props.error == 'id'){
      return <Modal onDismiss={this.props.clearTransError} title='Error in Transaction Creation' content='A transaction with that ID already exists' actions='Ok'/>
    }
    else if(typeof(this.props.trans[0]) == 'undefined' && this.props.account['role'] == 'admin'){
      return<div><LoaderNoButton filler='Loading Transactions...'/></div>
    }

    else{
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui container containermargin'>
        <div className='ui grid'>
        <div class='sixteen wide column'></div>


        <div class='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>{this.title} Transactions</h1>
          </div>
        </div>
        <div class='two wide column'><select className='ui dropdown' onChange={this.handleChange}>

          <option value="cy">Select a time period...</option>
          <option value="cy">Current Year</option>
          <option value="all">All Time</option>


        </select></div>
        <div class='fourteen wide column'></div>
        <div className='six wide column'></div>
        <div class="four wide column"><button className='rightitem fluid ui button positive' onClick={this.generateStatement}>Export Transactions </button></div>
        <div className='six wide column'></div>
        <div class='sixteen wide column'></div>
        </div>
        <table className='ui celled  table'>
          <thead>
          <tr>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('trans_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('period',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>

            </td>
            </tr>
            <tr>

              <th className='center aligned'><strong>Transaction ID</strong></th>
              <th className='center aligned'><strong>Transaction Seller</strong></th>
              <th className='center aligned'><strong>Transaction Type</strong></th>
              <th className='center aligned'><strong>Transaction Date</strong></th>
              <th className='center aligned'><strong>Revenue</strong></th>
              <th className='center aligned'><strong>Gross Profit</strong></th>
              <th className='center aligned'><strong>Order Number</strong></th>
              <th className='center aligned'><strong>Location</strong></th>
              <th className='center aligned'><strong>Split Percent</strong></th>
              <th className='center aligned'><strong>Custom Field</strong></th>
              <th className='center aligned'><strong>Payout Multiplier</strong></th>
              <th className='center aligned'><strong>Period</strong></th>
              <th className='center aligned'><strong>Options</strong></th>
            </tr>
          </thead>
          {this.renderList()}
        </table>


        </div>
      )
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
    trans: Object.values(state.trans.trans),
    month: state.month.month,
    account: state.account.account,
    filter:state.filter.filter,
    error:state.errors.errors
  }
}

export default connect(mapStateToProps, { getTrans,deleteTrans,getTime,setFilter,clearFilter,clearTransError,clearTrans })(TransShow)
