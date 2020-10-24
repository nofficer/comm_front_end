import React from 'react'
import { connect } from 'react-redux'
import { getTrans} from '../actions'
import history from '../history'


class TransShow extends React.Component {

  componentDidMount(){
    this.props.getTrans()
  }

  createItem(trans){
    return (
      <tr><th>{trans[0]}</th><th>{trans[1]}</th><th>{trans[2]}</th><th>{trans[3]}</th><th>{trans[4]}</th></tr>

    )
  }

  renderList(){

    return this.props.trans.map((trans) => {
      return (this.createItem(trans))
    })

  }


  render(){
      console.log(this.renderList())
      return (<div>
        <table className='ui celled table'>
          <thead>
            <tr>
              <th><strong>Transaction ID</strong></th>
              <th><strong>Transaction Type</strong></th>
              <th><strong>Transaction Date</strong></th>
              <th><strong>Revenue</strong></th>
              <th><strong>GP</strong></th>
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
    trans: Object.values(state.trans.trans)
  }
}

export default connect(mapStateToProps, { getTrans })(TransShow)
