import React from 'react'
import { connect } from 'react-redux'
import { getTran ,deleteTrans,getTime} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'

import Login from './Accounts/Login'

class TransDelete extends React.Component {

  componentDidMount(){
    this.props.getTran({'trans_id':this.props.match.params.trans_id})
    this.props.getTime()
  }

  renderContent(){
    if(!this.props.tran){
      return 'Are you sure you wish to delete this transaction?'
    }
      return `Are you sure you wish to delete order number:  ${this.props.tran.order_num}`


  }



  renderActions(){

    return (
      <React.Fragment>
                <button
                onClick={() => this.props.deleteTrans({"trans_id": this.props.tran.trans_id})}
                className='ui button negative'>Delete
                </button>
                <Link className='ui button' to='/TransShow'>Cancel</Link>
      </React.Fragment>
    )
  }



  render(){
    if(this.props.account['role'] == 'admin'){
      return(<Modal
        title="Delete Plan"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/TransShow')}
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
    tran: state.trans.tran,
    account: state.account.account
  }
}

export default connect(mapStateToProps, { getTran,deleteTrans,getTime })(TransDelete)
