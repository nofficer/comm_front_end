import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs, selectMonth,getTime,getPayouts_user,clearFilter,setFilter,getUsers,castUser,selectYear } from '../../actions'
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
  castUser(e){
    this.props.getPayouts_user({user_id:e.target.value, month_id:this.props.selected_month})
    this.props.castUser(e.target.value)
  }

  componentDidMount(){

    this.props.getTime()
    this.props.getPayouts_user({user_id:this.props.account['user_id'], month_id:this.props.month['current.month_id']})
    this.props.selectMonth(this.props.month['current.month_id'])
    this.props.selectYear(this.props.month['cal_year'])
    this.props.getPayoutsHistory()
    this.props.getUsers()



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
    'attainment_rule':14,
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


        }
    )

    if(
      check
    ){

    var payout_year = payout[17].split('-')[0]
    if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all" && this.props.selected_year == "all"){
      payout[4] = parseInt(payout[4])
      payout[5] = parseInt(payout[5])
      payout[6] = parseInt(payout[6])
      payout[7] = parseInt(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>$ {payout[4]}</td><td>$ {payout[5]}</td><td>{payout[6]}</td><td>${payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td><td>{payout[16]}</td><td>{payout[17]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month && this.props.selected_year == payout_year ){
      payout[4] = parseInt(payout[4])
      payout[5] = parseInt(payout[5])
      payout[6] = parseInt(payout[6])
      payout[7] = parseInt(payout[7])
      statement_details.push(payout)


      return (
        <tr>
          <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>$ {payout[4]}</td><td>$ {payout[5]}</td><td>{payout[6]}</td><td>$ {payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td><td>{payout[16]}</td><td>{payout[17]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month && this.props.selected_year == "all" ){
      payout[4] = parseInt(payout[4])
      payout[5] = parseInt(payout[5])
      payout[6] = parseInt(payout[6])
      payout[7] = parseInt(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>$ {payout[4]}</td><td>$ {payout[5]}</td><td>{payout[6]}</td><td>$ {payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td><td>{payout[16]}</td><td>{payout[17]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all" && this.props.selected_year == payout_year ){
      payout[4] = parseInt(payout[4])
      payout[5] = parseInt(payout[5])
      payout[6] = parseInt(payout[6])
      payout[7] = parseInt(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>$ {payout[4]}</td><td>$ {payout[5]}</td><td>{payout[6]}</td><td>$ {payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td><td>{payout[16]}</td><td>{payout[17]}</td>
        </tr>

      )
    }
  }

  }

  createSummaryItem(){
    var paySummary = {}
    var attainSummary = {}
    this.props.payouts.map((payout) => {
      var pay = parseInt(payout[7])
      var attain = parseInt(payout[6])
      var payout_year = payout[17].split('-')[0]
      if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all" && this.props.selected_year == "all"){
        //////////////////////////WRAP
        if(payout[14] in paySummary){
          paySummary[payout[14]]+=pay
          attainSummary[payout[14]]+=attain
        }
        else {
          paySummary[payout[14]]=pay
          attainSummary[payout[14]]=attain
        }
        //////////////////////////WRAP
      }
      else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month && this.props.selected_year == payout_year ){
        //////////////////////////WRAP
        if(payout[14] in paySummary){
          paySummary[payout[14]]+=pay
          attainSummary[payout[14]]+=attain
        }
        else {
          paySummary[payout[14]]=pay
          attainSummary[payout[14]]=attain
        }
        //////////////////////////WRAP
      }
      else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month && this.props.selected_year == "all" ){
        //////////////////////////WRAP
        if(payout[14] in paySummary){
          paySummary[payout[14]]+=pay
          attainSummary[payout[14]]+=attain
        }
        else {
          paySummary[payout[14]]=pay
          attainSummary[payout[14]]=attain
        }
        //////////////////////////WRAP
      }
      else if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all" && this.props.selected_year == payout_year ){
        //////////////////////////WRAP
        if(payout[14] in paySummary){
          paySummary[payout[14]]+=pay
          attainSummary[payout[14]]+=attain
        }
        else {
          paySummary[payout[14]]=pay
          attainSummary[payout[14]]=attain
        }
        //////////////////////////WRAP


      }



    })

    var summaryHolder= []
    for (const [key, value] of Object.entries(attainSummary)) {
      var pay = paySummary[key]
      summaryHolder.push([key,value,pay])
}

    return summaryHolder


  }

  handleChange = (e) => {
    var month = e.target.value
    this.props.selectMonth(month)
    this.props.getPayouts_user({user_id:this.props.account['user_id'], month_id:month})
  }

  handleYearChange = (e) => {
    var year = e.target.value
    this.props.selectYear(year)

  }

  renderList(){

    statement_details.push([])
    statement_details.push(['payout_id','trans_id','seller_id','Payee','revenue','gp','attainment','payout','split_percent','transaction_location','payout_multiplier','order_num','custom_field','month_id','rule_name','payee_id','type'])
    return this.props.payouts.map((payout) => {

      return (this.createItem(payout))
    })

  }

  createSummaryLine(line){
    statement_details.push(line)
    return (
      <tr>

      <td>{line[0]}</td>
      <td>{line[1]}</td>
      <td>{line[2]}</td>
      </tr>
    )
  }


  renderSummary(){
    var summaryArray = this.createSummaryItem()
    statement_details = [[`${monthmap[this.props.selected_month]} Commission statement for  ${this.props.account['username']}`],[],['Summary Performance'],[],['Rule','Attainment','Payout']]
    return (summaryArray.map((line)=> {
      return this.createSummaryLine(line)
    }))
  }
  renderTotal(){

    var total_payout = 0

    this.props.payouts.map((payout) => {
      try{var payout_year = payout[17].split('-')[0]}
      catch(err){

      }


      if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all" && this.props.selected_year == "all"){
        total_payout+=payout[7]
      }
      else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month && this.props.selected_year == payout_year ){
        total_payout+=payout[7]
      }
      else if(payout[15] == this.props.account['user_id'] && payout[13] == this.props.selected_month && this.props.selected_year == "all" ){
        total_payout+=payout[7]
      }
      else if(payout[15] == this.props.account['user_id'] && this.props.selected_month == "all" && this.props.selected_year == payout_year ){
        total_payout+=payout[7]
      }

    })


    return <h2 className="marginleft ui dropdown">{monthmap[this.props.selected_month]} Payout: ${total_payout} </h2>
  }


  renderContent(){

    if(this.props.account['role'] == 'admin'){
      return (<div className='ui  grid'>

      <div class='thirteen wide column'>
      </div>
      <div className='three wide column'>
      <div className='ui center aligned grid'>
      <div class="sixteen wide column"></div>
      <select className='ui dropdown'  name="cast_user" onChange={(e) => e.stopPropagation(this.castUser(e))}>
                    <option value="">Login as user...</option>
                    {this.props.users.map(user =>
                    <option value={user[0]} key={user[1]}>{user[1]}</option>)}
                  </select>
                  </div>
                  </div>
      <div class="sixteen wide column">
      <div className='ui center aligned grid'>
      <h1 className='pagetitle center aligned'>Commissions Report - {this.props.account['user_id']}</h1>
      </div>
      </div>



      <div class="sixteen wide column">

      </div>

      <div class="three wide column">
      <div className='ui grid'>
      <div class="two wide column">

      </div>
      <div className="fourteen wide column">
      <select className='ui dropdown' onChange={this.handleYearChange}>
        <option value="none">Select a year...</option>
        <option value="all">All</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>


      </select>
      </div>

      <div class="two wide column">

      </div>
      <div className="fourteen wide column">
      <select className='ui dropdown' onChange={this.handleChange}>
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
      <div class="two wide column">

      </div>
      <div className="fourteen wide column">
      <h1 >{this.renderTotal()}</h1>
      </div>
      </div>
      </div>

      <div class="ten wide column"></div>
      <div class="three wide column">
      <div className='ui center aligned grid'>
      <div className="sixteen wide column"></div>
      <div className="sixteen wide column">
      <button className=' ui button positive' onClick={this.generateStatement}>Download statement for {monthmap[this.props.selected_month]} </button></div>
      </div>
      </div>




      <div class="sixteen wide column">
      <div className='ui center aligned grid'>
      <h2 className=''>Summary Performance</h2>
      </div>
      </div>


        <table className='ui celled center aligned table'>
        <thead>
          <tr>
            <th><strong>Attainment Rule</strong></th>
            <th><strong>Attainment</strong></th>
            <th><strong>Payout</strong></th>

          </tr>
          </thead>
          {this.renderSummary()}
        </table>

        <div class="sixteen wide column">
        <div className='ui center aligned grid'>
        <h2 className=''>Detailed Transaction Listing</h2>
        </div>
        </div>

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
              <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
              </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
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
              <th><strong>Type</strong></th>
              <th><strong>Date</strong></th>
            </tr>
          </thead>
          {this.renderList()}
        </table>


        </div>)
    }

    else{
      return (<div className='ui  grid'>

      <div class='thirteen wide column'>
      </div>
      <div className='three wide column'>
      <div className='ui center aligned grid'>
      <div class="sixteen wide column"></div>

                  </div>
                  </div>
      <div class="sixteen wide column">
      <div className='ui center aligned grid'>
      <h1 className='pagetitle center aligned'>Commissions Report - {this.props.account['user_id']}</h1>
      </div>
      </div>



      <div class="sixteen wide column">

      </div>

      <div class="three wide column">
      <div className='ui grid'>
      <div class="two wide column">

      </div>
      <div className="fourteen wide column">
      <select className='ui dropdown' onChange={this.handleYearChange}>
        <option value="none">Select a year...</option>
        <option value="all">All</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>


      </select>
      </div>
      <div class="two wide column">

      </div>
      <div className="fourteen wide column">
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
      <div class="two wide column">

      </div>
      <div className="fourteen wide column">
      <h1 >{this.renderTotal()}</h1>
      </div>
      </div>
      </div>

      <div class="ten wide column"></div>
      <div class="three wide column">
      <div className='ui center aligned grid'>
      <div className="sixteen wide column"></div>
      <div className="sixteen wide column">
      <button className=' ui button positive' onClick={this.generateStatement}>Download statement for {monthmap[this.props.selected_month]} </button></div>
      </div>
      </div>




      <div class="sixteen wide column">
      <div className='ui center aligned grid'>
      <h2 className=''>Summary Performance</h2>
      </div>
      </div>


        <table className='ui celled center aligned table'>
        <thead>
          <tr>
            <th><strong>Attainment Rule</strong></th>
            <th><strong>Attainment</strong></th>
            <th><strong>Payout</strong></th>

          </tr>
          </thead>
          {this.renderSummary()}
        </table>

        <div class="sixteen wide column">
        <div className='ui center aligned grid'>
        <h2 className=''>Detailed Transaction Listing</h2>
        </div>
        </div>

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
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
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
              <th><strong>Type</strong></th>
              <th><strong>Date</strong></th>
            </tr>
          </thead>
          {this.renderList()}
        </table>


        </div>)
    }



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
    filter:state.filter.filter,
    users:state.users.users,
    selected_year: state.account.selected_year
  }
}

export default connect(mapStateToProps, { getUsers,getPayoutsHistory,calcPlans,loadCalcs,selectMonth,getTime,getPayouts_user,clearFilter,setFilter,castUser,selectYear })(PayoutShow)
