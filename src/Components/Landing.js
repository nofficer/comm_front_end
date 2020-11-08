import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile} from '../actions'
import UploadForm from './UploadForm'
import Example from './myhook'




class Landing extends React.Component {
  componentDidMount(){

  }

  onSubmit = (formValues) => {

  }

  render(){
      return (
        <div className='ui text container ' >
          <h1 className='centertext'>Landing</h1>

        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile})(Landing)
