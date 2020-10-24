import React from 'react'
import { connect } from 'react-redux'
import { getAttainmentRules } from '../actions'


class AttainRuleShow extends React.Component {

  componentDidMount(){
    this.props.getAttainmentRules()
  }

  createItem(attainRule){
    return (
      <tr><th>{attainRule[0]}</th><th>{attainRule[1]}</th><th>{attainRule[2]}</th><th>{attainRule[3]}</th><th>{attainRule[4]}</th></tr>
    )
  }

  renderList(){
    console.log(this.props.attainmentRules)
    return this.props.attainmentRules.map((attainRule) => {
      return (this.createItem(attainRule))
    })

  }


  render(){
      console.log(this.renderList())
      return (<div className='ui grid'>


        <table className='ui celled table'>

          <thead>
            <tr>
              <th><strong>Attainment Rule ID</strong></th>
              <th><strong>Source</strong></th>
              <th><strong>Attainment Rule Name</strong></th>
              <th><strong>Filter</strong></th>
              <th><strong>Metric</strong></th>
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
    attainmentRules: Object.values(state.attainmentRules.attainmentRules)
  }
}

export default connect(mapStateToProps, { getAttainmentRules })(AttainRuleShow)
