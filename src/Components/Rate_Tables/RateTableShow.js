import React from 'react'
import { connect } from 'react-redux'
import { getRateTables } from '../../actions'
import { Link } from 'react-router-dom'



class RateTableShow extends React.Component {

  componentDidMount(){
    this.props.getRateTables()
  }

  createItem(rateTable){
    return (
      <tr>
        <th>{rateTable[0]}</th><th>{rateTable[1]}</th><th>{rateTable[2]}</th><th>{rateTable[3]}</th><th>{rateTable[4]}</th><th>{rateTable[5]}</th><th>{rateTable[6]}</th><th>{rateTable[7]}</th><th>{rateTable[8]}</th>

        <Link onClick={(e) => e.stopPropagation()} to={`/rateTableShow/edit/${rateTable[0]}`} className='ui small button primary'>
          Edit
        </Link>
        <Link onClick={(e) => e.stopPropagation()} to={`/rateTableShow/delete/${rateTable[0]}`} className='ui small button negative'>
          Delete
        </Link>
      </tr>
    )
  }

  renderList(){

    return this.props.rateTables.map((rateTable) => {
      return (this.createItem(rateTable))
    })

  }


  render(){

      return (<div className='ui grid'>
        <h1>Rate Tables</h1>

        <table className='ui celled table'>

          <thead>
            <tr>
              <th><strong>Rate Table ID</strong></th>
              <th><strong>Plan ID</strong></th>
              <th><strong>Rate Type</strong></th>
              <th><strong>Start Date</strong></th>
              <th><strong>End Date</strong></th>
              <th><strong>Attainment Range Low</strong></th>
              <th><strong>Attainment Range High</strong></th>
              <th><strong>Tier</strong></th>
              <th><strong>Rate</strong></th>
              <th><strong>Options</strong></th>

            </tr>
          </thead>
          {this.renderList()}
        </table>

        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    rateTables: Object.values(state.rateTables.rateTables),
  }
}

export default connect(mapStateToProps, { getRateTables })(RateTableShow)
