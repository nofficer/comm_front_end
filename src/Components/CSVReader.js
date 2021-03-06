import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadFile,getTime,loading} from '../actions'

import { CSVReader } from 'react-papaparse'
import history from '../history'

import globals from './globals'

const buttonRef = React.createRef()
var importType = ''
var dupType = 'ignore'




class CSVReaderV extends Component {
  componentDidMount(){
    this.props.getTime()

  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')

    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')

    console.log('---------------------------')

  }

  handleSubmit = () => {
    var numchecker = true
    var datechecker = true
    var wrongnumindex = []
    var wrongdateindex = []
    var i;
    var p;
    var fields = []

    if(importType == 'Deals'){
      fields = globals.trans_import_fields
    }
    else if(importType == 'Rates'){
      fields = globals.rates_import_fields
    }
    else if(importType == 'Users'){
      fields = globals.users_import_fields
    }
    else if(importType == 'Goals'){
      fields = globals.goals_import_fields
    }
    else if(importType == 'Accounts'){
      fields = globals.accounts_import_fields
    }
    else if(importType == 'Role_Hierarchies'){
      fields = globals.role_import_fields
    }
    else{
      fields = []
    }

    this.my_data = this.arrayToObj(this.my_data,fields)

    //DEALS UPLOAD WITH VALIDATION
    if(importType === 'Deals'){
      //TYPE CHECKING BELOW
              numchecker = true
              datechecker = true
              wrongnumindex = []
              wrongdateindex = []
                i = 0
                for (i=0;i < this.my_data.length; i++){
                  if(this.isNumeric(this.my_data[i]["revenue"]) && this.isNumeric(this.my_data[i]["gp"])){

                  }
                  else{
                    console.log(i + ' is not numeric')
                    numchecker = false
                    wrongnumindex.push(i)
                  }

                }

                p = 0
                for (p=0;p < this.my_data.length; p++){


                  if(this.isValidDate(this.my_data[p]['date']) && this.isWithinPeriod(this.my_data[p]['date']) ){

                  }

                  else{
                    console.log(p + ' is not date')
                    datechecker=false
                    wrongdateindex.push(p)
                  }
                }


                if(numchecker && datechecker){
                  this.my_data.push({dupType:dupType})
                  this.my_data.push({table: "transactions"})
                  this.props.uploadFile(this.my_data,'trans')
                  this.props.loading()
                }
                else if(numchecker===false&&datechecker===true){
                  history.push({pathname:'/ImportError',state:{detail:`Wrong number format at line(s)${wrongnumindex}`}})
                }
                else if (datechecker===false&&numchecker===true){

                  history.push({pathname:'/ImportError',state:{detail:`Wrong date format at line(s) OR invalid date outside current period at line(s) ${wrongdateindex}`}})
                }

                else{
                  history.push({pathname:'/ImportError',state:{detail:`Wrong date format at line(s) OR invalid date outside current period at line(s) ${wrongdateindex} and wrong number format at line(s) ${wrongnumindex}`}})
                }
              }

  //RATES UPLOAD VALIDATION AND EXEUCTION
    else if(importType === 'Rates'){
      //TYPE CHECKING BELOW
      numchecker = true
      datechecker = true
      wrongnumindex = []
      wrongdateindex = []
      i = 0
      for (i=0;i < this.my_data.length; i++){
        if(this.isNumeric(this.my_data[i]["attainment_rule_id"]) && this.isNumeric(this.my_data[i]["attain_start"]) && this.isNumeric(this.my_data[i]["attain_end"]) && this.isNumeric(this.my_data[i]["tier"]) && this.isNumeric(this.my_data[i]["rate"])){

        }
        else{
          numchecker = false
          wrongnumindex.push(i)
        }

      }

      p = 0
      for (p=0;p < this.my_data.length; p++){

        if(this.isValidDate(this.my_data[p]["start"]) && this.isValidDate(this.my_data[p]["end"]) ){

        }
        else{
          datechecker=false

          wrongdateindex.push(p)
        }
      }

      if(numchecker && datechecker){
        this.my_data.push({dupType:dupType})
        this.my_data.push({table: "rate"})
        this.props.uploadFile(this.my_data,'rateTable')
        this.props.loading()
        }
      else if(numchecker ===  false&&datechecker ===  true){
          history.push({pathname:'/ImportError',state:{detail:`Wrong number format  ${wrongnumindex}`}})
        }
      else if (datechecker ===  false&&numchecker ===  true){

        history.push({pathname:'/ImportError',state:{detail:`Wrong date format  ${wrongdateindex}`}})
      }
      else{
        history.push({pathname:'/ImportError',state:{detail:`Wrong date format  ${wrongdateindex} and wrong number format at line(s) ${wrongnumindex}`}})
      }
    }

//USERS UPLOAD EXECUTION WITH NO VALIDATION
    else if(importType  ===  'Users'){
      numchecker = true
      datechecker = true
      wrongnumindex = []
      wrongdateindex = []
      i = 0
      for (i=0;i < this.my_data.length; i++){
        if(this.isNumeric(this.my_data[i]["plan_id"])) {

        }
        else{
          numchecker = false
          wrongnumindex.push(i)
        }

      }

      if(numchecker && datechecker){
        this.my_data.push({dupType:dupType})
        this.my_data.push({table: "users"})
        this.props.uploadFile(this.my_data,'user')
        this.props.loading()
        }
      else if(numchecker ===  false&&datechecker ===  true){
          history.push({pathname:'/ImportError',state:{detail:`Wrong number format  ${wrongnumindex}`}})
        }
      else if (datechecker ===  false&&numchecker ===  true){

        history.push({pathname:'/ImportError',state:{detail:`Wrong date format  ${wrongdateindex}`}})
      }
      else{
        history.push({pathname:'/ImportError',state:{detail:`Wrong date format  ${wrongdateindex} and wrong number format at line(s) ${wrongnumindex}`}})
      }




    }

    else if(importType ===  'Goals'){
      numchecker = true
      datechecker = true
      wrongnumindex = []
      wrongdateindex = []
      p = 0
      for (p=0;p < this.my_data.length; p++){

        if(this.isValidDate(this.my_data[p]['start']) && this.isValidDate(this.my_data[p]['end']) ){

        }


        else{

          datechecker=false
          wrongdateindex.push(p)
        }
      }

      i = 0
      for (i=0;i < this.my_data.length; i++){
        if(this.isNumeric(this.my_data[i]["goal"]) && this.isNumeric(this.my_data[i]["attainment_rule_id"])){

        }
        else{
          numchecker = false
          wrongnumindex.push(i)
        }

      }

      if(numchecker && datechecker){
        this.my_data.push({dupType:dupType})
        this.my_data.push({table: "goals"})

        this.props.uploadFile(this.my_data,'goal')
        this.props.loading()
        }
      else if(numchecker ===  false&&datechecker ===  true){
          history.push({pathname:'/ImportError',state:{detail:`Wrong number format  ${wrongnumindex}`}})
        }
      else if (datechecker ===  false&&numchecker ===  true){

        history.push({pathname:'/ImportError',state:{detail:`Wrong date format  ${wrongdateindex}`}})
      }
      else{
        history.push({pathname:'/ImportError',state:{detail:`Wrong date format  ${wrongdateindex} and wrong number format at line(s) ${wrongnumindex}`}})
      }


    }
    else if(importType  ===  'Accounts'){
      this.my_data.push({dupType:dupType})
      this.my_data.push({table: "accounts"})
      this.props.uploadFile(this.my_data,'user') //Second paramter tells action where to navigate to after import
      this.props.loading()
    }

    else if(importType  ===  'Role_Hierarchies'){

      numchecker = true

      wrongnumindex = []


      i = 0
      for (i=0;i < this.my_data.length; i++){
        if(this.isNumeric(this.my_data[i]["level"]) ){

        }
        else{
          numchecker = false
          wrongnumindex.push(i)
        }

      }
      if(numchecker){
        this.my_data.push({dupType:dupType})
        this.my_data.push({table: "role_hierarchy"})
        this.props.uploadFile(this.my_data,'roleHierarchy')
        this.props.loading()
      }

      else {
        history.push({pathname:'/ImportError',state:{detail:`Wrong number format  ${wrongnumindex}`}})
      }


    }


    else{
      history.push({pathname:'/ImportError',state:{detail:`Please select an input type`}})
    }




  }

