import React from 'react'
import { Field, reduxForm } from 'redux-form'


class LoginForm extends React.Component {

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

  renderInput = ({ input, label, meta, type }) => {
    const className=`field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
      <label id='notblack'>{label}</label>
      <input type={type} {...input} autoComplete='off'  />
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

        <Field name='username' component={this.renderInput} label='Enter Username'/>
        <Field name='password' type='password' component={this.renderInput} label='Enter Password'/>

        <br/>

        <button className='ui button primary'>Submit</button>
        <h2 className='red'>{this.props.issue}</h2>
      </form>
    )



  }
}


const validate = (formValues) => {

	const errors = {};
	if(!formValues.username) {
		//only ran if the user did not enter a title
		errors.username = 'You must enter your Username'
	}
  if(!formValues.password) {
		//only ran if the user did not enter a title
		errors.password = 'You must enter your Password'
	}


  return errors
}

export default reduxForm({
	form: 'loginForm',
	validate: validate,
  enableReinitialize: true
})(LoginForm);
