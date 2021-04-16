import React from 'react'
import { connect } from 'react-redux'
import { getPayouts_show,calcPlans,loadCalcs,clearError,setFilter,getFilter,clearFilter,checkCalcStatus } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Login from '../Accounts/Login'

import globals from '../globals'

import history from '../../history'

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

class PayoutShow extends React.Component {




  componentDidMount(){
    this.props.clearFilter()
    this.props.getPayouts_show()
    this.props.getFilter()
    this.props.checkCalcStatus()
  }

  filterMap = {
    'payout_id':0,
    'transaction_id':1,
    'seller_id':2,
    'payee':3,
    'revenue':6,
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
    'type':16

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
    return (
      <tr key={payout[0]}>
        <td className='center aligned'>{payout[0]}</td><td className='center aligned'>{payout[1]}</td><td className='center aligned'>{payout[2]}</td><td className='center aligned'>{payout[3]}</td><td className='center aligned'>$ {formatMoney(payout[4])}</td><td className='center aligned'>$ {formatMoney(payout[5])}</td><td className='center aligned'>{payout[6]}</td><td className='center aligned'>$ {formatMoney(payout[7])}</td><td className='center aligned'>{payout[8]}</td><td className='center aligned'>{payout[9]}</td><td className='center aligned'>{payout[10]}</td><td className='center aligned'>{payout[11]}</td><td className='center aligned'>{payout[12]}</td><td className='center aligned'>{payout[13]}</td><td className='center aligned'>{payout[14]}</td><td className='center aligned'>{payout[16]}</td>
        <td className='center aligned'>
        <Link onClick={(e) => e.stopPropagation()} to={`/payoutShow/edit/${payout[0]}`} className='ui small button primary'>
          Edit
        </Link>

        </td>
      </tr>
    )}
  }

  renderCalcButton(){

      return(
        <React.Fragment>
        <div className='six wide column'></div>
          <div className='four wide column'>
            <div onClick={(e) => e.stopPropagation(history.push('/runCalcs'))} className='ui fluid button positive'>Run Calculations <i className="calculator icon   "></i></div>
          </div>
        <div className='six wide column'></div>
        </React.Fragment>
      )

  }



  renderList(){

    return this.props.payouts.map((payout) => {
      return (this.createItem(payout))
    })

  }

  renderContent(){
    // RUN CALCS BUTTON
      // <div className='ui fluid button positive icon' onClick={this.runCalc}> Run Calcs  <i className="calculator icon   "></i></div>


    return (

      <div className='ui  grid'>

    <div className="sixteen wide column"></div>
    <div className='one wide column'>

    </div>

    <div className='fourteen wide column'>
    <div className='ui center aligned grid'>
      <h1 className=''>Payouts</h1>
      </div>
      </div>
    <div className='one wide column'></div>

    <div className='sixteen wide column'></div>
    {this.renderCalcButton()}
    <div className='six wide column'></div>
    <div className='four wide column'>

    </div>
    <div className='six wide column'></div>

    <div className='containermargin' style={{"overflowX": "scroll"}}>
      <table className='ui celled table'>

        <thead>
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
            <th className='center aligned'><strong>Options</strong></th>
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

      if(this.props.calc === 'Running'){
        return (
          <Loader filler="Calculations Running - Please check back later..."/>
        )
    }

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
    payouts: Object.values(state.payouts.payouts_show),
    calc: state.calc.calc,
    account: state.account.account,
    errors: state.errors.errors,
    filter: state.filter.filter
  }
}

export default connect(mapStateToProps, { getPayouts_show,calcPlans,loadCalcs,clearError,setFilter,getFilter,clearFilter,checkCalcStatus })(PayoutShow)
