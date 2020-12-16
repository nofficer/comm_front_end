import React from 'react'
import { connect } from 'react-redux'
import { getLiability,deleteLiability,getLiabilities,getTime} from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../../Modal'
import history from '../../history'
import Login from '../Accounts/Login'

class LiabilityDelete extends React.Component {

  componentDidMount(){
    this.props.getTime()
    this.props.getLiability({"liability_id": this.props.match.params.liability_id})
  }

  renderContent(){

      return 'Are you sure you wish to delete this liability balance?'

  }

  renderActions(){

      return (

        <React.Fragment>
                  <button
                  onClick={() => this.props.deleteLiability({"liability_id": this.props.match.params.liability_id})}
                  className='ui button negative'>Delete
                  </button>
                  <Link className='ui button' to='/LiabilityShow'>Cancel</Link>
        </React.Fragment>
      )


  }



  render(){

    if(this.props.account['role'] == 'admin'){
      return(<Modal
        title="Delete Liability"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/LiabilityShow')}
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
    account: state.account.account,
    liability: state.payouts.liability,
    liabilities:state.payouts.liabilities
  }
}

export default connect(mapStateToProps, { getLiability,deleteLiability,getLiabilities,getTime})(LiabilityDelete)
