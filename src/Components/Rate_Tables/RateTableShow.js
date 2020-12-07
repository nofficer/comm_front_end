import React from 'react'
import { connect } from 'react-redux'
import { getRateTables,getTime } from '../../actions'
import { Link } from 'react-router-dom'









import Login from '../Accounts/Login'






class RateTableShow extends React.Component {

  componentDidMount(){
    this.props.getRateTables()
    this.props.getTime()
  }

  createItem(rateTable){
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

  renderList(){

    return this.props.rateTables.map((rateTable) => {
      return (this.createItem(rateTable))
    })

  }


  render(){
    if(this.props.account['role'] == 'admin'){
      return (<div className='ui grid'>
        <h1>Rate Tables</h1>

        <table className='ui celled table'>

          <thead>
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
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getRateTables,getTime })(RateTableShow)
