import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile,getPayouts} from '../actions'
import UploadForm from './UploadForm'
import Example from './myhook'
import { Header } from 'semantic-ui-react'



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
      <div className='sixteen wide column'>
      <div className='ui center aligned grid'>
        <div  className='ui header bigfont'>EasyComp</div>
        </div></div>

        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'></div>

        <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
          <i class="calculator icon bigicon"></i>
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
