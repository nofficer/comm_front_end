import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile,getPayouts} from '../actions'
import UploadForm from './UploadForm'
import Example from './myhook'




class Landing extends React.Component {
  componentDidMount(){
    this.props.getPayouts()
  }

  onSubmit = (formValues) => {

  }

  render(){
      return (<div className='ui grid'>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='sixteen wide column'></div>
        <div className='ui text container ' >
        <div className='ui center aligned grid'>
          <h1 className='centertext'>EasyComp</h1>
          </div>

        </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile,getPayouts})(Landing)
