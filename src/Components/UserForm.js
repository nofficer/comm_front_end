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
      <label id='notblack'></label>
      <input type={type} {...input} autoComplete='off'  />
      {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }





  render(){
    if(this.props.editing === "yes") {
      return (
        <div className='ui container containermargin'>
        <div className='ui grid'>

        <div className='sixteen wide column'></div>
        <div className='six wide column'>

        </div>
          <div className='four wide column'>
          <div className='ui center aligned grid'>
            <div className='sixteen wide column'>
              <h1 className='pagetitle'>Editing User - {this.props.title}</h1>
              </div>
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

                <div className='six wide column'>

                </div>
                <div className='four wide column'>
                  <p>Enter Annual Target Incentive</p>
                  <Field name='annual_ti' component={this.renderInput} label='Enter Annual_Ti' />
                </div>

                <div className='six wide column'>

                </div>

        <div className='four wide column'>

        </div>



        <div className='four wide column'>
        <p>Enter Name</p>
        <Field name='name' component={this.renderInput} label='Enter Name' />
        <p>Select Plan</p>
        <Field name="plan_id" component="select" label='Enter Plan_ID'>
                  <option value="">Select a plan...</option>
                  {this.props.populateDropdown.map(plan =>
                    <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
                </Field>
        </div>

        <div className='four wide column'>
        <p>Enter Location</p>
        <Field name='user_location' component={this.renderInput} label='Enter Location' />
        <p>Select Role</p>
        <Field name="role" component="select" label='Select Role'>
                  <option value="">Select a role...</option>
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                </Field>


        </div>

        <div className='four wide column'>

        </div>

        <br/>
        </div>


        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>
        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>
        <div className="ui horizontal divider">
        *
        </div>
        <div className='ui grid'>
        <div className='six wide column'>

        </div>
          <div className='four wide column'>
            <button className='fluid ui button primary'>Submit</button>
          </div>
          <div className='six wide column'>

          </div>
        </div>
        </form>
        </div>
      )
    }
    if(this.props.editing === "password"){
      if(this.props.perms === 'seller'){
        return(
          <div className='ui container containermargin'>
          <div className='ui grid'>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
            <div className='six wide column'></div>
            <div className='four wide column'>
            <div className='ui center aligned grid'>
              <h1 className='pagetitle'>{this.props.title}</h1>
              </div>
            </div>
            <div className='six wide column'></div>

            <div className='sixteen wide column'>
            </div>
              <div className='sixteen wide column'>
              </div>

          </div>
          <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className='ui grid'>
          <div className='six wide column'>
          {this.props.errors}
          </div>
          <div className='four wide column'>
          <div style={{marginBottom:'5px'}} className='ui center aligned grid'>
            <div className='sixteen wide column'>
              <p>Enter <strong>old</strong> password</p>
            </div>

          </div>
          <Field name='old_password' type='password' component={this.renderInput} label='Enter current Password' />

          <br/>
          </div>
          <div className='six wide column'>
          </div>
          <div className='six wide column'>
          </div>
          <div className='four wide column'>
          <div style={{marginBottom:'5px'}} className='ui center aligned grid'>
            <div className='sixteen wide column'>
              <p>Enter <strong>new</strong> password</p>
            </div>

          </div>
          <Field name='password' type='password' component={this.renderInput} label='Enter a new Password' />
          <br/>
          </div>
          <div className='six wide column'>
          </div>




          </div>

          <div className='ui grid'>
          <div className='six wide column'>
          </div>
          <div className='four wide column'>
          <button className='ui button fluid primary'>Submit</button>
          </div>
          <div className='six wide column'>
          </div>





          </div>


          </form>
          </div>
        )
      }
      else{
        return(
          <div className='ui container containermargin'>
          <div className='ui grid'>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
          <div className='sixteen wide column'>
          </div>
            <div className='six wide column'></div>
            <div className='four wide column'>
            <div className='ui center aligned grid'>
              <h1 className='pagetitle'>{this.props.title}</h1>
              </div>
            </div>
            <div className='six wide column'></div>

            <div className='sixteen wide column'>
            </div>
              <div className='sixteen wide column'>
              </div>

          </div>
          <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className='ui grid'>

          <div className='six wide column'>
          </div>
          <div className='four wide column'>
          <div style={{marginBottom:'5px'}} className='ui center aligned grid'>
            <div className='sixteen wide column'>
              <p>Enter <strong>new</strong> password</p>
            </div>

          </div>
          <Field name='password' type='password' component={this.renderInput} label='Enter a new Password' />
          <br/>
          </div>
          <div className='six wide column'>
          </div>




          </div>

          <div className='ui grid'>
          <div className='six wide column'>
          </div>
          <div className='four wide column'>
          <button className='ui button fluid primary'>Submit</button>
          </div>
          <div className='six wide column'>
          </div>





          </div>


          </form>
          </div>
        )
      }

    }
    else{
      return (
        <div className='ui container containermargin'>
        <div className='ui grid'>

        <div className='sixteen wide column'></div>
        <div className='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className='pagetitle center aligned'>{this.props.title}</h1>
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
        <p>Enter Employee ID</p>
        <Field name='user_id' component={this.renderInput} label='Enter Employee ID' />
        <p>Enter Name</p>
        <Field name='name' component={this.renderInput} label='Enter Name' />

      <p>Enter Location</p>
      <Field name='user_location' component={this.renderInput} label='Enter Location' />

      <p>Select Plan</p>
      <Field name="plan_id" component="select" label='Enter Plan_ID'>
                <option value="">Select a plan...</option>
                {this.props.populateDropdown.map(plan =>
                  <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
              </Field>



        </div>



        <div className='four wide column'>
        <p>Enter Username</p>
        <Field name='username' component={this.renderInput} label='Enter Username' />
        <p>Enter Password</p>
        <Field name='password' type='password' component={this.renderInput} label='Enter Password' />

        <p>Enter Annual Target Incentive</p>
        <Field name='annual_ti' component={this.renderInput} label='Enter Annual_Ti' />
        <p>Select Role</p>
        <Field name="role" component="select" label='Select Role'>
                  <option value="">Select a role...</option>
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                </Field>
        </div>

        <div className='four wide column'></div>







          <br/>

          </div>
          <div className='ui grid'>
            <div className='sixteen wide column'>

            </div>
          </div>
          <div className='ui grid'>
            <div className='sixteen wide column'>

            </div>
          </div>
          <div className="ui horizontal divider">
          *
          </div>
          <div className='ui grid'>
          <div className='six wide column'>

          </div>
            <div className='four wide column'>
              <button className='fluid ui button primary'>Submit</button>
            </div>
            <div className='six wide column'>

            </div>
          </div>
        </form>
        </div>

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
  if(!formValues.user_id){
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
  if (!formValues.annual_ti ||isNaN(Number(formValues.annual_ti)) ){
    errors.annual_ti = 'You must enter an annual target incentive which is a number'
  }

  return errors
}

export default reduxForm({
	form: 'userForm',
	validate: validate,
  enableReinitialize: true
})(UserForm);