  isNumeric(str) {

  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


isWithinPeriod(dateString)
{


    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");

    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);


    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    if(year<this.props.month['cal_year']){
      console.log("Wrong year")
      return false
    }

    // Check the range of the day
    if(year>this.props.month['cal_year']){
      return true
    }
    return (parseInt(month) >= parseInt(this.props.month['current.month_id']) );
};


isValidDate(dateString)
{


    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");

    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;




    // Check the range of the day

    return (day > 0 && day <= monthLength[month - 1]);
};

arrayToObj(arr,keys){
  var new_arr = []

  arr.shift()
  arr.map((x) => {
    var new_obj = {}
    var i;
    for (i = 0; i < x.length; i++){
      new_obj[keys[i]] = x[i]
    }
    new_arr.push(new_obj)

  })

  return new_arr
}





  updateData = (results,file) => {





    // console.log(this.my_data)
    this.my_data = results.data
    // this.arrayToObj(results.data,fields)
    // console.log(this.my_data)

  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  handleChange = (e) => {
    importType = e.target.value
    document.getElementById("myh1id").innerHTML = "Import " + importType
  }

  handleDuplicate = (e) => {
    dupType = e.target.value

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
        header:false,
        skipEmptyLines: true}}
        onRemoveFile={this.handleOnRemoveFile}
        accept='.csv'
      >

        {({ file }) => (
          <div>
          <div className='ui grid'>

          <div className='sixteen wide column'><div className='ui center aligned grid'><h1 id='myh1id' className='ui header bigfont'>Import</h1></div></div>


          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>
          <div className='ui text container '>

          </div>
          </div>
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
          <select className="ui dropdown" onChange={this.handleChange}>
            <option value="error">Select an import type</option>
            <option value="Deals">Transactions</option>
            <option value="Rates">Rates</option>
            <option value="Users">Users</option>
            <option value="Goals">Goals</option>
            <option value="Accounts">Accounts</option>
            <option value="Role_Hierarchies">Role Hierarchy</option>
          </select>
          <select className="ui dropdown" onChange={this.handleDuplicate}>
            <option value="ignore">On duplicate...</option>
            <option value="update">Update</option>
            <option value="ignore">Ignore</option>

          </select>

          </div>



        )}
      </CSVReader>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    month: state.month.month
  }
}

export default connect(mapStateToProps, {uploadFile,getTime,loading})(CSVReaderV)
