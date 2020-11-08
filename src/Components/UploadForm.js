import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import FieldFileInput from './FileUploader'
import CSVReaderV from './CSVReader'




class UploadForm extends React.Component {
  componentDidMount(){

  }

  uploader = ({label}) => {
    return (
      <div>
      <label>{label}</label>
      <input type='file' autoComplete='off'  />
      </div>
    )
  }



  render(){
      return (
          <CSVReaderV/>
      )
  }
}

const validate = (formValues) => {
	}


export default reduxForm({
	form: 'uploadForm',
	validate: validate,
  enableReinitialize:true
})(UploadForm);
