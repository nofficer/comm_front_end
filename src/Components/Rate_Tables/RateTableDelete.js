import React from 'react'
import { connect } from 'react-redux'
import { getRateTable ,deleteRateTable,getRateTables,getTime} from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import history from '../../history'
import Login from '../Accounts/Login'

class RateTableDelete extends React.Component {

  componentDidMount(){
    this.props.getTime()
    this.props.getRateTable({"rate_id": this.props.match.params.rate_id})
  }

  renderContent(){
    if(!this.props.rule){
      return 'Are you sure you wish to delete this rate?'
    }
  }

  renderActions(){
    console.log(this.props.rateTable)
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

    if(this.props.account['role'] == 'admin'){
      return(<Modal
        title="Delete RateTable"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/RateTableShow')}
      />)
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
    rateTables: state.rateTables.rateTables,
    rateTable: state.rateTables.rateTable,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getRateTable,deleteRateTable,getRateTables,getTime})(RateTableDelete)
