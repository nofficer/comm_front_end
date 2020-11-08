import React from 'react'
import { connect } from 'react-redux'
import { getTran ,deleteTrans} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'


class ImportError extends React.Component {

  renderActions(){

    return (
      <React.Fragment>
                <button
                onClick={() => history.push('/ImportTrans')}
                >OK
                </button>

      </React.Fragment>
    )
  }



  render(){
    return(<Modal
      title="Import Error"
      content={history.location.state.detail}
      actions={this.renderActions()}
      onDismiss={() => history.push('/ImportTrans')}
    />)


}

}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {})(ImportError)
