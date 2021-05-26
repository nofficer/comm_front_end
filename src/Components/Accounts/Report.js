import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs, selectMonth,getTime,getPayouts_user,clearFilter,setFilter,getUsers,castUser,selectYear,getGoals,getYears,getUsersJoined } from '../../actions'


import Login from '../Accounts/Login'
import XLSX from 'xlsx';
import monthmap from '../monthmap'
import history from '../../history'
import DoughnutChart from '../DoughnutChart'
import BarChart from '../BarChart'
import { saveAs } from 'file-saver'

import globals from '../globals'


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function getQuarter(d) {
  d = d || new Date(); // If no date supplied, use today
  var q = [1,2,3,4];
  return q[Math.floor(d.getMonth() / 3)];
}


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

    this.props.castUser(this.props.account['user_id'],this.props.account['role'],this.props.account['username'],e.target.value,this.props.account['token'])
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

      if(payout[this.filterMap[filter]] === null){
        check = false
        return false
      }
      else if(payout[this.filterMap[filter]] !== null){
        if(!payout[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){

            check = false
            return false
          }
      }
      return true


        }
    )

    if(

      check != false
    ){



    var pay_rate = (Number(payout[7])/Number(payout[6]))*100
    if(payout[18].toUpperCase().includes('OTE')){
      pay_rate = 'OTE'
    }
    else if(payout[18].toUpperCase().includes('RETRO')){
      pay_rate = 'RETRO'
    }
    else{
      pay_rate = pay_rate.toFixed(2) + '%'
    }

    if(payout[11] != 'OTE_Attainment' ){
      var payout_year = payout[17].split('-')[0]
      if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month === "all" && this.props.selected_year === "all"){
        payout[4] = Number(payout[4])
        payout[5] = Number(payout[5])
        payout[6] = Number(payout[6])
        payout[7] = Number(payout[7])
        statement_details.push(payout)

        return (
          <tr key={payout[0]}>
            <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
          </tr>

        )
      }
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && payout[13] === this.props.selected_month && this.props.selected_year === payout_year ){
        payout[4] = Number(payout[4])
        payout[5] = Number(payout[5])
        payout[6] = Number(payout[6])
        payout[7] = Number(payout[7])
        statement_details.push(payout)


        return (
          <tr key={payout[0]}>
            <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
          </tr>

        )
      }
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && payout[13] === this.props.selected_month && this.props.selected_year === "all" ){
        payout[4] = Number(payout[4])
        payout[5] = Number(payout[5])
        payout[6] = Number(payout[6])
        payout[7] = Number(payout[7])
        statement_details.push(payout)

        return (
          <tr key={payout[0]}>
            <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
          </tr>

        )
      }
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month === "all" && this.props.selected_year === payout_year ){
        payout[4] = Number(payout[4])
        payout[5] = Number(payout[5])
        payout[6] = Number(payout[6])
        payout[7] = Number(payout[7])
        statement_details.push(payout)

        return (
          <tr key={payout[0]}>
            <td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>{pay_rate}</td><td className='center aligned'>${formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[17]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td><td className='center aligned'>{payout[12]}</td>
          </tr>

        )
      }
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
      if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month === "all" && this.props.selected_year === "all"){
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
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && payout[13] === this.props.selected_month && this.props.selected_year === payout_year ){

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
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && payout[13] === this.props.selected_month && this.props.selected_year === "all" ){
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
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month === "all" && this.props.selected_year === payout_year ){
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


      return true
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
    if(this.props.account['casted_user_id'].toLowerCase() === goal[1].toLowerCase()){
      if(this.props.selected_month !== 'all' && this.props.selected_year !== 'all'){



          if(selected_year >= start_year && selected_year <= end_year ){
            if(selected_month>= start_month && selected_month <= end_month){


              goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])
              return(
              <tr key={goal[0]+goal[4]}>
                <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
              </tr>
            )
          }
        }

      }

      else if(this.props.selected_month === 'all' && this.props.selected_year !== 'all'){

        if(selected_year >= start_year && selected_year <= end_year ){

          goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])
          return(
          <tr key={goal[0]+goal[4]}>
            <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
          </tr>
        )
        }
      }
      else if(this.props.selected_month !== 'all' && this.props.selected_year === 'all'){

        if(selected_month>= start_month && selected_month <= end_month){

          goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])
          return(
          <tr key={goal[0]+goal[4]}>
            <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
          </tr>
        )
        }
      }

      else if(this.props.selected_month === 'all' && this.props.selected_year === 'all'){

        goal_details.push([goal[6],formatMoney(goal_amt),goal[3],goal[4],goal[8].toUpperCase()])

        return(
        <tr key={goal[0]+goal[4]}>
          <td className='center aligned'>{goal[6]}</td><td className='center aligned'>{formatMoney(goal_amt)}</td><td className='center aligned'>{goal[3]}</td><td className='center aligned'>{goal[4]}</td><td className='center aligned'>{goal[8].toUpperCase()}</td>
        </tr>
      )
      }
    }




  }

  makeChartItem(goal){
    var goal_start = new Date(goal[3].replace(/-/g, '\/'))
    var goal_end = new Date(goal[4].replace(/-/g, '\/'))
    var goal_rule = goal[6]
    var goal_amt = Number(goal[5])
    var prod_total = 0



    this.props.payouts.map((payout)=>{
      // if(payout[3] == "Alex"){
      //   console.log(payout)
      // }

      var pay_source = payout[18]
      var id = payout[15]
      var rule = payout[14]
      var multiplier = 1
      var payout_date = new Date(payout[17].replace(/-/g, '\/'))
      var payout_attain = Number(payout[6])
      var payout_mo_num = Number(payout[13])
      var sel_mo_num = 0


      if(this.props.selected_month === 'all'){
        sel_mo_num = Number(12)
      }

      else{
        sel_mo_num = Number(this.props.selected_month)
      }

      //THE TYPE IS SET BY THE SYSTEM IF IT IS A PAYOUT FOR AN OTE OR RETRO TRANSACTION BECAUSE THE SYSTEM CREATES A TRANSACTION FOR IT
      if(pay_source.toLowerCase().includes('ote') || pay_source.toLowerCase().includes('retro')){

        multiplier = goal_amt
      }




      var sel_mo_date = this.props.selected_year + '/' + this.props.selected_month + '/' + '15'

      var sel_mo_date_typed = new Date(sel_mo_date)

      if(id===this.props.account['casted_user_id'].toLowerCase()){


        if(rule===goal_rule){

          //TODO ADD QUALIFIER WHICH CHECKS IF THE GOAL IS MTD OR QTD OR YTD AND FILTER THE GOAL SUMMING BASED ON THAT
          if(goal[8].toLowerCase()==='mtd'){

            //SET THIS UP SO THAT IF SELECTED MONTH IS ALL THEN IT WILL STILL FILL UP PRODUCTION FOR THE GOALS WHICH ARE MTD. Otherwise it wasn't summing it because the payout_mo_num is not 12
            if(payout_date >= goal_start && (payout_mo_num === sel_mo_num || this.props.selected_month === 'all') && payout_date <= goal_end){



              prod_total+=payout_attain*multiplier

            }
          }
          else if(goal[8].toLowerCase()==='qtd'){


            if(payout_date >= goal_start && payout_mo_num <= sel_mo_num && payout_date <= goal_end && ( getQuarter(payout_date) === getQuarter(sel_mo_date_typed) || this.props.selected_month === 'all') ){



              prod_total+=payout_attain*multiplier

            }

          }
          else if(goal[8].toLowerCase()==='ytd'){
            if(payout_date >= goal_start && payout_mo_num <= sel_mo_num && payout_date <= goal_end){



              prod_total+=payout_attain*multiplier

            }
          }



        }
      }

      return true
    })
    var goal_remain= Math.max(0,(goal_amt-prod_total))

    var progressvar = prod_total/goal_amt

    return(
      <React.Fragment key={goal[0] + goal[4]}>


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
    var selected_year = Number(this.props.selected_year)
    var start_year = Number(goal[3].split('-')[0])
    var end_year = Number(goal[4].split('-')[0])
    var start_month = Number(goal[3].split('-')[1])
    var end_month = Number(goal[4].split('-')[1])
    var selected_month = Number(this.props.selected_month)
    if(this.props.account['casted_user_id'].toLowerCase() === goal[1].toLowerCase()){
      if(this.props.selected_month !== 'all' && this.props.selected_year !== 'all'){

          if(selected_year >= start_year && selected_year <= end_year ){
            if(selected_month>= start_month && selected_month <= end_month){
              return(
                this.makeChartItem(goal)


            )
          }
        }

      }

      else if(this.props.selected_month === 'all' && this.props.selected_year !== 'all'){

        if(selected_year >= start_year && selected_year <= end_year ){
          return(

            this.makeChartItem(goal)

        )
        }
      }
      else if(this.props.selected_month !== 'all' && this.props.selected_year === 'all'){

        if(selected_month>= start_month && selected_month <= end_month){
          return(

            this.makeChartItem(goal)

        )
        }
      }

      else if(this.props.selected_month === 'all' && this.props.selected_year === 'all'){
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


      if(trans_id_tracker.includes(payout[1]) === false){
        //TODO The way I am filtering here is going to mess me up I am comparing the date string month value to the selected month number. This only works for places that have a calendar year fiscal year, anything else will cause this to fail
        if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && (Number(payout[13]) <= Number(this.props.selected_month) || this.props.selected_month.toLowerCase() === 'all') && (payout[17].slice(0,4) === this.props.selected_year.toString() || this.props.selected_year.toLowerCase() === 'all'  )  ) {
          trans_id_tracker.push(payout[1])
          //This thing above me is what enables only unique additions to the graph
          if(typeof(no_goal_prod_total[monthmap[payout[13]]]) !== 'undefined'){


            no_goal_prod_total[monthmap[payout[13]]]+=Number(payout[6])
          }
          else{

            no_goal_prod_total[monthmap[payout[13]]]=Number(payout[6])
          }
          checker = true
        }
      }




      return true
    })

    var montharr = []
    var prodarr = []
    for (const [key, value] of Object.entries(no_goal_prod_total)) {
      montharr.push(key)

      prodarr.push(value)


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
      if(goal[1].toLowerCase() === this.props.account['casted_user_id'].toLowerCase()){
        checker = false
        return false
      }
      return true
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
      if(goal[1].toLowerCase() === this.props.account['casted_user_id'].toLowerCase()){
        checker = true
        return true
      }
      return true
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
      return(<tbody><tr><td>No goals for this user</td></tr></tbody>)
    }
  }

  renderList(){

    statement_details.push([])
    statement_details.push([])
    statement_details.push([])
    statement_details.push([globals.payout_id,globals.trans_id,globals.seller_id,globals.payee,globals.revenue,globals.gp,globals.attainment,globals.payout,globals.split,globals.location,globals.multiplier,globals.order_num,globals.custom_field,globals.month,globals.rule,globals.payee_id,globals.type,globals.date,'Calc_Type'])
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
          <tr key={line[0]}>
          <td className='center aligned'>{monthmap[this.props.selected_month]}</td>
          <td className='center aligned'>{line[0]}</td>
          <td className='center aligned'>{formatMoney(line[1],5)}</td>
          <td className='center aligned'>$ {formatMoney(line[2])}</td>
          </tr>
        )
      )
    }
    return (
      <tr key={line[0]}>
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


      if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month === "all" && this.props.selected_year === "all"){
        total_payout+=linePay
      }
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && payout[13] === this.props.selected_month && this.props.selected_year === payout_year ){
        total_payout+=linePay
      }
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && payout[13] === this.props.selected_month && this.props.selected_year === "all" ){
        total_payout+=linePay
      }
      else if(payout[15] === this.props.account['casted_user_id'].toLowerCase() && this.props.selected_month === "all" && this.props.selected_year === payout_year ){
        total_payout+=linePay
      }
      return true
    })


    return <h2 className="marginleft ui dropdown">{monthmap[this.props.selected_month]} Payout: ${formatMoney(total_payout)} </h2>
  }

  renderUserItem(user,dept,lvl,uid){

    uid = uid.toLowerCase()

    if((user[9] === dept && user[8] < lvl) || user[0].toLowerCase() === uid || this.props.account['role'] === 'admin' ||(user[10] !== null && user[10].toLowerCase() === uid)){ // IF THE SIGNED IN USER DEPARTMENT IS THE SAME AS THIS ROWS USER AND THE LEVEL IS LESS, OR IF THE USER IS EQUAL TO THE SIGNED IN USER, OR IF THE SIGNED IN USER IS AN ADMIN
      if((user[9] !== null && user[8] !== null) || user[0].toLowerCase() === uid || this.props.account['role'] === 'admin' ||(user[10] !== null && user[10].toLowerCase() === uid)){ // IF THE USER HAS A ROW IN THE ROLE HIERARCHY DISPLAY IT, OR IF THE USER IS EQUAL TO THE SIGNED IN USER, OR IF THE SIGNED IN USER IS AN ADMIN, OR IF THE USERS MGR ID IS THE CURRENT USER ID

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

      if(user[0].toLowerCase() === uid){
        dept = user[9]
        lvl = user[8]

      }
      return true
    })




    return this.props.users.map((user) => {
      return this.renderUserItem(user,dept,lvl,uid)
    })

  }

  renderContent(){
    if(typeof(history.location.state.detail) === 'undefined'){
      return(<Login/>)
    }

    else if(true){

      return (<div className='ui grid '>


      <div className='thirteen wide column'>

      </div>
      <div className='three wide column'>
      <div className='ui center aligned grid'>
      <div className="sixteen wide column"></div>
      <select className='ui dropdown'  name="cast_user" onChange={(e) => e.stopPropagation(this.castUser(e))}>
                    <option value={this.props.account['user_id']}>Login as user...</option>
                    {this.renderUsersDropdown()}
                  </select>
                  </div>
                  </div>
      <div className="sixteen wide column">
      <div className='ui center aligned grid'>
      <div className="sixteen wide column">
      <h1 style={{fontSize:'3rem'}} className='ui huge header'>Dashboard </h1>
      </div>

      </div>
      </div>



      <div className="sixteen wide column">

      </div>

      <div className="five wide column">
        <div className='ui grid'>
          <div className='sixteen wide column'>
            <div className='ui center aligned grid'>
            <h2 className=''>Options</h2>
            </div>
          </div>


          <div className="one wide column">
          </div>

          <div className="fifteen wide column">
          <table className='ui celled center aligned table'>
            <thead><tr>
              <th className='center aligned'>Select Statement</th>
              <th className='center aligned'>Payout</th>
              </tr></thead>
              <tbody>
              <tr>
                <td className='center aligned three wide' >
                <select className='ui dropdown' onChange={this.handleYearChange}>
                  <option value={this.props.selected_year}>{this.props.selected_year}</option>
                  <option value="all">All</option>

                  {this.renderYearOptions()}


                </select>
                </td>
                <td className='center aligned'>
                  <div >{this.renderTotal()}</div>
                </td>
              </tr>


            <tr>
            <td className='center aligned'>
            <select className='ui dropdown' onChange={this.handleChange}>
              <option value={monthmap[this.props.selected_month]}>{monthmap[this.props.selected_month]}</option>
              <option value="all">Year To Date</option>
              <option value="1">{monthmap[1]}</option>
              <option value="2">{monthmap[2]}</option>
              <option value="3">{monthmap[3]}</option>
              <option value="4">{monthmap[4]}</option>
              <option value="5">{monthmap[5]}</option>
              <option value="6">{monthmap[6]}</option>
              <option value="7">{monthmap[7]}</option>
              <option value="8">{monthmap[8]}</option>
              <option value="9">{monthmap[9]}</option>
              <option value="10">{monthmap[10]}</option>
              <option value="11">{monthmap[11]}</option>
              <option value="12">{monthmap[12]}</option>

            </select>
            </td>
            <td className='center aligned'>
              <button className=' ui button positive' onClick={this.generateStatement}>Download statement for {monthmap[this.props.selected_month]} </button>
            </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

      <div className="six wide column">
        <div className='ui center aligned grid'>

          {this.generateCharts()}

        </div>
      </div>
        <div className="five wide column">

        <div className='ui grid'>
          <div className='fifteen wide column'>
            <div className='ui center aligned grid'>
              <h2 className=''>Goals</h2>

            </div>
          </div>

            <div className="fifteen wide column">

            <table className='ui celled center aligned table'>
            {this.renderGoalHead()}

            <tbody>
            {this.renderGoals()}
            </tbody>
            </table>

            </div>

          </div>
          <div className='one wide column'></div>
        </div>


      <div className="sixteen wide column"></div>

      <div className="sixteen wide column">

      <div className='ui center aligned grid'>
      <h2 className=''>Summary Performance</h2>
      </div>
      </div>
      <div className="sixteen wide column"></div>

      <div className='ui container containermargin'>
        <table className='ui celled center aligned table'>
        <thead>
          <tr>
            <th className='center aligned'><strong>{globals.month}</strong></th>
            <th className='center aligned'><strong>{globals.rule}</strong></th>
            <th className='center aligned'><strong>{globals.attainment}</strong></th>
            <th className='center aligned'><strong>{globals.payout}</strong></th>

          </tr>
          </thead>
          <tbody>
          {this.renderSummary()}
          </tbody>
        </table>
        </div>
        <div className="sixteen wide column"></div>
        <div className="sixteen wide column"></div>
        <div className="sixteen wide column">
        <div className='ui center aligned grid'>
        <h2 className=''>Detailed Transaction Listing</h2>
        </div>
        </div>
        <div className="sixteen wide column"></div>
        <div style={{overflow:'auto', whitespace:'nowrap',"transform":"rotateX(180deg)"}} className='ui container containermargin'>
        <table  className='ui celled compact unstackable table' style={{"transform":"rotateX(180deg)"}}>

          <thead>
            <tr>

              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('trans_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payee',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>

              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
              </div>

              </td>

              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment_rule',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
              </div>
              </td>
              <td className='center aligned'>
              <div className="ui input">

                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
              </div>
              </td>
            </tr>
            <tr>


            <th className='center aligned'><strong>{globals.trans_id}</strong></th>
            <th className='center aligned'><strong>{globals.seller_id}</strong></th>
            <th className='center aligned'><strong>{globals.payee}</strong></th>
            <th className='center aligned'><strong>{globals.revenue}</strong></th>
            <th className='center aligned'><strong>{globals.gp}</strong></th>
            <th className='center aligned'><strong>{globals.attainment}</strong></th>
            <th className='center aligned'><strong>{globals.rate}</strong></th>
            <th className='center aligned'><strong>{globals.payout}</strong></th>
            <th className='center aligned'><strong>{globals.split}</strong></th>
            <th className='center aligned'><strong>{globals.location}</strong></th>
            <th className='center aligned'><strong>{globals.multiplier}</strong></th>
            <th className='center aligned'><strong>{globals.order_num}</strong></th>

            <th className='center aligned'><strong>{globals.date}</strong></th>
            <th className='center aligned'><strong>{globals.rule}</strong></th>
            <th className='center aligned'><strong>{globals.type}</strong></th>
            <th className='center aligned'><strong>{globals.custom_field}</strong></th>
            </tr>
          </thead>
          <tbody>
          {this.renderList()}
          </tbody>
        </table>
        <div className="sixteen wide column">

        </div>
        <div className="sixteen wide column">

        </div>
        </div>


        </div>)
    }
  }
//Mobile render below
renderMobileContent(){
  if(typeof(history.location.state.detail) === 'undefined'){
    return(<Login/>)
  }

  else if(typeof(this.props.account['user_id']) !== 'undefined'){

    return (<div className='ui grid '>


    <div className='thirteen wide column'>

    </div>
    <div className='three wide column'>
    <div className='ui center aligned grid'>
    <div className="sixteen wide column">

    </div>

                </div>
                </div>
    <div className="sixteen wide column">
    <div className='ui center aligned grid'>
    <div className="sixteen wide column">

    </div>

    </div>
    </div>



    <div className="sixteen wide column">

    </div>


        <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
          <h1 style={{fontSize:'3rem'}} className='ui huge header'>Dashboard </h1>
          <table className='ui celled center aligned table'>
            <thead><tr>
              <th>Payout Summary</th>
              </tr></thead>
              <tbody>
              <tr>
                <td className='center aligned' >
                <select className='ui dropdown'  name="cast_user" onChange={(e) => e.stopPropagation(this.castUser(e))}>
                              <option value={this.props.account['user_id']}>Login as user...</option>
                              {this.renderUsersDropdown()}
                            </select>
                </td>
                </tr>

              <tr>
                <td className='center aligned' >
                <select className='ui dropdown' onChange={this.handleYearChange}>
                  <option value={this.props.selected_year}>{this.props.selected_year}</option>
                  <option value="all">All</option>

                  {this.renderYearOptions()}


                </select>
                </td>
                </tr>



            <tr>
            <td className='center aligned'>
            <select className='ui dropdown' onChange={this.handleChange}>
              <option value={monthmap[this.props.selected_month]}>{monthmap[this.props.selected_month]}</option>
              <option value="all">Year To Date</option>
              <option value="1">{monthmap[1]}</option>
              <option value="2">{monthmap[2]}</option>
              <option value="3">{monthmap[3]}</option>
              <option value="4">{monthmap[4]}</option>
              <option value="5">{monthmap[5]}</option>
              <option value="6">{monthmap[6]}</option>
              <option value="7">{monthmap[7]}</option>
              <option value="8">{monthmap[8]}</option>
              <option value="9">{monthmap[9]}</option>
              <option value="10">{monthmap[10]}</option>
              <option value="11">{monthmap[11]}</option>
              <option value="12">{monthmap[12]}</option>

            </select>
            </td>

            </tr>
            <tr>

            <td className='center aligned'>
              <div >{this.renderTotal()}</div>
            </td>
          </tr>

          <tr>
          <td className='center aligned'>

          </td>
          </tr>
            </tbody>
          </table>
          </div>

        </div>


        <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
            {this.generateCharts()}
          </div>
        </div>







    <div className="six wide column">
      <div className='ui center aligned grid'>



      </div>
    </div>
      <div className="five wide column">

      <div className='ui grid'>
        <div className='fifteen wide column'>
          <div className='ui center aligned grid'>


          </div>
        </div>

          <div className="fifteen wide column">



          </div>

        </div>
        <div className='one wide column'></div>
      </div>


    <div className="sixteen wide column"></div>

    <div className="sixteen wide column">

    <div className='ui center aligned grid'>

    </div>
    </div>
    <div className="sixteen wide column"></div>

    <div className='ui container containermargin'>

      </div>
      <div className="sixteen wide column"></div>
      <div className="sixteen wide column"></div>
      <div className="sixteen wide column">
      <div className='ui center aligned grid'>
      <h2 className=''>Detailed Transaction Listing</h2>
      </div>
      </div>
      <div className="sixteen wide column"></div>
      <div style={{overflow:'auto', whitespace:'nowrap'}} className='ui container containermargin'>
      <table  className='ui celled small compact unstackable table'>

        <thead>
          <tr>

            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('trans_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payee',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>

            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
            </div>

            </td>

            <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attainment_rule',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
            </div>
            </td>
            <td className='center aligned'>
            <div className="ui input">

              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
            </div>
            </td>
          </tr>
          <tr>


          <th className='center aligned'><strong>{globals.trans_id}</strong></th>
          <th className='center aligned'><strong>{globals.seller_id}</strong></th>
          <th className='center aligned'><strong>{globals.payee}</strong></th>
          <th className='center aligned'><strong>{globals.revenue}</strong></th>
          <th className='center aligned'><strong>{globals.gp}</strong></th>
          <th className='center aligned'><strong>{globals.attainment}</strong></th>
          <th className='center aligned'><strong>{globals.rate}</strong></th>
          <th className='center aligned'><strong>{globals.payout}</strong></th>
          <th className='center aligned'><strong>{globals.split}</strong></th>
          <th className='center aligned'><strong>{globals.location}</strong></th>
          <th className='center aligned'><strong>{globals.multiplier}</strong></th>
          <th className='center aligned'><strong>{globals.order_num}</strong></th>

          <th className='center aligned'><strong>{globals.date}</strong></th>
          <th className='center aligned'><strong>{globals.rule}</strong></th>
          <th className='center aligned'><strong>{globals.type}</strong></th>
          <th className='center aligned'><strong>{globals.custom_field}</strong></th>
          </tr>
        </thead>
        <tbody>
        {this.renderList()}
        </tbody>
      </table>
      <div className="sixteen wide column">

      </div>
      <div className="sixteen wide column">

      </div>
      </div>


      </div>)
  }




  }

  render(){

    if(window.mobileCheck()){
      if(typeof(this.props.account['user_id']) !== "undefined" && typeof(this.props.account['casted_user_id']) !== 'undefined'){
        return(
          <div>
          {this.renderMobileContent()}
          </div>
        )
    }
    }

    if(typeof(this.props.account['user_id']) !== "undefined" && typeof(this.props.account['casted_user_id']) !== 'undefined'){

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
