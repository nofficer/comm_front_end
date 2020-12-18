import React from 'react'
import { connect } from 'react-redux'
import { getTime,updateTime,revertTime,updateFYE} from '../../actions'
import history from '../../history'
import Modal from '../../Modal'
import { Link } from 'react-router-dom'


var months = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}


class Time extends React.Component {
  componentDidMount(){
    this.props.getTime()

  }

  renderContent(){
    if(typeof(history.location.state) != "undefined"){
    if(history.location.state.change == 'revert'){
      return(`Are you sure you wish to revert to the previous period? \
        This will result in all calculations, payouts, and attainments in the current period to be deleted. Historical calculations, payouts and attainments corresponding to the previous period will be deleted and calculations must be ran again?`)
    }
    else if(history.location.state.change == 'next'){
      return("Are you sure you wish to move to the next period? \
      This will result in all calculations, payouts and attainments in the current period to be moved to history and become unchangeable. You will no longer be able to run calculations for this period.")
    }
    else if(history.location.state.change == 'FYE'){
      return("Are you sure you wish to move to the next Fiscal Year? \
      This will result in all calculations, payouts and attainments in the current period to be moved to prior year and become unchangeable. You will no longer be able to run calculations for this period or revert. This change is irreversible.")
    }
  }
  else{
    history.push('/login')
    return("None")
  }

  }



  renderActions(){

    if(typeof(history.location.state) != "undefined"){
      if(history.location.state.change == 'revert'){
        return (
          <React.Fragment>
                    <button
                    onClick={this.props.revertTime}
                    className='ui button negative'>Revert Period
                    </button>
                    <Link className='ui button' to='/admin'>Cancel</Link>
          </React.Fragment>
        )
      }
      else if(history.location.state.change == 'next'){
        return (
          <React.Fragment>
                    <button
                    onClick={this.props.updateTime}
                    className='ui button positive'>Next Period
                    </button>
                    <Link className='ui button' to='/admin'>Cancel</Link>
          </React.Fragment>
        )
      }
      else if(history.location.state.change == 'FYE'){
        return (
          <React.Fragment>
                    <button
                    onClick={this.props.updateFYE}
                    className='ui button blue'>Next Fiscal Year
                    </button>
                    <Link className='ui button' to='/admin'>Cancel</Link>
          </React.Fragment>
        )
      }
    }
    else{
      history.push('/login')
      return ("None")
    }


  }


  render(){

    return(<Modal
      title="Update Period"

      content={this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/admin')}
    />)
  }
}

const mapStateToProps = (state) => {
  return {
    month: state.month.month
  }
}

export default connect(mapStateToProps, {getTime,updateTime,revertTime,updateFYE})(Time)
