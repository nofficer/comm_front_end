import React from 'react'
import { connect } from 'react-redux'
import { getTrans, deleteTrans} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'


class TransShow extends React.Component {

  componentDidMount(){
    this.props.getTrans()

  }

  createItem(trans){
    return (
      <tr><th>{trans[0]}</th><th>{trans[1]}</th><th>{trans[2]}</th><th>{trans[3].split("T")[0]}</th><th>{trans[4]}</th><th>{trans[5]}</th><th>{trans[6]}</th>
          <Link onClick={(e) => e.stopPropagation()} to={`/transShow/edit/${trans[0]}`} className='ui small button primary'>
            Edit
          </Link>
          <button onClick={() => this.props.deleteTrans({"trans_id": trans[0]}) } className='ui small button negative'>
            Delete
          </button>
          </tr>

    )
  }

  renderList(){

    return this.props.trans.map((trans) => {
      if(trans[3]) {
        return (this.createItem(trans))
      }
      else {
        return null
      }

    })

  }


  render(){


      return (<div>
        <table className='ui celled table'>
          <thead>
            <tr>

              <th><strong>Transaction ID</strong></th>
              <th><strong>Transaction Seller</strong></th>
              <th><strong>Transaction Type</strong></th>
              <th><strong>Transaction Date</strong></th>
              <th><strong>Revenue</strong></th>
              <th><strong>Gross Profit</strong></th>
              <th><strong>Order Number</strong></th>
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
    trans: Object.values(state.trans.trans)
  }
}

export default connect(mapStateToProps, { getTrans,deleteTrans })(TransShow)
