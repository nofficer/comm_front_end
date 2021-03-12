import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux'
import { getTime } from '../../actions'

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {

  }
};


class Savings extends React.Component {


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
    var avg_salary = Number(formValues['avg_salary'])
    var num_reps = Number(formValues['num_reps'])
    var avg_profit = Number(formValues['avg_profit'])
    var num_hours_per_month = Number(formValues['num_hours'])
    var avg_time_to_calc = Number(formValues['hours_calc'])
    var time_spent_communicating = Number(formValues['time_comm'])


    var time_spent_calculating_in_mins = num_reps*avg_time_to_calc
    console.log(num_reps)
    console.log(avg_time_to_calc)
    var time_spent_calculating_in_hours = time_spent_calculating_in_mins/60
    var hourly_rate = avg_salary/2080
    console.log(time_spent_communicating)
    console.log(time_spent_calculating_in_mins)
    var communication_cost = hourly_rate * time_spent_communicating


    var calc_cost = hourly_rate*time_spent_calculating_in_hours

    var rep_audit_cost = num_hours_per_month*avg_profit

    var result = communication_cost+calc_cost+rep_audit_cost



    var easycomp_cost = 20*(num_reps+1)

    var easy_num_hours_audit = num_hours_per_month*0.1
    var easy_calc_time = 0
    var easy_comm_time = time_spent_communicating*0.1

    var easy_comm_cost = hourly_rate * easy_comm_time
    var easy_audit_cost = avg_profit*easy_num_hours_audit

    var full_easy_cost = easycomp_cost + easy_comm_cost +easy_audit_cost

    var monthly_savings = result - full_easy_cost
    var total_annual_savings = formatMoney(monthly_savings*12)
    var result = formatMoney(result)
    var full_easy_cost = formatMoney(full_easy_cost)
    var monthly_savings = formatMoney(monthly_savings)



    document.getElementById("manual").innerHTML = "Monthly cost of manual commissions calculation: $" + result
    document.getElementById("full_easy").innerHTML = "*Monthly cost of EasyComp commissions calculation: $" + full_easy_cost
    document.getElementById("savings").innerHTML = "Monthly savings by switching to EasyComp: $" + monthly_savings
    document.getElementById("annual_savings").innerHTML = "Total Annual Savings by switching to EasyComp: $" + total_annual_savings
    document.getElementById("disclaimer").innerHTML = "*Inclusive of EasyComp subscription fee and labour hours utilized"
  }


//


  render(){



      return(
        <div>
        <div className='ui grid'>
        <div className='sixteen wide column'>

        </div>


        <div className='six wide column'>

        </div>
          <div className='four wide column'>
          <div className='ui center aligned grid'>
            <h1 className='pagetitle'>Savings Calculator</h1>
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


        <div className='six wide column'></div>
        <div className='four wide column'>
        </div>
        <div className='six wide column'></div>

        <div className='four wide column'></div>
        <div className='four wide column'>

          <Field name='num_reps' component={this.renderInput} label="How many sales reps do you have?" />


          <Field name='avg_salary' component={this.renderInput} label="What is the annual salary of the individual(s) responsible for commission calculation?" />
          <Field name='avg_profit'  component={this.renderInput} label="What is your cost per hour of sales rep performing non-revenue generating activities (lost profit or avg salary)?" />
          </div>
          <div className='four wide column'>

          <Field name='num_hours'  component={this.renderInput} label="What is the average number of hours spent by reps per month auditing and reviewing their own commission statements?" />
          <Field name='hours_calc'  component={this.renderInput} label="What is the average time in minutes to calculate one individual's commission calculation?" />
          <Field name='time_comm'  component={this.renderInput} label="How many hours does your team spend per month addressing sales rep queries or researching their issues?" />



          <br/>
          </div>


          <div className='six wide column'></div>
          <div className='four wide column'><button className='ui fluid button primary'>Submit</button></div>
          <div className='six wide column'></div>

          <div className='five wide column'></div>
          <div className='six wide column'>
          <table className='ui celled center aligned table'>
          <tbody>
          <tr><td><p id="manual"></p></td></tr>
          <tr><td><p id="full_easy"></p></td></tr>
          <tr><td><strong><p id="savings"></p></strong></td></tr>
          <tr><td><strong><p id="annual_savings"></p></strong></td></tr>

          </tbody>
          </table>
          <p id="disclaimer"></p>




          </div>
          <div className='five wide column'></div>
          </div>
        </form>
        </div>
      )


  }
}

// function isNumeric(str) {
// if (typeof str !== "string") return false // we only process strings!
// return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
//        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
// }
//
//
// function isValidDate(dateString)
// {
//     // First check for the pattern
//     if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
//         return false;
//
//     // Parse the date parts to integers
//     var parts = dateString.split("-");
//     var day = parseInt(parts[2], 10);
//     var month = parseInt(parts[1], 10);
//     var year = parseInt(parts[0], 10);
//
//     // Check the ranges of month and year
//     if(year < 1000 || year > 3000 || month === 0 || month > 12)
//         return false;
//
//     var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
//
//     // Adjust for leap years
//     if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
//         monthLength[1] = 29;
//
//
//     if(month<monthVar && year === yearVar){
//       return false
//     }
//     if(year<yearVar){
//       return false
//     }
//
//     // Check the range of the day
//     return day > 0 && day <= monthLength[month - 1];
// };




const validate = (formValues) => {
	const errors = {};


  //NEED TO ADD NEW COLUMSN TO FORMVALUES




  return errors
}

const mapStateToProps = (state) => {
  return {
    month: state.month.month
  }
}



export default reduxForm({
	form: 'savingsForm',
	validate: validate,
  enableReinitialize:true
})(connect(mapStateToProps,{getTime})(Savings));
