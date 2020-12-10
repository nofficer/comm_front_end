

import React from 'react'
import { Field, reduxForm } from 'redux-form'


class RateTableForm extends React.Component {

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





  render(){
    if(this.props.editing == "yes"){
      return (
      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>



        <Field name="attainment_rule_id" component="select" label='Enter Attainment Rule ID'>
                  <option value="">Select an attainment rule...</option>
                  {this.props.populateDropdown.map(rule =>
                    <option value={rule[0]} key={rule[1]}>{rule[1]}</option>)}
                </Field>

        <Field name='start' component={this.renderInput} label='Enter Rate Effective Start Date (YYYY-MM-DD)'/>
        <Field name='end' component={this.renderInput} label='Enter Rate Effective End Date (YYYY-MM-DD)'/>
        <Field name='attain_start' component={this.renderInput} label='Enter Attainment Threshold LOW'/>
        <Field name='attain_end' component={this.renderInput} label='Enter Attainment Threshold HIGH'/>
        <Field name='tier' component={this.renderInput} label='Enter Tier'/>
        <Field name='rate' component={this.renderInput} label='Enter Rate'/>
        <Field name="rate_type" component="select" label='Enter Plan_ID'>
                  <option value="">Select a rate type...</option>
                  <option value="FIXED">FIXED</option>
                  <option value="RAMPED">RAMPED</option>
                </Field>
        <br/>
        <button className='ui button primary'>Submit</button>
      </form>
    )}
    else{
      return (
      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name='rate_id' component={this.renderInput} label='Enter Rate ID'/>
        <Field name="attainment_rule_id" component="select" label='Enter Attainment Rule ID'>
                  <option value="">Select an attainment rule...</option>
                  {this.props.populateDropdown.map(rule =>
                    <option value={rule[0]} key={rule[1]}>{rule[1]}</option>)}
                </Field>

        <Field name='start' component={this.renderInput} label='Enter Rate Effective Start Date (YYYY-MM-DD)'/>
        <Field name='end' component={this.renderInput} label='Enter Rate Effective End Date (YYYY-MM-DD)'/>
        <Field name='attain_start' component={this.renderInput} label='Enter Attainment Threshold LOW'/>
        <Field name='attain_end' component={this.renderInput} label='Enter Attainment Threshold HIGH'/>
        <Field name='tier' component={this.renderInput} label='Enter Tier'/>
        <Field name='rate' component={this.renderInput} label='Enter Rate'/>
        <Field name="rate_type" component="select" label='Enter Plan_ID'>
                  <option value="">Select a rate type...</option>
                  <option value="FIXED">FIXED</option>
                  <option value="RAMPED">RAMPED</option>
                </Field>
        <br/>
        <button className='ui button primary'>Submit</button>
      </form>
    )
    }



  }
}



function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

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
	if(!formValues.attainment_rule_id) {
		//only ran if the user did not enter a title
		errors.start = 'You must also select an attainment rule'
	}
  if(!formValues.rate_type) {
    //only ran if the user did not enter a title
    errors.rate = 'You must also select a RATE TYPE'
  }
  if(!formValues.start || !isValidDate(formValues.start)) {
    //only ran if the user did not enter a title
    errors.start = 'You must enter a start date'
  }
  if(!formValues.end || !isValidDate(formValues.end)) {
    //only ran if the user did not enter a title
    errors.end = 'You must enter an end date'
  }
  if(!formValues.attain_start) {
    //only ran if the user did not enter a title
    errors.attain_start = 'You must enter a low end'
  }
  if(!formValues.attain_end) {
    //only ran if the user did not enter a title
    errors.attain_end = 'You must enter a high end'
  }
  if(!formValues.tier) {
    //only ran if the user did not enter a title
    errors.tier = 'You must enter a tier'
  }
  if(!formValues.rate) {
    //only ran if the user did not enter a title
    errors.rate = 'You must enter a rate'
  }
  if(!formValues.rate_id){
    errors.rate_id = "You must enter a rate ID"
   }

  return errors
}

export default reduxForm({
	form: 'rateTableForm',
	validate: validate,
  enableReinitialize: true
})(RateTableForm);
