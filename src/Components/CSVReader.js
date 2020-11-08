import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile} from '../actions'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

class CSVReaderV extends Component {
  componentDidMount(){
    const my_data = []
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')

  }

  handleSubmit = () => {
    this.props.uploadFile(this.my_data)
  }

  updateData = (results) => {
    this.my_data = results.data
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        // onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        config={{complete: this.updateData,
        header:true}}
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '40%',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              Browse files
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onClick={this.handleRemoveFile}
            >
              Remove
            </button>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </aside>
        )}
      </CSVReader>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {uploadFile})(CSVReaderV)
