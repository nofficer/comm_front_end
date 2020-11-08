import React from 'react'
import { Field, reduxForm } from 'redux-form'
import RenderDatePicker from './DatePicker'




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
    this.props.onSubmit(formValues)
  }


//



  render(){

  //console.log(this.props.initialValues.trans_date)
  return (
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
    <Field name="trans_seller_id" component="select" label='Select Seller'>
              <option value="">Select seller...</option>
              {this.props.populateDropdown.map(transaction =>
                <option value={transaction[0]} key={transaction[0]}>{transaction[1]}</option>)}
            </Field>
      <Field name='trans_type' component={this.renderInput} label='Enter Transaction Type' />
      <Field name='trans_date' component={this.renderInput} label='Select Transaction Date (DD-MM-YYYY)'/>
      <Field name='trans_rev' component={this.renderInput} label='Enter Transaction Revenue' />
      <Field name='trans_gp'  component={this.renderInput} label='Enter Transaction GP' />
      <Field name='order_number'  component={this.renderInput} label='Enter Order Number' />
      <br/>
      <button className='ui button primary'>Submit</button>
    </form>
  )

  }
}

function isNumeric(str) {
if (typeof str != "string") return false // we only process strings!
return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
       !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


function isValidDate(dateString)
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




const validate = (formValues) => {

	const errors = {};
	if(!formValues.trans_type) {
		//only ran if the user did not enter a title
		errors.trans_type = 'You must enter a type'
	}
  if(!formValues.trans_date || !isValidDate(formValues.trans_date)) {
		//only ran if the user did not enter a title
		errors.trans_date = 'You must enter a date'
	}

  if(!formValues.trans_rev || !isNumeric(formValues.trans_rev)) {
		//only ran if the user did not enter a title
		errors.trans_rev = 'You must enter a revenue amount which is a number'
	}
  if(!formValues.trans_gp || !isNumeric(formValues.trans_gp)) {
		//only ran if the user did not enter a title
		errors.trans_gp = 'You must enter a gross profit amount which is a number'
	}





  return errors
}



export default reduxForm({
	form: 'transForm',
	validate: validate,
  enableReinitialize:true
})(TransForm);
