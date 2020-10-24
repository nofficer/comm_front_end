import React from 'react'
import { Field, reduxForm } from 'redux-form'


class RuleForm extends React.Component {

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

  return (
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <Field name='rule_name' component={this.renderInput} label='Enter Rule Name' />
      <Field name='source' component={this.renderInput} label='Enter Rule Source' />
      <Field name='filter' component={this.renderInput} label='Enter Rule Filter' />
      <Field name='metric' component={this.renderInput} label='Enter Rule Metric' />

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
  if(!formValues.source) {
		//only ran if the user did not enter a title
		errors.source = 'You must enter a source'
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
	validate: validate
})(RuleForm);
