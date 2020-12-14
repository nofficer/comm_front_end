import React from 'react'
import { connect } from 'react-redux'
import { getRateTables,getTime,setFilter,clearFilter } from '../../actions'
import { Link } from 'react-router-dom'









import Login from '../Accounts/Login'






class RateTableShow extends React.Component {

  filterMap = {
    'rate_id':0,
    'rule_name':10,
    'rate_type':2,
    'start':3,
    'end':4,
    'attain_start':5,
    'attain_end':6,
    'tier':7,
    'rate':8


  }

  componentDidMount(){
    this.props.clearFilter()
    this.props.getRateTables()
    this.props.getTime()
  }

  createItem(rateTable){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(rateTable[this.filterMap[filter]] == null){
        check = false
      }
      else if(rateTable[this.filterMap[filter]] != null){
        if(!rateTable[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
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
              <td>{rateTable[0]}</td><td>{rateTable[10]}</td><td>{rateTable[2]}</td><td>{rateTable[3]}</td><td>{rateTable[4]}</td><td>{rateTable[5]}</td><td>{rateTable[6]}</td><td>{rateTable[7]}</td><td>{rateTable[8]}</td>
              <td>
              <Link onClick={(e) => e.stopPropagation()} to={`/rateTableShow/edit/${rateTable[0]}`} className='ui small button primary'>
                Edit
              </Link>
              <Link onClick={(e) => e.stopPropagation()} to={`/rateTableShow/delete/${rateTable[0]}`} className='ui small button negative'>
                Delete
              </Link>
              </td>
            </tr>
          )
    }


  }

  renderList(){

    return this.props.rateTables.map((rateTable) => {
      return (this.createItem(rateTable))
    })

  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui grid'>
      <div className='sixteen wide column'>
        <h1 className='pagetitle'>Rate Tables</h1>
        </div>

        <table className='ui celled table'>

          <thead>
          <tr>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rate_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rate_type',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('start',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('end',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attain_start',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attain_end',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('tier',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rate',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td></td>
            </tr>
            <tr>
              <th><strong>Rate Table ID</strong></th>
              <th><strong>Attainment Rule Name</strong></th>
              <th><strong>Rate Type</strong></th>
              <th><strong>Start Date</strong></th>
              <th><strong>End Date</strong></th>
              <th><strong>Attainment Range Low</strong></th>
              <th><strong>Attainment Range High</strong></th>
              <th><strong>Tier</strong></th>
              <th><strong>Rate %</strong></th>
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
    filter: state.filter.filter
  }
}

export default connect(mapStateToProps, { getRateTables,getTime,setFilter,clearFilter })(RateTableShow)
