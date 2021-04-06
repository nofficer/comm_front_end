import React from 'react'
import { connect } from 'react-redux'
import { callback_action_qbo  } from '../../actions'
import LoaderNoButton from '../../LoaderNoButton'






class QBOLoadTrans extends React.Component {
  componentDidMount(){


  }







  render(){


      return(
        <div>
          <LoaderNoButton filler='Importing Transactions...'/>
        </div>
      )


  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account
  }
}

export default connect(mapStateToProps, { callback_action_qbo })(QBOLoadTrans)
