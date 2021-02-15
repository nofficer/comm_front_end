import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs, selectMonth,getTime,getPayouts_user,clearFilter,setFilter,getUsers,castUser,selectYear,getGoals,getYears,getUsersJoined } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Login from '../Accounts/Login'
import XLSX from 'xlsx';
import monthmap from '../monthmap'
import history from '../../history'
import DoughnutChart from '../DoughnutChart'
import BarChart from '../BarChart'
import { saveAs } from 'file-saver'

import isMobile from 'react-device-detect';




function s2ab(s){
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i =0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

var statement_details = []
var goal_details = []


function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {

  }
};




class PayoutShow extends React.Component {




  generateStatement(){

    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Commission Statement",
      Subject: "Commission",
      Author: "EasyComp",
      CreatedDate: new Date(2020,1,1)
    }
    wb.SheetNames.push('Statement')



    statement_details.splice(1,0,...goal_details)

    var ws_data = statement_details

    var ws = XLSX.utils.aoa_to_sheet(ws_data)

    // ws['!merges'] = [ {s: {c: 0, r:0,font: {sz: 14, bold: true, color: '#FF00FF' } }, e: {c:3, r:0}},{s: {c: 0, r:3 }, e: {c:1, r:3}},{s: {c: 0, r:4 }, e: {c:1, r:4}},{s: {c: 0, r:5 }, e: {c:1, r:5}} ]
    var wscols = [
                    {wch:15},
                    {wch:12},
                    {wch:14},
                    {wch:10},
                    {wch:10},
                    {wch:10},
                    {wch:10},
                    {wch:10},
                    {wch:15},
                    {wch:20},
                    {wch:10},
                    {wch:15},
                    {wch:15},
                    {wch:10},
                    {wch:10},
                    {wch:15},
                    {wch:15},
                ];

    ws['!cols'] = wscols;


    wb.Sheets['Statement'] = ws
    goal_details = []


