import React from 'react'
import { connect } from 'react-redux'
import { callback_action_qbo  } from '../../actions'







class QBOcb extends React.Component {
  componentDidMount(){
    const URL = window.location.href.toString().split('/QBOcb/')[1]

    this.props.callback_action_qbo(URL)

  }







  render(){


      return(
        <div>
          <p>
          Loading...
          </p>
        </div>
      )


  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account
  }
}

export default connect(mapStateToProps, { callback_action_qbo })(QBOcb)
