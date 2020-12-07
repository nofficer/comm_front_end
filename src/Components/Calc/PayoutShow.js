import React from 'react'
import { connect } from 'react-redux'
import { getPayouts,calcPlans,loadCalcs,clearError } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Login from '../Accounts/Login'
import Modal from '../../Modal'
import history from '../../history'

class PayoutShow extends React.Component {


  componentWillReceiveProps(nextProps) {
  const newValue =  nextProps.calculatedValue;

  if (newValue !== this.props.calculatedValue && newValue  === 'something') {
    this.props.actionB();
  }
}

  componentDidMount(){
    this.props.getPayouts()

  }

  createItem(payout){
    return (
      <tr>
        <td>{payout[0]}</td><td>{payout[1]}</td><td>{payout[2]}</td><td>{payout[3]}</td><td>${payout[4]}</td><td>${payout[5]}</td><td>${payout[6]}</td><td>${payout[7]}</td><td>{payout[8]}</td><td>{payout[9]}</td><td>{payout[10]}</td><td>{payout[11]}</td><td>{payout[12]}</td><td>{payout[13]}</td><td>{payout[14]}</td>
        <td>
        <Link onClick={(e) => e.stopPropagation()} to={`/payoutShow/edit/${payout[0]}`} className='ui small button primary'>
          Edit
        </Link>

        </td>
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
      <button className='ui button primary' onClick={this.runCalc}>Run Calcs</button>

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
            <th><strong>Options</strong></th>
          </tr>
        </thead>
        {this.renderList()}
      </table>

      </div>)
  }

  render(){
    console.log(this.props.errors)
    if(this.props.account['role'] == 'admin'){
      if(this.props.calcs == 'Running'){
        return (
          <Loader filler="Calculations Running..."/>
        )
    }
    else if(this.props.errors == "goal") {
      console.log("happening")
      return<Modal  onDismiss={() => this.props.clearError()} title="Calculation Error" content="Please ensure all users on a plan with goal_use set to 'Yes' have a goal for the corresponding attainment rule and period"/>

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
    errors: state.errors.errors
  }
}

export default connect(mapStateToProps, { getPayouts,calcPlans,loadCalcs,clearError })(PayoutShow)
