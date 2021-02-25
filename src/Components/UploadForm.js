import React from 'react'

import { reduxForm } from 'redux-form'

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
