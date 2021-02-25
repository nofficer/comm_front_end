

import React from 'react'
import { Field, reduxForm } from 'redux-form'


class LiabilityForm extends React.Component {

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

      return(
        <div>
        <div className='ui grid'>
        <div className='sixteen wide column'>

        </div>
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
        <div className='four wide column'></div>
          <div className='eight wide column'>





        <Field name='liability_amount' component={this.renderInput} label='Enter Liability Amount'/>


        </div>

        <div className='four wide column'></div>



          <div className='six wide column'></div>
          <div className='four wide column'><button className='ui fluid button primary'>Submit</button></div>
          <div className='six wide column'></div>

          </div>
        </form>
        </div>
    )




}
}




const validate = (formValues) => {
	const errors = {};
  if(!formValues.liability_amount) {
		//only ran if the user did not enter a title
		errors.liability_amount = 'You must enter a liability amount'
	}

  return errors
}

export default reduxForm({
	form: 'liabilityForm',
	validate: validate,
  enableReinitialize: true
})(LiabilityForm);
