import React from 'react'
import { connect } from 'react-redux'
import { getPayouts_user,calcPlans,loadCalcs } from '../../actions'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import Login from '../Accounts/Login'


class PayoutShow extends React.Component {



  componentDidMount(){
    console.log(this.props)


  }

  createItem(payout){
    return (
      <tr>
        <th>{payout[0]}</th><th>{payout[1]}</th><th>{payout[2]}</th><th>{payout[3]}</th><th>{payout[4]}</th><th>{payout[5]}</th><th>{payout[6]}</th><th>{payout[7]}</th><th>{payout[8]}</th><th>{payout[9]}</th><th>{payout[10]}</th><th>{payout[11]}</th><th>{payout[12]}</th><th>{payout[13]}</th>
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

          </tr>
        </thead>
        {this.renderList()}
      </table>

      </div>)
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
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getPayouts_user,calcPlans,loadCalcs })(PayoutShow)