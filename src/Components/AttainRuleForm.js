import React from 'react'
import { Field, reduxForm } from 'redux-form'


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

      <div class="ui horizontal divider">
      *
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

      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <div class="ui grid">
      <div class="three wide column">

      </div>


      <div class="ten wide column">
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
                      <option value="nothin">Select an attainment metric...</option>
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
                        <option value="">Select a plan...</option>
                        {this.props.populateDropdown.map(plan =>
                        <option value={plan[0]} key={plan[1]}>{plan[1]}</option>)}
                      </Field>
          </div>

          <div className="four wide column">
          <p>Goal to be applied to attainment calculation?</p>
    <Field name="goal_use" component="select" label='Select Usage'>
          <option value="none">Select Goal Dependency...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Field>
          </div>

          <div className="four wide column">
          <p>Select Calculation Type</p>
          <Field name="rule_source" component="select" label='Select Rule Metric'>
                    <option value="NoCalc">Select a calculation type...</option>
                    <option value="Direct">Direct</option>
                    <option value="Overlay">Overlay</option>
                    <option value="Location">Location</option>
                    <option value="Ote_Direct">OTE_Direct</option>
                    <option value="Ote_Overlay">OTE_Overlay</option>
                    <option value="Ote_Location">OTE_Location</option>
                    <option value="Ote_Location_Overlay">OTE_Location_Overlay</option>
                  </Field>
          </div>
        </div>
      </div>





      </div>





        <br/>
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
        <div class="ui horizontal divider">
        *
        </div>
        <div className='ui grid'>
        <div class='six wide column'>

        </div>
          <div class='four wide column'>
            <button className='fluid ui button primary'>Submit</button>
          </div>
          <div class='six wide column'>

          </div>
        </div>


      </form>
    </div>
  )

  }
}


const validate = (formValues) => {
	const errors = {};
  console.log(formValues)
	if(!formValues.rule_name) {
		//only ran if the user did not enter a title
		errors.rule_name = 'You must enter a name'
	}
  if(!formValues.goal_use) {
		//only ran if the user did not enter a title
		errors.metric = 'You must choose whether attainment is goal dependent'
	}
  if(formValues.source == "nothin") {
		//only ran if the user did not enter a title
		console.log('nothin')
	}
  if(!formValues.filter) {
		//only ran if the user did not enter a title
		errors.filter = 'You must enter a filter'
	}
  if(!formValues.metric) {
		//only ran if the user did not enter a title
		errors.metric = 'You must enter a metric'
	}


  return errors
}

export default reduxForm({
	form: 'ruleForm',
	validate: validate,
  enableReinitialize: true
})(AttainRuleForm);
