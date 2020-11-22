import React from 'react'
import { connect } from 'react-redux'
import { getRateTable ,deleteRateTable,getRateTables} from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import history from '../../history'

class RateTableDelete extends React.Component {

  componentDidMount(){
    this.props.getRateTable({"rate_id": this.props.match.params.rate_id})
  }

  renderContent(){
    if(!this.props.rule){
      return 'Are you sure you wish to delete this rate?'
    }
  }

  renderActions(){
      return (

        <React.Fragment>
                  <button
                  onClick={() => this.props.deleteRateTable({"rate_id": this.props.rateTable.rate_id})}
                  className='ui button negative'>Delete
                  </button>
                  <Link className='ui button' to='/RateTableShow'>Cancel</Link>
        </React.Fragment>
      )


  }



  render(){
    return(<Modal
      title="Delete RateTable"
      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/RateTableShow')}
    />)


}

}

const mapStateToProps = (state) => {
  return {
    rateTable: state.rateTables.rateTables
  }
}

export default connect(mapStateToProps, { getRateTable,deleteRateTable,getRateTables})(RateTableDelete)
