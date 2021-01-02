import React from 'react'
import { connect } from 'react-redux'
import { getRateTables,getTime,setFilter,clearFilter } from '../../actions'
import { Link } from 'react-router-dom'








import Login from '../Accounts/Login'


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
              <td className='center aligned'>{rateTable[0]}</td><td className='center aligned'>{rateTable[10]}</td><td className='center aligned'>{rateTable[2]}</td><td className='center aligned'>{rateTable[3]}</td><td className='center aligned'>{rateTable[4]}</td><td className='center aligned'>{formatMoney(rateTable[5])}</td><td className='center aligned'>{formatMoney(rateTable[6])}</td><td className='center aligned'>{rateTable[7]}</td><td className='center aligned'>{rateTable[8]}</td>
              <td className='center aligned'>
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
      return (<div className='ui container containermargin'>
        <div className='ui grid'>
        <div class='sixteen wide column'></div>

        <div class='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>Rates</h1>
          </div>
        </div>
        <div class='sixteen wide column'></div>
        <div class='sixteen wide column'></div>
        </div>

        <table className='ui celled table'>

          <thead>
          <tr>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rate_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rule_name',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rate_type',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('start',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('end',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attain_start',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('attain_end',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('tier',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
              <div class="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('rate',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'></td>
            </tr>
            <tr>
              <th className='center aligned'><strong>Rate Table ID</strong></th>
              <th className='center aligned'><strong>Attainment Rule Name</strong></th>
              <th className='center aligned'><strong>Rate Type</strong></th>
              <th className='center aligned'><strong>Start Date</strong></th>
              <th className='center aligned'><strong>End Date</strong></th>
              <th className='center aligned'><strong>Attainment Range Low</strong></th>
              <th className='center aligned'><strong>Attainment Range High</strong></th>
              <th className='center aligned'><strong>Tier</strong></th>
              <th className='center aligned'><strong>Rate %</strong></th>
              <th className='center aligned'><strong>Options</strong></th>

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
