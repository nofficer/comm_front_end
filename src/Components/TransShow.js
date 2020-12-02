import React from 'react'
import { connect } from 'react-redux'
import { getTrans, deleteTrans,getTime} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'

class TransShow extends React.Component {

  componentDidMount(){
    this.props.getTrans()
    this.props.getTime()
  }

  createItem(trans){
    if(parseInt(trans[11]) < parseInt(this.props.month['current.month_id'])){
      return (
        <tr><th>{trans[0]}</th><th>{trans[1]}</th><th>{trans[2]}</th><th>{trans[3].split("T")[0]}</th><th>{trans[4]}</th><th>{trans[5]}</th><th>{trans[6]}</th><th>{trans[7]}</th><th>{trans[8]}</th><th>{trans[9]}</th><th>{trans[10]}</th><th>{trans[11]}</th>

            </tr>

      )
    }
    else{
      return (
        <tr><th>{trans[0]}</th><th>{trans[1]}</th><th>{trans[2]}</th><th>{trans[3].split("T")[0]}</th><th>{trans[4]}</th><th>{trans[5]}</th><th>{trans[6]}</th><th>{trans[7]}</th><th>{trans[8]}</th><th>{trans[9]}</th><th>{trans[10]}</th><th>{trans[11]}</th>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/edit/${trans[0]}`} className='ui small button primary'>
              Edit
            </Link>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/delete/${trans[0]}`} className='ui small button negative'>
              Delete
            </Link>
            </tr>

      )
    }

  }

  renderList(){

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

    if(this.props.account['role'] == 'admin'){
      return (<div>
        <h1>Transactions</h1>
        <table className='ui celled striped inverted single line table'>
          <thead>
            <tr>

              <th><strong>Transaction ID</strong></th>
              <th><strong>Transaction Seller</strong></th>
              <th><strong>Transaction Type</strong></th>
              <th><strong>Transaction Date</strong></th>
              <th><strong>Revenue</strong></th>
              <th><strong>Gross Profit</strong></th>
              <th><strong>Order Number</strong></th>
              <th><strong>Location</strong></th>
              <th><strong>Split Percent</strong></th>
              <th><strong>Custom Field</strong></th>
              <th><strong>Payout Multiplier</strong></th>
              <th><strong>Period</strong></th>
              <th><strong>Options</strong></th>
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

const mapStateToProps = (state) => {
  return {
    trans: Object.values(state.trans.trans),
    month: state.month.month,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getTrans,deleteTrans,getTime })(TransShow)
