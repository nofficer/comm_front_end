import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile,getPayouts_cy,getSummaryData,getYears,getPlanSummary,getTopEarners} from '../actions'


import LineChart from './LineChart'
import PieChart from './PieChart'
import history from '../history'
import monthmap from './monthmap'
import axios from 'axios'

import LoaderNoButton from '../LoaderNoButton'

import CCoGPChart from './CCoGPChart'

import Login from './Accounts/Login'









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


class Landing extends React.Component {
  componentDidMount(){

    this.props.getYears()
    this.props.getSummaryData({'requested_year':this.props.month['cal_year']})
    this.props.getPlanSummary({'requested_year':this.props.month['cal_year']})
    this.props.getTopEarners({'requested_year':this.props.month['cal_year']})


  }

  onSubmit = (formValues) => {

  }

  createYearOption(year){
    return (
      <option  key={year} value={year}>{year}</option>
    )
  }

  renderTopEarners(){

    return this.props.top_earners.map((earner) => {
      return this.renderEarnItem(earner)
    })



  }

  renderEarnItem(earner){
    return (
      <tr key={earner[0]}>
      <td>{earner[0]}</td><td>${formatMoney(earner[1])}</td>
      </tr>
    )
  }


  renderYearOptions(){

    return this.props.years.map((year) => {
      return this.createYearOption(year)
    })
  }

  renderPayout(){

    return(<div className='ui huge header'>Total Payout YTD: ${formatMoney(this.props.payout)}</div>)
  }

  sortSummaryData(){
    var transactions = this.props.summary_data[0]
    var payouts = this.props.summary_data[1]

    var trans_results = [0,0,0,0,0,0,0,0,0,0,0,0]
    var pay_results = [0,0,0,0,0,0,0,0,0,0,0,0]

    if(typeof(transactions) != 'undefined' && typeof(payouts) != 'undefined'){
      transactions.map((tx) => {
        trans_results[tx.month-1]+=tx.gp
        return true
      })

      payouts.map((pay) => {
        pay_results[pay.month-1]+=pay.payout
        return true
      })
    }



    var labels = [monthmap[1],monthmap[2],monthmap[3],monthmap[4],monthmap[5],monthmap[6],monthmap[7],monthmap[8],monthmap[9],monthmap[10],monthmap[11],monthmap[12]]
    var ccogp = []
    var i;
    for (i=0; i< trans_results.length; i++){
      if(trans_results[i]+pay_results[i]>0){

        ccogp.push((pay_results[i]/trans_results[i])*100)
      }
      else {
        ccogp.push(0)
      }

    }



    return({'labels':labels,'payouts':pay_results,'transactions':trans_results,'ccogp':ccogp})



  }



  getSummary = (e) => {
    this.props.getSummaryData({'requested_year':e.target.value})
    this.props.getPlanSummary({'requested_year':e.target.value})
    this.props.getTopEarners({'requested_year':e.target.value})
    var title = e.target.value
    if(e.target.value==='all'){
      title = 'All Time'
    }


    document.getElementById("Year_Title").innerHTML =  title + ' Summary'
  }





