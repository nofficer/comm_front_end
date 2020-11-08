import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadFile,onChangeFile} from '../actions'
import Modal from '../Modal'
import { CSVReader } from 'react-papaparse'
import history from '../history'

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
    var numchecker = true
    var datechecker = true
    var wrongnumindex = []
    var wrongdateindex = []
    var i;
    for (i=0;i < this.my_data.length; i++){
      if(this.isNumeric(this.my_data[i]["Revenue"]) && this.isNumeric(this.my_data[i]["GP"])){
          console.log("It is numeric")
      }
      else{
        numchecker = false
        wrongnumindex.push(i)
      }

    }

    var p;
    for (p=0;p < this.my_data.length; p++){
      console.log(this.my_data[p]["Date"])
      if(this.isValidDate(this.my_data[p]["Date"]) ){
          console.log("It is valid date")
      }
      else{
        datechecker=false
        wrongdateindex.push(p)
      }
    }


    if(numchecker && datechecker){
      this.props.uploadFile(this.my_data)
    }
    else if(numchecker==false&&datechecker==true){
      history.push({pathname:'/ImportError',state:{detail:`Wrong number format at line(s) ${wrongnumindex}`}})
    }
    else if (datechecker==false&&numchecker==true){
      console.log("its running")
      history.push({pathname:'/ImportError',state:{detail:`Wrong date format at line(s) ${wrongdateindex}`}})
    }

    else{
      history.push({pathname:'/ImportError',state:{detail:`Wrong date format at line(s) ${wrongdateindex} and wrong number format at line(s) ${wrongnumindex}`}})
    }


  }

  isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\-\d{1,2}\-\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

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
        header:true,
        skipEmptyLines: true}}
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
