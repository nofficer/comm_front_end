import React from 'react'
import { Field, reduxForm } from 'redux-form'


class PlanForm extends React.Component {

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
    console.log(formValues)
    this.props.onSubmit(formValues)
  }





  render(){

  return (
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <Field name='plan_name' component={this.renderInput} label='Enter Plan Name' />
      <br/>
      <button className='ui button primary'>Submit</button>
    </form>
  )

  }
}


const validate = (formValues) => {
	const errors = {};
	if(!formValues.plan_name) {
		//only ran if the user did not enter a title
		errors.plan_name = 'You must enter a name'
	}



  return errors
}

export default reduxForm({
	form: 'planForm',
	validate: validate,
  enableReinitialize: true
})(PlanForm);
