import React from 'react'
import { connect } from 'react-redux'
import { getTrans, deleteTrans,getTime,setFilter,clearFilter,clearTransError} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'
import Modal from '../Modal'

class TransShow extends React.Component {

  componentDidMount(){
    this.props.getTrans()
    this.props.getTime()
    this.props.clearFilter()
  }

  filterMap ={
    'trans_id':0,
    'seller_id':1,
    'type':2,
    'date':3,
    'revenue':4,
    'gp':5,
    'order_num':6,
    'location':7,
    'split_percent':8,
    'custom_field':9,
    'payout_multiplier':10,
    'period':11
  }

  createItem(trans){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(trans[this.filterMap[filter]] == null){
        check = false
      }
      else if(trans[this.filterMap[filter]] != null){
        if(!trans[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }


        }
    )

    if(
      check
    ){
      var cur_year = this.props.month['cal_year']
      var trans_year = trans[3].split('-')[0]
      var cur_month = parseInt(this.props.month['current.month_id'])
      var trans_month = parseInt(trans[11])

      if(cur_year<trans_year){

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
      else if(cur_year==trans_year && cur_month <= trans_month){

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

      else{
        return (
          <tr><td>{trans[0]}</td><td>{trans[1]}</td><td>{trans[2]}</td><td>{trans[3].split("T")[0]}</td><td>{trans[4]}</td><td>{trans[5]}</td><td>{trans[6]}</td><td>{trans[7]}</td><td>{trans[8]}</td><td>{trans[9]}</td><td>{trans[10]}</td><td>{trans[11]}</td>
            <td>

              </td>
              </tr>

        )
      }
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
    if(this.props.error == 'id'){
      return <Modal onDismiss={this.props.clearTransError} title='Error in Transaction Creation' content='A transaction with that ID already exists' actions='Ok'/>
    }

    else{
    if(this.props.account['role'] == 'admin'){
      return (<div>
        <div className='ui grid'>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>Transactions</h1>
          </div>
        </div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        </div>
        <table className='ui celled  table'>
          <thead>
          <tr>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('trans_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('seller_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('type',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('date',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('revenue',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('gp',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('order_num',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('split_percent',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('custom_field',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('payout_multiplier',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('period',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>

            </td>
            </tr>
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
}

const mapStateToProps = (state) => {
  return {
    trans: Object.values(state.trans.trans),
    month: state.month.month,
    account: state.account.account,
    filter:state.filter.filter,
    error:state.errors.errors
  }
}

export default connect(mapStateToProps, { getTrans,deleteTrans,getTime,setFilter,clearFilter,clearTransError })(TransShow)