  render(){
    var sum_data = this.sortSummaryData()

    if(this.props.account['role'] ==='seller'){


      return (<div className='ui grid'>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>

      <div className='sixteen wide column'>
      <div className='ui center aligned grid'>
        <div  className='ui header bigfont'>EasyComp</div>
        </div></div>






        <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
          <div className='four wide column'>

          </div>
          <div className='one wide column'>

          </div>
            <div className='six wide column'>


            </div>
            <div className='five wide column'>

            </div>
            <div className='sixteen wide column'>

            </div>
            <div className='five wide column'>

            </div>
            <div className='six wide column'>
              <div onClick={(e) => e.stopPropagation(history.push({pathname:'/report',state:{detail:this.props.month}}))} className="ui fluid primary button">Commissions Report</div>
            </div>
            <div className='five wide column'>

            </div>
            <div className='sixteen wide column'></div>

            <div className='sixteen wide column'>

            </div>
            <div className='four wide column'>

            </div>


          </div>

          </div>

        </div>
      )
    }
    else if(this.props.account['role'] ==='admin' && typeof(this.props.month['cal_year']) != 'undefined' ){

      sum_data['ccogp'] = sum_data['ccogp'].map((x) => {
        return(Math.round((x + Number.EPSILON) ))
      })

      var payouts_vals = Object.values(this.props.plan_summary)
      var total_payout = '$' + formatMoney(payouts_vals.reduce((a,b) => a + b, 0))
      return ( <div className='ui grid'>
      <div className='sixteen wide column'></div>

      <div className='two wide column'></div>
      <div className='twelve wide column'>
      <div className='ui center aligned grid'>
        <div  className='ui header bigfont'>EasyComp</div>
        </div></div>
      <div className='two wide column'>
        <div className='ui center aligned grid'>
          <div className='sixteen wide column'>
            <select className='ui dropdown' onChange={(e) => e.stopPropagation(this.getSummary(e))}>
              <option value={this.props.month['cal_year'].toString()}>Current Year: {this.props.month['cal_year'].toString()}</option>
              {this.renderYearOptions()}
              <option value="all">All</option>

            </select>
          </div>
        </div>


      </div>


        <div className='sixteen wide column'>
          <div className="ui horizontal divider">
          *
          </div>
        </div>


        <div className='sixteen wide column'>

          <div className='ui center aligned grid '>







          <div className='sixteen wide column'>
            <div className='ui center aligned grid '>
            <div className='two wide column'>


            </div>
              <div className='twelve wide column'>
                <h2 id='Year_Title'> {this.props.month['cal_year']} Summary</h2>
              </div>

              <div className='two wide column'>



              </div>
              <div className='sixteen wide column'>
              </div>
            </div>
            </div>

            <div className='one wide column '>
            </div>
                <div className='six wide column '>
                  <div  className='ui center aligned grid' >
                      <div className='sixteen wide column ui placeholder segment'>


                        <LineChart title={["Gross Profit Vs. Total Payout"]}  payouts={sum_data['payouts']} profits={sum_data['transactions']} labels={sum_data['labels']} />
                      </div>

                      <div className='sixteen wide column ui placeholder segment'>
                        <CCoGPChart title={"Comp Cost of GP"} label='CCOGP (Pay as a % of Gross Profit)' labels={sum_data['labels']}  colors={['rgb(0, 0, 255,0.1)','rgb(0, 0, 255)']} ccogp={sum_data['ccogp']}/>
                      </div>
                  </div>
                </div>
                <div className='one wide column '>
                </div>

                <div className='six wide column '>
                    <div className='ui center aligned grid' >
                      <div className='sixteen wide column ui placeholder segment'>

                      <PieChart
                      progress={total_payout}

                      title="YTD Payouts By Plan"
                      feed={{
                        labels: Object.keys(this.props.plan_summary),
                        datasets: [
                          {
                            label: 'Production',
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",'#bada55','#ff7373','#fff68f','#b6fcd5','#8b0000','#ccff00','#daa520'],
                            hoverBackgroundColor: ['#4c4b52','#4c4b52','#4c4b52','#4c4b52','#4c4b52','#4c4b52','#4c4b52','#4c4b52','#4c4b52','#4c4b52'],
                            data: Object.values(this.props.plan_summary)
                          }
                        ],


                      }}
                      />
                      </div>

                      <div className='sixteen wide column  ui placeholder segment'>
                      <h3>Top Earners</h3>
                        <table className='ui celled center aligned table'>
                          <thead>
                              <tr>
                                <th>Employee</th>
                                <th>Earnings</th>
                              </tr>
                          </thead>
                          <tbody>
                          {this.renderTopEarners()}
                          </tbody>
                        </table>
                      </div>
                    </div>



              </div>
              <div className='one wide column '>
              </div>

              <div className='five wide column'>

              </div>
            <div className='six wide column'>
              <div className='ui center aligned grid'>



              </div>

            </div>
            <div className='five wide column'>

            </div>

            <div className='sixteen wide column'>

            </div>

            <div className='sixteen wide column'></div>

            <div className='sixteen wide column'>

            </div>
            <div className='four wide column'>

            </div>


          </div>

          </div>

        </div>
      )
    }
    if(typeof(this.props.account['role']) ==='undefined'){
      if(typeof(this.props.years[0]) != 'string' ){
        return(
          <LoaderNoButton filler='loading...'/>
        )
      }
      return(
        <div className='ui grid'>
        <Login/>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>

      <div className='sixteen wide column'>
      <div className='ui center aligned grid'>
        <div  className='ui header bigfont'>EasyComp</div>
        </div></div>

        <div className='sixteen wide column'>



        </div>
        <div className='sixteen wide column'>


        </div>
        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>

        <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
            <div className='sixteen wide column'>
              <i onClick={(e) => e.stopPropagation(history.push({pathname:'/report',state:{detail:this.props.month}}))} className="calculator icon bigicon"></i>

            </div>
            <div className='sixteen wide column'>

            </div>
            <div className='five wide column'>

            </div>
            <div className='six wide column'>
              <div onClick={(e) => e.stopPropagation(history.push({pathname:'/report',state:{detail:this.props.month}}))} className="ui fluid positive button">Login</div>
            </div>
            <div className='five wide column'>

            </div>
            <div className='sixteen wide column'>

            </div>
            <div className='sixteen wide column'></div>

            <div className='sixteen wide column'>

            </div>
            <div className='four wide column'>

            </div>


          </div>

          </div>

        </div>
      )
    }
    else{
      return <div> Loading...</div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    month:state.month.month,
    payout: Object.values(state.payouts.payouts),
    account: state.account.account,
    years:state.month.years,
    summary_data:state.month.summary_data,
    plan_summary:state.month.plan_summary,
    top_earners:state.month.top_earners
  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile,getPayouts_cy,getSummaryData,getYears,getPlanSummary,getTopEarners})(Landing)
