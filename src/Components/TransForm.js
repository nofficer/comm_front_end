import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux'
import { getTime } from '../actions'


import globals from './globals'

var monthVar = ''
var yearVar = ''

var customfieldlabel = 'Enter ' + globals.custom_field
var ordernumlabel = 'Enter ' + globals.order_num

const splitlabel = 'Enter ' + globals.split
const multiplierlabel = 'Enter Payout ' + globals.multiplier
const locationlabel = 'Enter Transaction ' + globals.location

const datelabel = 'Select Transaction ' + globals.date + ' (YYYY-MM-DD)'
const revenuelabel = 'Enter Transaction ' + globals.revenue
const gplabel = 'Enter Transaction ' + globals.gp

const typelabel = 'Enter Transaction ' + globals.type
const trans_idlabel = 'Enter ' + globals.trans_id
const sellerlabel = 'Select ' + globals.seller + ''

class TransForm extends React.Component {


  renderError({error, touched}){
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>
            {error}
          </div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className=`field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
      <label id='notblack'>{label}</label>
      <input {...input} autoComplete='off'  />
      {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    if(this.props.pass_id){
      formValues['trans_id'] = this.props.pass_id
    }

    this.props.onSubmit(formValues)
  }


//


  render(){

    monthVar = this.props.month['current.month_id']
    yearVar = this.props.month['cal_year']
    if(this.props.editing === "yes"){
      return(
        <div>
        <div className='ui grid'>
        <div className='sixteen wide column'>

        </div>


        <div className='six wide column'>

        </div>
          <div className='four wide column'>
          <div className='ui center aligned grid'>
            <h1 className='pagetitle'>{this.props.title}</h1>
            </div>
          </div>
          <div className='six wide column'>

          </div>
        </div>
        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>
        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>

        <div className='ui grid'>
          <div className='sixteen wide column'>
              <div className="ui horizontal divider">
                *
              </div>
          </div>
        </div>


        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>
        <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className='ui grid'>


        <div className='six wide column'></div>
        <div className='four wide column'><Field name="seller_id" component="select" label={sellerlabel}>
                  <option value="">Select seller...</option>
                  {this.props.populateDropdown.map(transaction =>
                    <option value={transaction[0]} key={transaction[0]}>{transaction[1]}</option>)}
                </Field>
        </div>
        <div className='six wide column'></div>

        <div className='four wide column'></div>
        <div className='four wide column'>
        <strong><p>Transaction ID</p></strong>
        <Field name="trans_id" component="select" label='Trans ID'>

                    <option value={this.props.populateDropdownID} key={this.props.populateDropdownID}>{this.props.populateDropdownID}</option>
                </Field>
          <Field name='type' component={this.renderInput} label={typelabel} />
          <Field name='date' component={this.renderInput} label={datelabel}/>

          <Field name='revenue' component={this.renderInput} label={revenuelabel} />
          <Field name='gp'  component={this.renderInput} label={gplabel} />
          </div>
          <div className='four wide column'>

          <Field name='order_num'  component={this.renderInput} label={ordernumlabel} />
          <Field name='transaction_location'  component={this.renderInput} label={locationlabel} />
          <Field name='split_percent'  component={this.renderInput} label={splitlabel} />
          <Field name='custom_field'  component={this.renderInput} label={customfieldlabel}/>
          <Field name='payout_multiplier'  component={this.renderInput} label={multiplierlabel}   />



          <br/>
          </div>


          <div className='six wide column'></div>
          <div className='four wide column'><button className='ui fluid button primary'>Submit</button></div>
          <div className='six wide column'></div>

          </div>
        </form>
        </div>
      )
    }
    else {
      return (
        <div>
        <div className='ui grid'>
        <div className='sixteen wide column'>

        </div>


        <div className='six wide column'>

        </div>
          <div className='four wide column'>
          <div className='ui center aligned grid'>
            <h1 className='pagetitle'>{this.props.title}</h1>
            </div>
          </div>
          <div className='six wide column'>

          </div>
        </div>
        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>
        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>

        <div className='ui grid'>
          <div className='sixteen wide column'>
              <div className="ui horizontal divider">
                *
              </div>
          </div>
        </div>


        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>
        <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className='ui grid'>


        <div className='six wide column'></div>
        <div className='four wide column'><Field name="seller_id" component="select" label='Select Seller'>
                  <option value="">Select seller...</option>
                  {this.props.populateDropdown.map(transaction =>
                    <option value={transaction[0]} key={transaction[0]}>{transaction[1]}</option>)}
                </Field>
        </div>
        <div className='six wide column'></div>

        <div className='four wide column'></div>
        <div className='four wide column'>
        <Field name='trans_id' component={this.renderInput} label={trans_idlabel} />

          <Field name='type' component={this.renderInput} label={typelabel} />
          <Field name='date' component={this.renderInput} label={datelabel}/>

          <Field name='revenue' component={this.renderInput} label={revenuelabel} />
          <Field name='gp'  component={this.renderInput} label={gplabel} />
          </div>
          <div className='four wide column'>

          <Field name='order_num'  component={this.renderInput} label={ordernumlabel} />
          <Field name='transaction_location'  component={this.renderInput} label={locationlabel} />
          <Field name='split_percent'  component={this.renderInput} label={splitlabel} />
          <Field name='custom_field'  component={this.renderInput} label={customfieldlabel} />
          <Field name='payout_multiplier'  component={this.renderInput} label={multiplierlabel}   />



          <br/>
          </div>


          <div className='six wide column'></div>
          <div className='four wide column'><button className='ui fluid button primary'>Submit</button></div>
          <div className='six wide column'></div>

          </div>
        </form>
        </div>
      )
    }

  //console.log(this.props.initialValues.trans_date)


  }
}

function isNumeric(str) {
if (typeof str !== "string") return false // we only process strings!
return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
       !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;


    if(month<monthVar && year === yearVar){
      return false
    }
    if(year<yearVar){
      return false
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};




const validate = (formValues) => {
	const errors = {};
	if(!formValues.type) {
		//only ran if the user did not enter a title
		errors.type = 'You must enter a type'
	}
  if(!formValues.date || !isValidDate(formValues.date)) {
		//only ran if the user did not enter a title
		errors.date = 'You must enter a date that is within the current or future period'
	}

  if(!formValues.revenue || !isNumeric(formValues.revenue)) {
		//only ran if the user did not enter a title
		errors.rev = 'You must enter a revenue amount which is a number'
	}
  if(!formValues.gp || !isNumeric(formValues.gp)) {
		//only ran if the user did not enter a title
		errors.gp = 'You must enter a gross profit amount which is a number'
	}
  if(!formValues.order_num) {
		//only ran if the user did not enter a title
		errors.order_num = 'You must enter an order number'
	}
  if(!formValues.transaction_location) {
    //only ran if the user did not enter a title
    errors.transaction_location = 'You must enter an order number'
  }
  if(!formValues.split_percent) {
    //only ran if the user did not enter a title
    errors.split_percent = 'You must enter a split percent'
  }
  if(!formValues.custom_field) {
    //only ran if the user did not enter a title
    errors.custom_field = 'You must enter a number'
  }
  if(!formValues.trans_id) {
    errors.trans_id = "You must enter a transaction ID"
  }
  if(!formValues.payout_multiplier) {
    errors.custom_field = "You must enter a payout multiplier"
  }
  if(!formValues.seller_id) {
    errors.custom_field = "You must select a seller"
  }

  //NEED TO ADD NEW COLUMSN TO FORMVALUES




  return errors
}

const mapStateToProps = (state) => {
  return {
    month: state.month.month
  }
}



export default reduxForm({
	form: 'transForm',
	validate: validate,
  enableReinitialize:true
})(connect(mapStateToProps,{getTime})(TransForm));