    var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary'});

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'EasyComp Commission Statement.xlsx' )
  }
  castUser(e){
    // this.props.getPayouts_user({user_id:e.target.value, month_id:this.props.selected_month})

    this.props.castUser(this.props.account['user_id'],this.props.account['role'],this.props.account['username'],e.target.value)
  }

  componentDidMount(){
    this.props.getPayoutsHistory({'selected_year':'all'})
    this.props.clearFilter()
    this.props.getYears()
    this.props.getTime()

    // this.props.getPayouts_user({user_id:this.props.account['user_id'], month_id:this.props.month['current.month_id']})
    try{
      var dateData = history.location.state.detail
      this.props.selectMonth(dateData['current.month_id'].toString())
      this.props.selectYear(dateData['cal_year'].toString())
    }
    catch{
      console.log('Unauthorized User dashboard access attempt')
    }



    this.props.getUsersJoined()
    this.props.getGoals()


  }

  createYearOption(year){
    return (
      <option value={year}>{year}</option>
    )
  }


  renderYearOptions(){
    return this.props.years.map((year) => {
      return this.createYearOption(year)
    })
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


    var pay_rate = (Number(payout[7])/Number(payout[6]))*100
    if(isNaN(pay_rate) || payout[16].toUpperCase().includes('OTE')){
      pay_rate = 'OTE'
    }
    else{
      pay_rate = pay_rate.toFixed(2) + '%'
    }


    var payout_year = payout[17].split('-')[0]
    if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month == "all" && this.props.selected_year == "all"){
      payout[4] = Number(payout[4])
      payout[5] = Number(payout[5])
      payout[6] = Number(payout[6])
      payout[7] = Number(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && payout[13] == this.props.selected_month && this.props.selected_year == payout_year ){
      payout[4] = Number(payout[4])
      payout[5] = Number(payout[5])
      payout[6] = Number(payout[6])
      payout[7] = Number(payout[7])
      statement_details.push(payout)


      return (
        <tr>
          <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && payout[13] == this.props.selected_month && this.props.selected_year == "all" ){
      payout[4] = Number(payout[4])
      payout[5] = Number(payout[5])
      payout[6] = Number(payout[6])
      payout[7] = Number(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
        </tr>

      )
    }
    else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month == "all" && this.props.selected_year == payout_year ){
      payout[4] = Number(payout[4])
      payout[5] = Number(payout[5])
      payout[6] = Number(payout[6])
      payout[7] = Number(payout[7])
      statement_details.push(payout)

      return (
        <tr>
          <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
        </tr>

      )
    }
  }

  }

  createSummaryItem(){
    var paySummary = {}
    var attainSummary = {}
    this.props.payouts.map((payout) => {




      var pay = Number(payout[7])
      var attain = Number(payout[6])
      var payout_year = payout[17].split('-')[0]
      if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month == "all" && this.props.selected_year == "all"){
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
      else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && payout[13] == this.props.selected_month && this.props.selected_year == payout_year ){
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
      else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && payout[13] == this.props.selected_month && this.props.selected_year == "all" ){
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
      else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month == "all" && this.props.selected_year == payout_year ){
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
    // this.props.getPayouts_user({user_id:this.props.account['casted_user_id'], month_id:month})
  }

  handleYearChange = (e) => {
    var year = e.target.value
    this.props.selectYear(year)

  }

  createGoalItem(goal){

    var goal_amt = goal[5]
    var start_year = Number(goal[3].split('-')[0])
    var end_year = Number(goal[4].split('-')[0])
    var start_month = Number(goal[3].split('-')[1])
    var end_month = Number(goal[4].split('-')[1])
    var selected_year = Number(this.props.selected_year)
    var selected_month = Number(this.props.selected_month)
    if(this.props.account['casted_user_id'].toLowerCase() == goal[1].toLowerCase()){
      if(this.props.selected_month != 'all' && this.props.selected_year != 'all'){



          if(selected_year >= start_year && selected_year <= end_year ){
            if(selected_month>= start_month && selected_month <= end_month){


              goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])
              return(
              <tr>
                <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
              </tr>
            )
          }
        }

      }

      else if(this.props.selected_month == 'all' && this.props.selected_year != 'all'){

        if(selected_year >= start_year && selected_year <= end_year ){

          goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])
          return(
          <tr>
            <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
          </tr>
        )
        }
      }
      else if(this.props.selected_month != 'all' && this.props.selected_year == 'all'){

        if(selected_month>= start_month && selected_month <= end_month){

          goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])
          return(
          <tr>
            <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
          </tr>
        )
        }
      }

      else if(this.props.selected_month == 'all' && this.props.selected_year == 'all'){

        goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])

        return(
        <tr>
          <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
        </tr>
      )
      }
    }




  }

  makeChartItem(goal){
    var goal_start = new Date(goal[3])
    var goal_end = new Date(goal[4])
    var goal_rule = goal[6]
    var goal_amt = Number(goal[5])
    var prod_total = 0



    this.props.payouts.map((payout)=>{

      var pay_type = payout[16]
      var id = payout[15]
      var rule = payout[14]
      var multiplier = 1
      var payout_date = new Date(payout[17])
      var payout_attain = Number(payout[6])
      var payout_mo_num = Number(payout[13])


      if(this.props.selected_month == 'all'){
        var sel_mo_num = Number(12)
      }

      else{
        var sel_mo_num = Number(this.props.selected_month)
      }


      if(pay_type.toLowerCase().includes('ote')){
        multiplier = goal_amt
      }



      if(id==this.props.account['casted_user_id'].toLowerCase()){

        if(rule==goal_rule){

          if(payout_date >= goal_start && payout_mo_num <= sel_mo_num && payout_date <= goal_end){



            prod_total+=payout_attain*multiplier

          }
        }
      }
    })
    var goal_remain= Math.max(0,(goal_amt-prod_total))

    var progressvar = prod_total/goal_amt

    return(
      <React.Fragment>


          <div className='eight wide column'>
            <DoughnutChart
            progress={Math.round( ( (progressvar + Number.EPSILON) * 100) ).toString()+'%'}
            title={[goal_rule,goal[4],goal[8].toUpperCase() ]}
            feed={{
              labels: ['Production','Remaining to Goal'],
              datasets: [
                {
                  label: 'Production',
                  backgroundColor: [
                    '#C9DE00',
                    '#d3d3d3'

                  ],
                  hoverBackgroundColor: [

                  '#4B5000',
                  '#501800'
                  ],
                  data: [Math.round((prod_total + Number.EPSILON) * 100) / 100,Math.round((goal_remain + Number.EPSILON) * 100) / 100]
                }
              ],


            }}
            />
            </div>
            </React.Fragment>
    )
  }


  createChartItem(goal){
    if(this.props.account['casted_user_id'].toLowerCase() == goal[1].toLowerCase()){
      if(this.props.selected_month != 'all' && this.props.selected_year != 'all'){
        var start_year = Number(goal[3].split('-')[0])
        var end_year = Number(goal[4].split('-')[0])
        var start_month = Number(goal[3].split('-')[1])
        var end_month = Number(goal[4].split('-')[1])
        var selected_year = Number(this.props.selected_year)
        var selected_month = Number(this.props.selected_month)

          if(selected_year >= start_year && selected_year <= end_year ){
            if(selected_month>= start_month && selected_month <= end_month){
              return(
                this.makeChartItem(goal)


            )
          }
        }

      }

      else if(this.props.selected_month == 'all' && this.props.selected_year != 'all'){
        var selected_year = Number(this.props.selected_year)
        var start_year = Number(goal[3].split('-')[0])
        var end_year = Number(goal[4].split('-')[0])
        if(selected_year >= start_year && selected_year <= end_year ){
          return(

            this.makeChartItem(goal)

        )
        }
      }
      else if(this.props.selected_month != 'all' && this.props.selected_year == 'all'){
        var selected_month = Number(this.props.selected_month)
        var start_month = Number(goal[3].split('-')[1])
        var end_month = Number(goal[4].split('-')[1])
        if(selected_month>= start_month && selected_month <= end_month){
          return(

            this.makeChartItem(goal)

        )
        }
      }

      else if(this.props.selected_month == 'all' && this.props.selected_year == 'all'){
        return(

          this.makeChartItem(goal)
      )
      }
    }




  }



  createNoGoalChart(){
    var checker = false
    var no_goal_prod_total = {}
    var trans_id_tracker = []

    this.props.payouts.map((payout) => {

      if(trans_id_tracker.includes(payout[1]) == false){

        if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && (Number(payout[17].slice(5,7)) <= Number(this.props.selected_month) || this.props.selected_month.toLowerCase() == 'all') && (payout[17].slice(0,4) == this.props.selected_year.toString() || this.props.selected_year.toLowerCase() == 'all'  )  ) {
          trans_id_tracker.push(payout[1])
          //This thing above me is what enables only unique additions to the graph
          if(typeof(no_goal_prod_total[monthmap[payout[13]]]) != 'undefined'){


            no_goal_prod_total[monthmap[payout[13]]]+=Number(payout[6])
          }
          else{
            no_goal_prod_total[monthmap[payout[13]]]=Number(payout[6])
          }
          checker = true
        }
      }





    })

    var montharr = []
    var prodarr = []
    for (const [key, value] of Object.entries(no_goal_prod_total)) {
      montharr.push(key)
      prodarr.push(no_goal_prod_total[key])


    }

    if(checker){

      return(
        <BarChart feed={{
          labels: montharr,
          datasets: [
            {
              label: 'Production',
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",'#bada55','#ff7373','#fff68f','#b6fcd5','#8b0000','#ccff00','#daa520'],
              hoverBackgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",'#bada55','#ff7373','#fff68f','#b6fcd5','#8b0000','#ccff00','#daa520'],
              data: prodarr
            }
          ]


        }}

        title='YTD Production'


        />
      )
    }

}


  generateCharts(){
    var checker = true
    this.props.goals.map((goal) => {
      if(goal[1].toLowerCase() == this.props.account['casted_user_id'].toLowerCase()){
        checker = false
      }
    })
    if(checker){

      return(
        this.createNoGoalChart()
      )
    }

    return(this.props.goals.map((goal)=> {
      return(this.createChartItem(goal))
    })
)
  }

  renderGoals(){
    goal_details = [[''],['Goals'],['Rule','Goal','Start Date','End Date', 'Timeframe']]


    return this.props.goals.map((goal) => {
      return this.createGoalItem(goal)
    })
  }

  renderGoalHead(){
    var checker = false
    this.props.goals.map((goal)=> {
      if(goal[1].toLowerCase() == this.props.account['casted_user_id'].toLowerCase()){
        checker = true
      }
    })

    if(checker){
      return(
        <thead>
          <tr><th className='center aligned'>Rule</th><th className='center aligned'>Goal</th><th className='center aligned'>Start Date</th><th className='center aligned'>End Date</th><th className='center aligned'>Timeframe</th>
          </tr>
      </thead>
      )
    }
    else{
      return("No goals for this user")
    }
  }

  renderList(){

    statement_details.push([])
    statement_details.push([])
    statement_details.push([])
    statement_details.push(['Payout ID','Transaction ID','Seller ID','Payee','Revenue','Gross Profit','Attainment','Payout','Split percent','Transaction Location','Payout Multiplier','Order Number','Customer','Month','Attainment_Rule_Name','Payee ID','Type','Date'])
    return this.props.payouts.map((payout) => {

      return (this.createItem(payout))
    })

  }

  createSummaryLine(line){
    var statement_line = [monthmap[this.props.selected_month]]
    var i;
    for (i = 0; i < line.length; i++) {
      statement_line.push(line[i])
    }

    // statement_line.splice(1, 0, '');

    statement_details.push(statement_line)
    if(Number(line[1]) < 1){
      return(
        (
          <tr>
          <td className='center aligned'>{monthmap[this.props.selected_month]}</td>
          <td className='center aligned'>{line[0]}</td>
          <td className='center aligned'>{formatMoney(line[1],5)}</td>
          <td className='center aligned'>$ {formatMoney(line[2])}</td>
          </tr>
        )
      )
    }
    return (
      <tr>
      <td className='center aligned'>{monthmap[this.props.selected_month]}</td>
      <td className='center aligned'>{line[0]}</td>
      <td className='center aligned'>{formatMoney(line[1])}</td>
      <td className='center aligned'>$ {formatMoney(line[2])}</td>
      </tr>
    )
  }


  renderSummary(){
    var summaryArray = this.createSummaryItem()
    statement_details = [[`${monthmap[this.props.selected_month]} Commission statement for ${this.props.account['username']}`],[],['Summary Performance'],['Month','Attainment Rule','Attainment','Payout']]
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

      var linePay = Number(payout[7])


      if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month == "all" && this.props.selected_year == "all"){
        total_payout+=linePay
      }
      else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && payout[13] == this.props.selected_month && this.props.selected_year == payout_year ){
        total_payout+=linePay
      }
      else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && payout[13] == this.props.selected_month && this.props.selected_year == "all" ){
        total_payout+=linePay
      }
      else if(payout[15] == this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month == "all" && this.props.selected_year == payout_year ){
        total_payout+=linePay
      }

    })


    return <h2 className="marginleft ui dropdown">{monthmap[this.props.selected_month]} Payout: ${formatMoney(total_payout)} </h2>
  }

  renderUserItem(user,dept,lvl,uid){

    uid = uid.toLowerCase()

    if((user[9] == dept && user[8] < lvl) || user[0].toLowerCase() == uid || this.props.account['role'] == 'admin' ||(user[10] != null && user[10].toLowerCase() == uid)){ // IF THE SIGNED IN USER DEPARTMENT IS THE SAME AS THIS ROWS USER AND THE LEVEL IS LESS, OR IF THE USER IS EQUAL TO THE SIGNED IN USER, OR IF THE SIGNED IN USER IS AN ADMIN
      if((user[9] != null && user[8] != null) || user[0].toLowerCase() == uid || this.props.account['role'] == 'admin' ||(user[10] != null && user[10].toLowerCase() == uid)){ // IF THE USER HAS A ROW IN THE ROLE HIERARCHY DISPLAY IT, OR IF THE USER IS EQUAL TO THE SIGNED IN USER, OR IF THE SIGNED IN USER IS AN ADMIN, OR IF THE USERS MGR ID IS THE CURRENT USER ID
        // console.log('start')
        // console.log(`${user[9]} => ${dept}`)
        // console.log(`${user[8]} => ${lvl}`)
        // console.log(`${user[0]} => ${uid}`)
        return (
          <option value={user[0]} key={user[1]}> {user[1]} </option>
        )
      }
    }

  }

  renderUsersDropdown(){
    var uid = this.props.account['user_id'].toLowerCase()
    var dept = ''
    var lvl = ''

    this.props.users.map((user) => {

      if(user[0].toLowerCase() == uid){
        dept = user[9]
        lvl = user[8]

      }
    })




    return this.props.users.map((user) => {
      return this.renderUserItem(user,dept,lvl,uid)
    })

  }

  renderContent(){
    if(typeof(history.location.state.detail) == 'undefined'){
      return(<Login/>)
    }

    else if(true){

      return (<div className='ui grid '>


      <div class='thirteen wide column'>

      </div>
      <div className='three wide column'>
      <div className='ui center aligned grid'>
      <div class="sixteen wide column"></div>
      <select className='ui dropdown'  name="cast_user" onChange={(e) => e.stopPropagation(this.castUser(e))}>
                    <option value={this.props.account['user_id']}>Login as user...</option>
                    {this.renderUsersDropdown()}
                  </select>
                  </div>
                  </div>
      <div class="sixteen wide column">
      <div className='ui center aligned grid'>
      <div class="sixteen wide column">
      <h1 style={{fontSize:'3rem'}} className='ui huge header'>Dashboard </h1>
      </div>

      </div>
      </div>



      <div class="sixteen wide column">

      </div>

      <div class="five wide column">
        <div className='ui grid'>
          <div className='sixteen wide column'>
            <div className='ui center aligned grid'>
            <h2 className=''>Options</h2>
            </div>
          </div>


          <div class="one wide column">
          </div>

          <div className="fifteen wide column">
          <table className='ui celled center aligned table'>
            <thead><tr>
              <th className='center aligned'>Select Statement</th>
              <th className='center aligned'>Payout</th>
              </tr></thead>
              <tr>
                <td className='center aligned' className='three wide'>
                <select className='ui dropdown' onChange={this.handleYearChange}>
                  <option value={this.props.selected_year}>{this.props.selected_year}</option>
                  <option value="all">All</option>

                  {this.renderYearOptions()}


                </select>
                </td>
                <td className='center aligned'>
                  <h1 >{this.renderTotal()}</h1>
                </td>
              </tr>


            <tr>
            <td className='center aligned'>
            <select className='ui dropdown' onChange={this.handleChange}>
              <option value={monthmap[this.props.selected_month]}>{monthmap[this.props.selected_month]}</option>
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
            </td>
            <td className='center aligned'>
              <button className=' ui button positive' onClick={this.generateStatement}>Download statement for {monthmap[this.props.selected_month]} </button>
            </td>
            </tr>

          </table>
        </div>
      </div>
    </div>

      <div class="six wide column">
        <div className='ui center aligned grid'>

          {this.generateCharts()}

        </div>
      </div>
        <div class="five wide column">

        <div className='ui grid'>
          <div className='fifteen wide column'>
            <div className='ui center aligned grid'>
              <h2 className=''>Goals</h2>

            </div>
          </div>

            <div className="fifteen wide column">

            <table className='ui celled center aligned table'>
            {this.renderGoalHead()}

            {this.renderGoals()}
            </table>

            </div>

          </div>
          <div className='one wide column'></div>
        </div>


      <div class="sixteen wide column"></div>

      <div class="sixteen wide column">

      <div className='ui center aligned grid'>
      <h2 className=''>Summary Performance</h2>
      </div>
      </div>
      <div class="sixteen wide column"></div>

      <div className='ui container containermargin'>
        <table className='ui celled center aligned table'>
        <thead>
          <tr>
            <th className='center aligned'><strong>Month</strong></th>
            <th className='center aligned'><strong>Attainment Rule</strong></th>
            <th className='center aligned'><strong>Attainment</strong></th>
            <th className='center aligned'><strong>Payout</strong></th>

          </tr>
          </thead>
          {this.renderSummary()}
        </table>
        </div>
        <div class="sixteen wide column"></div>
        <div class="sixteen wide column"></div>
        <div class="sixteen wide column">
        <div className='ui center aligned grid'>
        <h2 className=''>Detailed Transaction Listing</h2>
        </div>
        </div>
        <div class="sixteen wide column"></div>
        <div style={{overflow:'auto', whitespace:'nowrap'}} className='ui container containermargin'>
        <table  className='ui celled small compact unstackable table'>

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
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payee',e.target.value))} placeholder="Search..."/>
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
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>

              </td>
              <td className='center aligned'>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
              </div>

              </td>

              <td className='center aligned'>
                <div class="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment_rule',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
              </div>
              </td>
              <td className='center aligned'>
              <div class="ui input">

                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
              </div>
              </td>
            </tr>
            <tr>


            <th className='center aligned'><strong>Transaction ID</strong></th>
            <th className='center aligned'><strong>Seller ID</strong></th>
            <th className='center aligned'><strong>Payee</strong></th>
            <th className='center aligned'><strong>Revenue</strong></th>
            <th className='center aligned'><strong>GP</strong></th>
            <th className='center aligned'><strong>Attainment</strong></th>
            <th className='center aligned'><strong>Rate</strong></th>
            <th className='center aligned'><strong>Payout</strong></th>
            <th className='center aligned'><strong>Split</strong></th>
            <th className='center aligned'><strong>Location</strong></th>
            <th className='center aligned'><strong>Multiplier</strong></th>
            <th className='center aligned'><strong>Order Num</strong></th>

            <th className='center aligned'><strong>Date</strong></th>
            <th className='center aligned'><strong>Rule</strong></th>
            <th className='center aligned'><strong>Type</strong></th>
            <th className='center aligned'><strong>Customer</strong></th>
            </tr>
          </thead>
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
        <div class="sixteen wide column">

        </div>
        <div class="sixteen wide column">

        </div>
        </div>


        </div>)
    }
//BELOW IS THE SELLER VIEW
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////




  }

  render(){


    if(typeof(this.props.account['user_id']) != "undefined" && typeof(this.props.account['casted_user_id']) != 'undefined'){

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
    users:state.users.users_joined,
    selected_year: state.account.selected_year,
    goals: state.goals.goals,
    years:state.month.years
  }
}

export default connect(mapStateToProps, { getUsers,getPayoutsHistory,calcPlans,loadCalcs,selectMonth,getTime,getPayouts_user,clearFilter,setFilter,castUser,selectYear,getGoals,getYears,getUsersJoined })(PayoutShow)
