import React from 'react'
import { Field, reduxForm } from 'redux-form'


class CalcForm extends React.Component {


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

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
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




  render(){

  return (
    <div>
    <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <Field name='change' component={this.renderInput} label='Would you like to make a change? y/n?:   ' />
      <Field name='BaseRate1' component={this.renderInput} label='Enter Tier 1 Base+ Rate:   ' />
      <Field name='BaseRate2' component={this.renderInput} label='Enter Tier 2 Base+ Rate:   ' />
      <Field name='BaseRate3' component={this.renderInput} label='Enter Tier 3 Base+ Rate:   ' />
      <Field name='BaseRate4' component={this.renderInput} label='Enter Tier 4 Base+ Rate:   ' />
      <Field name='BaseRate5' component={this.renderInput} label='Enter Tier 5 Base+ Rate:   ' />
      <Field name='BaseRate6' component={this.renderInput} label='Enter Tier 6 Base+ Rate:   ' />
      <Field name='CommRate1' component={this.renderInput} label='Enter Tier 1 Comm Rate:   ' />
      <Field name='CommRate2' component={this.renderInput} label='Enter Tier 2 Comm Rate:   ' />
      <Field name='CommRate3' component={this.renderInput} label='Enter Tier 3 Comm Rate:   ' />
      <Field name='CommRate4' component={this.renderInput} label='Enter Tier 4 Comm Rate:   ' />
      <Field name='CommRate5' component={this.renderInput} label='Enter Tier 5 Comm Rate:   ' />
      <Field name='CommRate6' component={this.renderInput} label='Enter Tier 6 Comm Rate:   ' />
      <Field name='Tier1' component={this.renderInput} label='Enter Tier 1 top threshold:   ' />
      <Field name='Tier2' component={this.renderInput} label='Enter Tier 2 top threshold:   ' />
      <Field name='Tier3' component={this.renderInput} label='Enter Tier 3 top threshold:   ' />
      <Field name='Tier4' component={this.renderInput} label='Enter Tier 4 top threshold:   ' />
      <Field name='Tier5' component={this.renderInput} label='Enter Tier 5 top threshold:   ' />
      <Field name='input' component={this.renderInput} label='Enter input filename.csv:   ' />
      <Field name='output' component={this.renderInput} label='Enter output filename.csv:   ' />
      <br/>
      <button className='ui button primary'>Submit</button>

    </form>
    <h1>{this.props.calc}</h1>
    </div>
  )

  }
}


const validate = (formValues) => {
	const errors = {};
  return errors
}


const mapStateToProps = (state) => {
  return {
    plans: Object.values(state.plans.plans),
  }
}

export default reduxForm({
	form: 'calcForm',
	validate: validate
})(CalcForm);
