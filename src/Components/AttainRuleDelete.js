import React from 'react'
import { connect } from 'react-redux'
import { getAttainmentRule ,deleteAttainmentRule,getAttainmentRules,checkRuleUse} from '../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../history'

class AttainRuleDelete extends React.Component {

  componentDidMount(){
    this.props.getAttainmentRule({"rule_id": this.props.match.params.rule_id})
    this.props.checkRuleUse({"rule_id": this.props.match.params.rule_id})
  }

  renderContent(){
    if(!this.props.rule){
      return 'Are you sure you wish to delete this rule?'
    }
    else if(this.props.check != "In Use") {
      return `Are you sure you wish to delete ${this.props.rule.rule_name}`
    }
    else{
      return `You cannot delete ${this.props.rule.rule_name} because it is in use`
    }

  }

  renderActions(){
    const id = this.props.match.params.rule_id
    if(this.props.check != "In Use"){
      return (

        <React.Fragment>
                  <button
                  onClick={() => this.props.deleteAttainmentRule({"rule_id": this.props.rule.rule_id})}
                  className='ui button negative'>Delete
                  </button>
                  <Link className='ui button' to='/attainRuleShow'>Cancel</Link>
        </React.Fragment>
      )
    }
    else{
      return (

        <React.Fragment>
                  <Link className='ui button' to='/attainRuleShow'>Cancel</Link>
        </React.Fragment>
      )
    }

  }



  render(){
    return(<Modal
      title="Delete AttainRule"
      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/attainRuleShow')}
    />)


}

}

const mapStateToProps = (state) => {
  return {
    rule: state.attainmentRules.attainmentRules,
    check: state.check.check
  }
}

export default connect(mapStateToProps, { getAttainmentRule,deleteAttainmentRule,getAttainmentRules,checkRuleUse })(AttainRuleDelete)
