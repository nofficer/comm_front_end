import React from 'react'
import { Field, reduxForm } from 'redux-form'
import globals from '../globals'
import monthmap from '../monthmap'



class InputForm extends React.Component {

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
    <div>
      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <div className='ui grid'>
      <div className='sixteen wide column'></div>

      <div className='six wide column'></div>
      <div className='four wide column'>  <div className='ui center aligned grid'>
          <h1 className='pagetitle'>Payout Forecast</h1>
          </div></div>
      <div className='six wide column'></div>
      <div className='sixteen wide column'></div>
      <div className='four wide column'>



      </div>
      <div className='three wide column'>



      </div>
      <div className='two wide column'>
      <p>Select Year</p>
      <Field name="year" component="select" label='Select Year'>
      {this.props.populateDropdown.map(year =>

      <option value={year} key={"id_" + year}>{year}</option>)}
                </Field>


      </div>
      <div className='three wide column'>




      </div>
      <div className='four wide column'>



      </div>
      <div className='four wide column'>



      </div>


      <div className='four wide column'>

        <Field name="month_1" component={this.renderInput} label={monthmap[1]} />
        <Field name="month_2" component={this.renderInput} label={monthmap[2]} />
        <Field name="month_3" component={this.renderInput} label={monthmap[3]} />
        <Field name="month_4" component={this.renderInput} label={monthmap[4]} />
        <Field name="month_5" component={this.renderInput} label={monthmap[5]} />
        <Field name="month_6" component={this.renderInput} label={monthmap[6]} />
      </div>
      <div className='four wide column'>
      <Field name="month_7" component={this.renderInput} label={monthmap[7]} />
      <Field name="month_8" component={this.renderInput} label={monthmap[8]} />
      <Field name="month_9" component={this.renderInput} label={monthmap[9]} />
      <Field name="month_10" component={this.renderInput} label={monthmap[10]} />
      <Field name="month_11" component={this.renderInput} label={monthmap[11]} />
      <Field name="month_12" component={this.renderInput} label={monthmap[12]} />



        <br/>
        </div>
        <div className='four wide column'>


        </div>


        <div className='six wide column'></div>
        <div className='four wide column'>

        <button className='ui fluid button primary'>Submit</button>
        </div>
        <div className='six wide column'></div>

        </div>
      </form>
    </div>
  )

  }
}



function isNumber(input) {
  if(typeof(input) === 'number'){
    return true
  }
  else if(typeof(input) === 'string'){
    return !isNaN(input) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(input))
  }
  else{
    return false
  }
}


const validate = (formValues) => {
	const errors = {};
  console.log(formValues)

  console.log(isNumber(formValues.month_1))

  if(!formValues.month_1 || !isNumber(formValues.month_1)) {



    errors.month_1 = "Amount must be a number"
  }
  if(!formValues.month_2 || !isNumber(formValues.month_2)) {

    errors.month_2 = "Amount must be a number"
  }
  if(!formValues.month_3 || !isNumber(formValues.month_3)) {

    errors.month_3 = "Amount must be a number"
  }
  if(!formValues.month_4 || !isNumber(formValues.month_4)) {

    errors.month_4 = "Amount must be a number"
  }
  if(!formValues.month_5 || !isNumber(formValues.month_5)) {

    errors.month_5 = "Amount must be a number"
  }
  if(!formValues.month_6 || !isNumber(formValues.month_6)) {

    errors.month_6 = "Amount must be a number"
  }
  if(!formValues.month_7 || !isNumber(formValues.month_7)) {

    errors.month_7 = "Amount must be a number"
  }
  if(!formValues.month_8 || !isNumber(formValues.month_8)) {

    errors.month_8 = "Amount must be a number"
  }
  if(!formValues.month_9 || !isNumber(formValues.month_9)) {

    errors.month_9 = "Amount must be a number"
  }
  if(!formValues.month_10 || !isNumber(formValues.month_10)) {

    errors.month_10 = "Amount must be a number"
  }
  if(!formValues.month_11 || !isNumber(formValues.month_11)) {

    errors.month_11 = "Amount must be a number"
  }
  if(!formValues.month_12 || !isNumber(formValues.month_12)) {

    errors.month_12 = "Amount must be a number"
  }



  return errors
}

export default reduxForm({
	form: 'inputForm',
	validate: validate,
  enableReinitialize: true,
  touchOnChange: true,
  touchOnBlur: true
})(InputForm);
