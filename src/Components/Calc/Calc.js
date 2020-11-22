import React from 'react'
import { connect } from 'react-redux'
import { } from '../../actions'






class Calc extends React.Component {
  componentDidMount(){

  }

  runCalc(){
    console.log("Calcs Running")
  }


  render(){
      return (
        <div className='ui text container ' >
          <button onClick={this.runCalc}>Calc</button>

        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {})(Calc)
