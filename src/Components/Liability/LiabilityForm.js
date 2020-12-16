

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
        <div class='sixteen wide column'>

        </div>
        <div class='sixteen wide column'>

        </div>

        <div class='six wide column'>

        </div>
          <div class='four wide column'>
          <div className='ui center aligned grid'>
            <h1 className='pagetitle'>{this.props.title}</h1>
            </div>
          </div>
          <div class='six wide column'>

          </div>
        </div>
        <div className='ui grid'>
          <div class='sixteen wide column'>
            <h1 className='pagetitle center aligned'></h1>
          </div>
        </div>
        <div className='ui grid'>
          <div class='sixteen wide column'>
            <h1 className='pagetitle center aligned'></h1>
          </div>
        </div>

        <div className='ui grid'>
          <div class='sixteen wide column'>
              <div class="ui horizontal divider">
                *
              </div>
          </div>
        </div>


        <div className='ui grid'>
          <div class='sixteen wide column'>
            <h1 className='pagetitle center aligned'></h1>
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
