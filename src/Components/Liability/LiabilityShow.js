import React from 'react'
import { connect } from 'react-redux'
import { getLiabilities,getTime,clearFilter,setFilter } from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import Login from '../Accounts/Login'






class LiabilityShow extends React.Component {

  componentDidMount(){
    this.props.getLiabilities()
    this.props.getTime()
    this.props.clearFilter()
  }


  createItem(liability){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(liability[filter] == null){
        check = false
      }
      else if(liability[filter] != null){
        if(!liability[filter].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }


        }
    )

    if(
      check
    ){
    return (
      <tr>
        <td>{liability['liability_id']}</td><td>{liability['user_id']}</td><td>{liability['liability_amount']}</td><td>{liability['month_id']}</td><td>{liability['year_id']}</td>
        <td>
        <Link onClick={(e) => e.stopPropagation()} to={`/liabilityShow/edit/${liability['liability_id']}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/liabilityShow/delete/${liability['liability_id']}`} className='ui small button negative'>
          Delete
        </Link>
        </td>
      </tr>
    )
  }
  }

  renderList(){

    return this.props.liabilities.map((liability) => {
      return (this.createItem(liability))
    })

  }


  render(){


    if(this.props.account['role'] == 'admin'){
      return (<div>
        <div className='ui grid'>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>Liability Balances</h1>
          </div>
        </div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        </div>

        <table className='ui celled table'>

          <thead>
          <tr>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('liability_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('user_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('liability_amount',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('month_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('year_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>

            </td>
            </tr>
            <tr>
              <th><strong>Liability ID</strong></th>
              <th><strong>User ID</strong></th>
              <th><strong>Liability Balance</strong></th>
              <th><strong>Month ID</strong></th>
              <th><strong>Year ID</strong></th>
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
    rateTables: Object.values(state.rateTables.rateTables),
    account: state.account.account,
    liabilities: state.payouts.liabilities,
    filter: state.filter.filter,
    error: state.errors.errors
  }
}

export default connect(mapStateToProps, { getLiabilities,getTime,clearFilter,setFilter })(LiabilityShow)
