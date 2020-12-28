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
    <div>
    <div className='ui grid'>

    <div className='ui grid'>
      <div class='sixteen wide column'>
        <h1 className='center aligned'></h1>
      </div>
    </div>
      <div class='sixteen wide column'>
      <div className='ui center aligned grid'>
        <h1 className=''>{this.props.title}</h1>
        </div>
      </div>
      <div className='ui grid'>
        <div class='sixteen wide column'>
          <h1 className='center aligned'></h1>
        </div>
      </div><div className='ui grid'>
        <div class='sixteen wide column'>
          <h1 className='center aligned'></h1>
        </div>
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
    <div className='ui grid'>
    <div class='six wide column'></div>


    <div class='four wide column'>
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <Field name='plan_name' component={this.renderInput} label='Enter Plan Name' />
      <br/>
      <button className='ui fluid button primary'>Submit</button>
    </form>
    </div>
    <div class='six wide column'></div>

    </div>
    </div>
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
