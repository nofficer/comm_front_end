

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



        <Field name="plan_id" component="select" label='Enter Plan_ID'>
                  <option value="">Select a plan...</option>
                  {this.props.populateDropdown.map(plan =>
                    <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
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
        <Field name="plan_id" component="select" label='Enter Plan_ID'>
                  <option value="">Select a plan...</option>
                  {this.props.populateDropdown.map(plan =>
                    <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
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


const validate = (formValues) => {
	const errors = {};
	if(!formValues.plan_id) {
		//only ran if the user did not enter a title
		errors.start = 'You must also select a PLAN'
	}
  if(!formValues.rate_type) {
    //only ran if the user did not enter a title
    errors.rate = 'You must also select a RATE TYPE'
  }
  if(!formValues.start) {
    //only ran if the user did not enter a title
    errors.start = 'You must enter a start date'
  }
  if(!formValues.end) {
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
