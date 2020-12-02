import React from 'react'
import { Field, reduxForm } from 'redux-form'


class AttainRuleForm extends React.Component {

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
    console.log(this.props.formValues)
  return (
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <Field name='rule_name' component={this.renderInput} label='Enter Rule Name' />
      <Field name="rule_source" component="select" label='Select Rule Metric'>
                <option value="NoCalc">Select a calculation type...</option>
                <option value="Direct">Direct</option>
                <option value="Overlay">Overlay</option>
                <option value="Location">Location</option>
                <option value="Location_Overlay">Location_Overlay</option>
              </Field>
      <Field name='rule_filter' component={this.renderInput} label='Enter Rule Filter' />
      <Field name="rule_metric" component="select" label='Select Rule Metric'>
                <option value="nothin">Select an attainment metric...</option>
                <option value="gp">GP</option>
                <option value="revenue">Revenue</option>
              </Field>
      <Field name="rule_timeframe" component="select" label='Select Rule Timefrane'>
                  <option value="nothin">Select an attainment timeframe...</option>
                  <option value="mtd">MTD</option>
                  <option value="qtd">QTD</option>
                  <option value="ytd">YTD</option>
                </Field>
      <br/>
      <button className='ui button primary'>Submit</button>
    </form>
  )

  }
}


const validate = (formValues) => {
	const errors = {};
	if(!formValues.rule_name) {
		//only ran if the user did not enter a title
		errors.rule_name = 'You must enter a name'
	}
  if(formValues.source == "nothin") {
		//only ran if the user did not enter a title
		console.log('nothin')
	}
  if(!formValues.filter) {
		//only ran if the user did not enter a title
		errors.filter = 'You must enter a filter'
	}
  if(!formValues.metric) {
		//only ran if the user did not enter a title
		errors.metric = 'You must enter a metric'
	}


  return errors
}

export default reduxForm({
	form: 'ruleForm',
	validate: validate,
  enableReinitialize: true
})(AttainRuleForm);
