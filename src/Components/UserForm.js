import React from 'react'
import { Field, reduxForm } from 'redux-form'


class UserForm extends React.Component {

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

  renderInput = ({ input, label, meta,type }) => {
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
    if(this.props.editing == "yes") {
      return (
        <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>

          <Field name='name' component={this.renderInput} label='Enter Name' />
          <Field name="plan_id" component="select" label='Enter Plan_ID'>
                    <option value="">Select a plan...</option>
                    {this.props.populateDropdown.map(plan =>
                      <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
                  </Field>
          <Field name='user_location' component={this.renderInput} label='Enter Location' />
          <Field name='username' component={this.renderInput} label='Enter Username' />
          <Field name="role" component="select" label='Select Role'>
                    <option value="">Select a role...</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                  </Field>
          <br/>
          <button className='ui button primary'>Submit</button>
        </form>
      )
    }
    if(this.props.editing == "password"){
      return(
        <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>

          <Field name='password' type='password' component={this.renderInput} label='Enter a new Password' />
          <br/>
          <button className='ui button primary'>Submit</button>
        </form>
      )
    }
    else{
      return (
        <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name='user_id' component={this.renderInput} label='Enter Employee ID' />
          <Field name='name' component={this.renderInput} label='Enter Name' />
          <Field name="plan_id" component="select" label='Enter Plan_ID'>
                    <option value="">Select a plan...</option>
                    {this.props.populateDropdown.map(plan =>
                      <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
                  </Field>
          <Field name='user_location' component={this.renderInput} label='Enter Location' />
          <Field name='username' component={this.renderInput} label='Enter Username' />
          <Field name='password' type='password' component={this.renderInput} label='Enter Password' />
          <Field name="role" component="select" label='Select Role'>
                    <option value="">Select a role...</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
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
	if(!formValues.name) {
		//only ran if the user did not enter a title
		errors.name = 'You must enter a name'
	}
	if (!formValues.plan_id) {
		errors.plan_id = 'You must enter a plan id'
	}
  if(!formValues.user_id || Number.isNaN(Number(formValues.user_id))){
    errors.user_id = 'You must enter a user id'
  }
  if (!formValues.user_location) {
		errors.user_location = 'You must enter a location'
	}
  if (!formValues.username) {
		errors.username = 'You must enter a username'
	}
  if (!formValues.password) {
		errors.password = 'You must enter a password'
	}
  if (!formValues.role) {
		errors.user_location = 'You must also select a role type'
	}
  return errors
}

export default reduxForm({
	form: 'userForm',
	validate: validate,
  enableReinitialize: true
})(UserForm);
