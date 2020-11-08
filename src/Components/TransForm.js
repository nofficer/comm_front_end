import React from 'react'
import { Field, reduxForm } from 'redux-form'
import RenderDatePicker from './DatePicker'




class TransForm extends React.Component {


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


//



  render(){

  //console.log(this.props.initialValues.trans_date)
  return (
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
    <Field name="trans_seller_id" component="select" label='Select Seller'>
              <option value="">Select seller...</option>
              {this.props.populateDropdown.map(transaction =>
                <option value={transaction[0]} key={transaction[0]}>{transaction[1]}</option>)}
            </Field>
      <Field name='trans_type' component={this.renderInput} label='Enter Transaction Type' />
      <Field name='trans_date' component={this.renderInput} label='Select Transaction Date (DD-MM-YYYY)'/>
      <Field name='trans_rev' component={this.renderInput} label='Enter Transaction Revenue' />
      <Field name='trans_gp'  component={this.renderInput} label='Enter Transaction GP' />
      <Field name='order_number'  component={this.renderInput} label='Enter Order Number' />
      <br/>
      <button className='ui button primary'>Submit</button>
    </form>
  )

  }
}


const validate = (formValues) => {

	const errors = {};
	if(!formValues.trans_type) {
		//only ran if the user did not enter a title
		errors.trans_type = 'You must enter a type'
	}
  if(!formValues.trans_date) {
		//only ran if the user did not enter a title
		errors.trans_date = 'You must enter a date'
	}

  if(!formValues.trans_rev || Number.isNaN(Number(formValues.trans_rev))) {
		//only ran if the user did not enter a title
		errors.trans_rev = 'You must enter a revenue amount'
	}
  if(!formValues.trans_gp || Number.isNaN(Number(formValues.trans_gp))) {
		//only ran if the user did not enter a title
		errors.trans_gp = 'You must enter a gross profit amount'
	}





  return errors
}



export default reduxForm({
	form: 'transForm',
	validate: validate,
  enableReinitialize:true
})(TransForm);
