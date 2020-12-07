import React from 'react'
import { connect } from 'react-redux'
import { getPayoutsHistory,calcPlans,loadCalcs } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Login from '../Accounts/Login'



class PayoutShow extends React.Component {


  componentWillReceiveProps(nextProps) {
  const newValue =  nextProps.calculatedValue;

  if (newValue !== this.props.calculatedValue && newValue  === 'something') {
    this.props.actionB();
  }
}

  componentDidMount(){
    this.props.getPayoutsHistory()

  }

  createItem(payout){
    return (
      <tr>
        <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>${payout[4]}</td><td>${payout[5]}</td><td>${payout[6]}</td><td>${payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td>


      </tr>
    )
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



    return (<div className='ui  grid'>
      <h1>Payouts</h1>


      <table className='ui celled table'>

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
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPayoutsHistory,calcPlans,loadCalcs })(PayoutShow)
