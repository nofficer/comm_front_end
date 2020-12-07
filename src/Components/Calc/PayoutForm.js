import React from 'react'
import { Field, reduxForm } from 'redux-form'


class PayoutForm extends React.Component {

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
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <h2>Note that any adjusted payouts will be overwritten if calculations are re-ran</h2>
      <p>Currently editing payout number: {this.props.initialValues['payout_id']}</p>
      <Field name='payout' component={this.renderInput} label='Adjust payout amount' />
      <Field name="payee_id" component="select" label='Enter Plan_ID'>
                  <option value="">Select a payee...</option>
                  {this.props.populateDropdown.map(payee =>
                  <option value={payee[0]} key={payee[1]}>{payee[1]}</option>)}
                </Field>
      <br/>
      <button className='ui button primary'>Submit</button>
    </form>
  )

  }
}


const validate = (formValues) => {
	const errors = {};
	if(!formValues.payout) {
		//only ran if the user did not enter a title
		errors.payout = 'You must enter a payout amount'
	}
  if(!formValues.payee_id){
    errors.payout = "You must also select a payee"
  }



  return errors
}

export default reduxForm({
	form: 'payoutForm',
	validate: validate,
  enableReinitialize: true
})(PayoutForm);
