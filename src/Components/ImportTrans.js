import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile} from '../actions'
import UploadForm from './UploadForm'





class ImportTrans extends React.Component {
  componentDidMount(){

  }

  onSubmit = (formValues) => {

  }

  render(){
      return (
        <div className='ui text container ' >
          <h1 className='centertext'>Import Deals</h1>
          <UploadForm onSubmit={this.onSubmit}/>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile})(ImportTrans)
