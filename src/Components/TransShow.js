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
        <tr><td>{trans[0]}</td><td>{trans[1]}</td><td>{trans[2]}</td><td>{trans[3].split("T")[0]}</td><td>{trans[4]}</td><td>{trans[5]}</td><td>{trans[6]}</td><td>{trans[7]}</td><td>{trans[8]}</td><td>{trans[9]}</td><td>{trans[10]}</td><td>{trans[11]}</td>
          <td></td>
            </tr>

      )
    }
    else{
      return (
        <tr><td>{trans[0]}</td><td>{trans[1]}</td><td>{trans[2]}</td><td>{trans[3].split("T")[0]}</td><td>{trans[4]}</td><td>{trans[5]}</td><td>{trans[6]}</td><td>{trans[7]}</td><td>{trans[8]}</td><td>{trans[9]}</td><td>{trans[10]}</td><td>{trans[11]}</td>
          <td>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/edit/${trans[0]}`} className='ui small button primary'>
              Edit
            </Link>
            <Link onClick={(e) => e.stopPropagation()} to={`/transShow/delete/${trans[0]}`} className='ui small button negative'>
              Delete
            </Link>
            </td>
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
        <table className='ui celled  table'>
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
