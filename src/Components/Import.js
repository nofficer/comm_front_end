import React from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile} from '../actions'
import UploadForm from './UploadForm'





class Import extends React.Component {
  componentDidMount(){

  }

  onSubmit = (formValues) => {

  }

  render(){
    console.log(this.props.type)
      return (
        <div className='ui text container ' >
          <UploadForm onSubmit={this.onSubmit}/>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {uploadFile,onChangeFile})(Import)
