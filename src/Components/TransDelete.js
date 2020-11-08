import React from 'react'
import { connect } from 'react-redux'
import { getTran ,deleteTrans} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'

class TransDelete extends React.Component {

  componentDidMount(){
    this.props.getTran({'trans_id':this.props.match.params.trans_id})
  }

  renderContent(){
    if(!this.props.trans){
      return 'Are you sure you wish to delete this plan?'
    }
      return `Are you sure you wish to delete order number:  ${this.props.trans.order_number}`


  }



  renderActions(){

    return (
      <React.Fragment>
                <button
                onClick={() => this.props.deleteTrans({"trans_id": this.props.trans.trans_id})}
                className='ui button negative'>Delete
                </button>
                <Link className='ui button' to='/TransShow'>Cancel</Link>
      </React.Fragment>
    )
  }



  render(){
    return(<Modal
      title="Delete Plan"
      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/TransShow')}
    />)


}

}

const mapStateToProps = (state) => {
  return {
    trans: state.trans.trans
  }
}

export default connect(mapStateToProps, { getTran,deleteTrans })(TransDelete)
