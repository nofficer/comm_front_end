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
      return (
        <div className='ui text container ' >
          <h1 className='centertext'>Commissions App</h1>

        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile,getPayouts})(Landing)
