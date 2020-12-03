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
        <th>{payout[0]}</th><th>{payout[1]}</th><th>{payout[2]}</th><th>{payout[3]}</th><th>{payout[4]}</th><th>{payout[5]}</th><th>{payout[6]}</th><th>{payout[7]}</th><th>{payout[8]}</th><th>{payout[9]}</th><th>{payout[10]}</th><th>{payout[11]}</th><th>{payout[12]}</th><th>{payout[13]}</th><th>{payout[14]}</th>

        <Link onClick={(e) => e.stopPropagation()} to={`/payoutShow/edit/${payout[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/payoutShow/delete/${payout[0]}`} className='ui small button negative'>
          Delete
        </Link>
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
      <button onClick={this.runCalc}>Calc</button>

      <table className='ui inverted celled table'>

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
    if(this.props.account['user_id'] == 1){
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
