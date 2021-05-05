

import React from 'react'
import { Field, reduxForm } from 'redux-form'


class GoalForm extends React.Component {

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
    if(this.props.editing === "yes"){
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
          <div className='four wide column'>
          <p><strong>Select a User</strong></p>
          <Field name="user_id" component="select" label='Enter User ID'>
                    <option value="">Select a User..</option>
                    {this.props.populateDropdownUser.map(user =>
                      <option value={user[0]} key={user[1]}>{user[1]}</option>)}
                  </Field>




        <Field name='goal' component={this.renderInput} label='Enter Goal'/>


        </div>

        <div className='four wide column'>
        <p><strong>Select an attainment rule</strong></p>
        <Field name="attainment_rule_id" component="select" label='Enter Attainment Rule ID'>
                  <option value="">Select an attainment rule...</option>
                  {this.props.populateDropdown.map(rule =>
                    <option value={rule[0]} key={rule[1]}>{rule[1]}</option>)}
                </Field>
        <Field name='start' component={this.renderInput} label='Enter Goal Effective Start Date (YYYY-MM-DD)'/>

              <Field name='end' component={this.renderInput} label='Enter Goal Effective End Date (YYYY-MM-DD)'/>




                        <br/>
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
    else {
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
          <div className='four wide column'>
          <p><strong>Select a User</strong></p>
          <Field name="user_id" component="select" label='Enter User ID'>
                    <option value="">Select a User..</option>
                    {this.props.populateDropdownUser.map(user =>
                      <option value={user[0]} key={user[1]}>{user[1]}</option>)}
                  </Field>
        <Field name='goal_id' component={this.renderInput} label='Enter Goal ID'/>




        <Field name='goal' component={this.renderInput} label='Enter Goal'/>


        </div>

        <div className='four wide column'>
        <p><strong>Select an attainment rule</strong></p>
        <Field name="attainment_rule_id" component="select" label='Enter Attainment Rule ID'>
                  <option value="">Select an attainment rule...</option>
                  {this.props.populateDropdown.map(rule =>
                    <option value={rule[0]} key={rule[1]}>{rule[1]}</option>)}
                </Field>

        <Field name='start' component={this.renderInput} label='Enter Goal Effective Start Date (YYYY-MM-DD)'/>

              <Field name='end' component={this.renderInput} label='Enter Goal Effective End Date (YYYY-MM-DD)'/>




                        <br/>
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
}

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
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
  if(!formValues.goal_id) {
    //only ran if the user did not enter a title
    errors.goal_id = 'You must enter a goal id'
  }
  if(!formValues.user_id) {
    //only ran if the user did not enter a title
    errors.goal = 'You must also select a user'
  }
  if(!formValues.start || !isValidDate(formValues.start)) {
    //only ran if the user did not enter a title
    errors.start = 'You must enter a start date'
  }
  if(!formValues.end || !isValidDate(formValues.end)) {
    //only ran if the user did not enter a title
    errors.end = 'You must enter an end date'
  }
  if(!formValues.goal) {
    //only ran if the user did not enter a title
    errors.goal = 'You must enter a goal'
  }
  return errors
}

export default reduxForm({
	form: 'rateTableForm',
	validate: validate,
  enableReinitialize: true
})(GoalForm);
