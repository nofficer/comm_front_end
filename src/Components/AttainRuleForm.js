import React from 'react'
import { Field, reduxForm } from 'redux-form'
import globals from './globals'

class AttainRuleForm extends React.Component {

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
      <label id='notblack'></label>
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
      <div className='ui grid '>

      <div className='ui grid'>
        <div className='sixteen wide column'>

        </div>
      </div>
        <div className='sixteen wide column'>
        <div className='ui center aligned grid'>
          <h1 className=''>{this.props.title}</h1>
          </div>
        </div>
        <div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div><div className='ui grid'>
          <div className='sixteen wide column'>

          </div>
        </div>


      </div>

      <div className="ui horizontal divider">
      *
      </div>




      <div className='ui grid '>
        <div className='sixteen wide column'>

        </div>
      </div>
      <div className='ui grid'>
        <div className='sixteen wide column'>

        </div>
      </div>

      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <div className="ui grid">
      <div className="three wide column">

      </div>


      <div className="ten wide column">
        <div className='ui grid'>
          <div className="four wide column">
          <p>Enter Rule Name</p>
          <Field name='rule_name' component={this.renderInput} label='Enter Rule Name' />
          </div>
          <div className="four wide column">
          <p>Enter Rule Filter</p>
          <Field name='rule_filter' component={this.renderInput} label='Enter Rule Filter' />
          </div>


          <div className="four wide column">
            <p>Select Attainment Metric</p>
            <Field name="rule_metric" component="select" label='Select Rule Metric'>
                      <option value="nometric">Select an attainment metric...</option>
                      <option value="gp">GP</option>
                      <option value="revenue">Revenue</option>
                    </Field>
          </div>

          <div className="four wide column">
            <p>Select Attainment Timeframe</p>
            <Field name="rule_timeframe" component="select" label='Select Rule Timefrane'>
                        <option value="nothin">Select an attainment timeframe...</option>
                        <option value="mtd">MTD</option>
                        <option value="qtd">QTD</option>
                        <option value="ytd">YTD</option>
                      </Field>
          </div>
          <div className="two wide column"></div>
          <div className="four wide column">
            <p>Select Plan</p>
            <Field name="plan_id" component="select" label='Enter Plan_ID'>
                        <option value="noplan">Select a plan...</option>
                        {this.props.populateDropdown.map(plan =>
                        <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
                      </Field>
          </div>

          <div className="four wide column">
          <p>Goal to be applied to attainment calculation?</p>
    <Field name="goal_use" component="select" label='Select Usage'>
          <option value="nogoal">Select Goal Dependency...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Field>
          </div>

          <div className="four wide column">
          <p>Select Calculation Type</p>
          <Field name="rule_source" component="select" label='Select Rule Metric'>
                    <option value="nosource">Select a calculation type...</option>
                    <option value="Direct">Direct</option>
                    <option value="Overlay">Overlay</option>
                    <option value="Location">Location</option>
                    <option value="Location_Overlay">Location_Overlay</option>
                    <option value="Rollup">Rollup</option>
                    <option value="Rollup_Full">Rollup_Full</option>
                    <option value="Custom">{globals.custom_field}</option>
                    <option value="Retro_Direct">Retro_Direct</option>
                    <option value="Retro_Overlay">Retro_Overlay</option>
                    <option value="Retro_Location">Retro_Location</option>
                    <option value="Retro_Location_Overlay">Retro_Location_Overlay</option>
                    <option value="Retro_Custom">Retro_{globals.custom_field}</option>
                    <option value="Retro_Rollup">Retro_Rollup</option>
                    <option value="Retro_Rollup_Full">Retro_Rollup_Full</option>
                    <option value="Ote_Direct">On_Target_Earnings_Direct</option>
                    <option value="Ote_Overlay">On_Target_Earnings_Overlay</option>
                    <option value="Ote_Location">On_Target_Earnings_Location</option>
                    <option value="Ote_Location_Overlay">On_Target_Earnings_Location_Overlay</option>
                    <option value="Ote_Custom">On_Target_Earnings_{globals.custom_field}</option>
                    <option value="Ote_Rollup">On_Target_Earnings_Rollup</option>
                    <option value="Ote_Rollup_Full">On_Target_Earnings_Rollup_Full</option>
                  </Field>
          </div>
        </div>
      </div>





      </div>





        <br/>
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


const validate = (formValues) => {
	const errors = {};

	if(!formValues.rule_name) {
		//only ran if the user did not enter a title
		errors.rule_name = 'You must enter a name'
	}
  if(formValues.goal_use == 'nogoal' ) {
		//only ran if the user did not enter a title
		errors.goal_use = 'Dont forget to select whether attainment is goal dependent'
	}
  if(formValues.rule_source == 'nosource') {
		//only ran if the user did not enter a title
		errors.rule_source = 'Dont forget to select a calculation type'
	}
  if(formValues.rule_metric == "nometric"  ) {
		//only ran if the user did not enter a title
		errors.rule_metric = 'Dont forget to select a metric'
	}
  if(formValues.rule_timeframe == "notimeframe") {
		//only ran if the user did not enter a title
		errors.rule_timeframe = 'Dont forget to select a timeframe --->'
	}
  if(!formValues.rule_filter) {

    errors.rule_filter = 'You must enter a filter'
  }
  if(formValues.plan_id == "noplan") {

    errors.plan_id = 'Dont forget to select a plan'
  }


  return errors
}

export default reduxForm({
	form: 'ruleForm',
	validate: validate,
  enableReinitialize: true
})(AttainRuleForm);
