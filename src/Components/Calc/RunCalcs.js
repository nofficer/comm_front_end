import React from 'react'
import { connect } from 'react-redux'
import { getTime,updateTime,revertTime,getPayroll,selectMonth,getUsers,castUser,checkCalcStatus,calcPlans,loadCalcs,getPlans,clearError } from '../../actions'
import history from '../../history'
import Modal from '../../Modal'
import Login from '../Accounts/Login'
import Loader from '../../Loader'


import XLSX from 'xlsx';
import monthmap from '../monthmap'






class RunCalcs extends React.Component {
  componentDidMount(){
    this.props.getTime()
    this.props.getUsers()
    this.props.checkCalcStatus()
    this.props.getPlans()
  }
  runCalc = () => {
    var plan_list_nums = this.planList.map(x => Number(x))
    console.log(plan_list_nums)
    this.props.loadCalcs()
    this.props.calcPlans(plan_list_nums)
    this.planList = []
  }

  runAllCalc = () => {
    var plan_list_nums = this.props.plans.map(x => Number(x[0]))
    console.log(plan_list_nums)
    this.props.loadCalcs()
    this.props.calcPlans(plan_list_nums)
    this.planList = []
  }



  renderCalcButton(){

      return(
          <React.Fragment>
          <div className='sixteen wide column'>
            <div onClick={this.runCalc} className='ui fluid button positive'>Run Calculations <i class="calculator icon   "></i></div>
          </div>

          </React.Fragment>

      )

  }

  planList = []

  addPlan(e){
    var plan_id = e.target.value

    if(this.planList.includes(plan_id)){
      console.log(plan_id)
      var index = this.planList.indexOf(plan_id)

      this.planList.splice(index,1)
    }
    else{
      this.planList.push(plan_id)
    }

  }



  renderPlanList(){
    return (this.props.plans.map((plan)=> {
      return(
        this.renderPlanItem(plan)

      )
    })
  )
  }

  renderPlanItem(plan){

    return(
      <React.Fragment>
      <div className='three wide column'></div>
      <div className='ten wide column'>
        <div className="ui toggle checkbox">
          <input value={plan[0]} onClick={(e) => e.stopPropagation(this.addPlan(e))} type="checkbox" name={plan[0]}/>
          <label>{plan[1]}</label>
        </div>
      </div>
      <div className='three wide column'></div>
      </React.Fragment>
    )
  }



  render(){

    if(!this.props.month['current.year_id']){
      return(
        <Loader filler='loading...'/>
      )
    }
    else{

      if(this.props.calc == 'Running'){
        return (
          <Loader filler="Calculations Running - Please check back later..."/>)
        }
      else if(this.props.account['role'] == 'admin' && this.props.errors !='goal'){
        return(
        <div className='ui container '>
          <div className='ui grid'>
            <div class='sixteen wide column'></div>
            <div class='sixteen wide column'></div>
          <div class='sixteen wide column'>
            <div className='ui center aligned grid'>
              <h1 className=''>
              Run Calculations

              </h1>
            </div>
          </div>
          <div class='sixteen wide column'></div>
          <div class='five wide column'></div>
          <div class='six wide column'>

              <div onClick={this.runAllCalc} className='ui fluid button blue'>Run All Plans </div>

          </div>

          <div class='five wide column'></div>
            <div class='sixteen wide column'><div class="ui horizontal divider">
            *
            </div></div>
            <div class='sixteen wide column'></div>
            <div className='five wide column'></div>
            <div className='six wide column ui placeholder segment'>

            <h4>
              Select which plans to run calculations on:
              </h4>

              <div className='ui grid'>

              {this.renderPlanList()}
              {this.renderCalcButton()}
              </div>

            </div>
            <div className='five wide column'></div>

          </div>
        </div>
      )

      }
      else if(this.props.errors == "goal") {

        return<Modal  onDismiss={() => this.props.clearError()} title="Calculation Error" content="Please ensure all users on a plan with goal_use set to 'Yes' have a goal for the corresponding attainment rule and period"/>

      }

      else if(typeof(this.props.account['role']) != "undefined"){
        return "You do not have sufficient permissions to access this page"
      }
      else{
        return <Login/>
      }
    }


  }
}

const mapStateToProps = (state) => {
  return {
    month: state.month.month,
    account:state.account.account,
    payroll: state.payouts.payroll,
    selected_month: state.account.selected_month,
    calc: state.calc.calc,
    users: state.users.users,
    plans:state.plans.plans,
    errors: state.errors.errors
  }
}

export default connect(mapStateToProps, {getTime,updateTime,revertTime,getPayroll,selectMonth,getUsers,castUser,checkCalcStatus,calcPlans,loadCalcs,getPlans,clearError })(RunCalcs)
