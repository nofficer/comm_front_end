

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
    if(this.props.editing != "yes"){
      return  (
        <div>
        <div className='ui grid'>

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
      <div className='four wide column'>

      <Field name='user_id' component={this.renderInput} label='Enter User ID'/>
      <Field name='mgr_id' component={this.renderInput} label='Enter Manager ID'/>

      </div>
        <div className='four wide column'
        ><Field name='level' component={this.renderInput} label='Enter User Role Level'/>
        <Field name='dept' component={this.renderInput} label='Enter User Department'/>
</div>

        <br/>

        <div className='four wide column'></div>
        <div className='six wide column'></div>
        <div className='four wide column'><button className='ui fluid button primary'>Submit</button></div>
        <div className='six wide column'></div>
        </div>
      </form>
      </div>
    )}
    else{
      return (
        <div>
        <div className='ui grid'>

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
      <div className='four wide column'>


      <Field name='mgr_id' component={this.renderInput} label='Enter Manager ID'/>

      </div>
        <div className='four wide column'
        ><Field name='level' component={this.renderInput} label='Enter User Role Level'/>
        <Field name='dept' component={this.renderInput} label='Enter User Department'/>
</div>

        <br/>

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



const validate = (formValues) => {
	const errors = {};
	if(!formValues.user_id) {
		//only ran if the user did not enter a title
		errors.user_id = 'You must enter a User ID'
	}
  if(!formValues.mgr_id) {
    //only ran if the user did not enter a title
    errors.mgr_id = 'You must enter a Manager ID'
  }
  if(!formValues.level) {
    //only ran if the user did not enter a title
    errors.level = 'You must enter a Role Level'
  }
  if(!formValues.dept) {
    //only ran if the user did not enter a title
    errors.dept = 'You must enter a Department'
  }

  return errors
}

export default reduxForm({
	form: 'rateTableForm',
	validate: validate,
  enableReinitialize: true
})(RateTableForm);
