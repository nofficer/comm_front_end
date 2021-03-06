import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'

import '../App.css';
import UserCreate from './UserCreate'
import PlanShow from './PlanShow'
import PlanCreate from './PlanCreate'
import UserShow from './UserShow'
import AttainRuleShow from './AttainRuleShow'
import Import from './Import'
import AttainRuleCreate from './AttainRuleCreate'
import TransShow from './TransShow'
import TransEdit from './TransEdit'
import AttainRuleEdit from './AttainRuleEdit'
import Landing from './Landing'
import PlanEdit from './PlanEdit'
import TransCreate from './TransCreate'
import UserEdit from './UserEdit'
import Header from './Header'

import history from '../history'

import PlanDelete from './PlanDelete'
import AttainRuleDelete from './AttainRuleDelete'
import TransDelete from './TransDelete'
import ImportError from './ImportError'
import ImportSuccess from './ImportSuccess'
import UserDelete from './UserDelete'
import RateTableShow from './Rate_Tables/RateTableShow'
import RateTableCreate from './Rate_Tables/RateTableCreate'
import RateTableEdit from './Rate_Tables/RateTableEdit'
import RateTableDelete from './Rate_Tables/RateTableDelete'
import Report from './Accounts/Report'
import PayoutShow from './Calc/PayoutShow'
import PayoutEdit from './Calc/PayoutEdit'
import Time from './Time/Time'
import PayoutHistoryShow from './Calc/PayoutHistoryShow'
import RunCalcs from './Calc/RunCalcs'
import AreYouSure from './Time/AreYouSure'

import GoalShow from './Goals/GoalShow'
import GoalCreate from './Goals/GoalCreate'
import GoalEdit from './Goals/GoalEdit'
import GoalDelete from './Goals/GoalDelete'

import Login from './Accounts/Login'

import PasswordChange from './Accounts/PasswordChange'
import PasswordError from './PasswordError'

import LiabilityShow from './Liability/LiabilityShow'
import LiabilityEdit from './Liability/LiabilityEdit'
import LiabilityDelete from './Liability/LiabilityDelete'

import QBOcb from './Utils/QBOcb'
import QBOLoadTrans from './Utils/QBOLoadTrans'

import RoleHierarchyShow from './Role_Hierarchy/RoleHierarchyShow'
import RoleHierarchyCreate from './Role_Hierarchy/RoleHierarchyCreate'
import RoleHierarchyEdit from './Role_Hierarchy/RoleHierarchyEdit'
import RoleHierarchyDelete from './Role_Hierarchy/RoleHierarchyDelete'

import Savings from './demo_tools/Savings'

import Forecast from './Plan/Forecast'


const App = () => {

  return (
    <div>

      <Router history={history}>
        <div>
        <Header />
        <div>
          <Switch>
            <Route path ='/' exact component={Landing}/>
            <Route path='/Savings' exact component={Savings}/>
            <Route path='/Forecast' exact component={Forecast}/>

            <Route path ='/QBOcb' exact component={QBOcb}/>
            <Route path ='/QBOLoadTrans' exact component={QBOLoadTrans}/>

            <Route path ='/admin' exact component={Time}/>
            <Route path ='/liabilityShow' exact component={LiabilityShow}/>
            <Route path ='/liabilityShow/edit/:liability_id' exact component={LiabilityEdit}/>
            <Route path ='/liabilityShow/delete/:liability_id' exact component={LiabilityDelete}/>

            <Route path ='/rateTableShow' exact component={RateTableShow}/>
            <Route path ='/rateTableCreate' exact component={RateTableCreate}/>
            <Route path ='/rateTableShow/edit/:rate_id' exact component={RateTableEdit}/>
            <Route path ='/rateTableShow/delete/:rate_id' exact component={RateTableDelete}/>

            <Route path ='/RoleHierarchyShow' exact component={RoleHierarchyShow}/>
            <Route path ='/RoleHierarchyCreate' exact component={RoleHierarchyCreate}/>
            <Route path ='/RoleHierarchyShow/edit/:user_id' exact component={RoleHierarchyEdit}/>
            <Route path ='/RoleHierarchyShow/delete/:user_id' exact component={RoleHierarchyDelete}/>


            <Route path ='/importError' exact component={ImportError}/>
            <Route path ='/importSuccess' exact component={ImportSuccess}/>
            <Route path ='/import' exact component={Import}/>
            <Route path ='/attainRuleCreate' exact component={AttainRuleCreate}/>
            <Route path='/planCreate' exact component={PlanCreate}/>
            <Route path ='/attainRuleShow' exact component={AttainRuleShow}/>
            <Route path ='/planShow' exact component={PlanShow}/>
            <Route path='/userCreate' exact component={UserCreate} />
            <Route path='/userShow' exact component={UserShow}/>
            <Route path='/userShow/delete/:user_id' exact component={UserDelete}/>

            <Route path='/transShow' exact component={TransShow}/>
            <Route path='/transCreate' exact component={TransCreate}/>
            <Route path='/transShow/edit/:trans_id' exact component={TransEdit}/>
            <Route path='/userShow/edit/:user_id' exact component={UserEdit}/>
            <Route path='/attainRuleShow/edit/:rule_id' exact component ={AttainRuleEdit}/>
            <Route path='/planShow/edit/:plan_id' exact component ={PlanEdit}/>
            <Route path='/planShow/delete/:plan_id' exact component ={PlanDelete}/>
            <Route path='/attainRuleShow/delete/:rule_id' exact component ={AttainRuleDelete}/>
            <Route path='/transShow/delete/:trans_id' exact component = {TransDelete}/>
            <Route path='/runCalcs' exact component = {RunCalcs}/>
            <Route path='/payoutShow' exact component = {PayoutShow}/>
            <Route path='/payoutShow/edit/:payout_id' exact component = {PayoutEdit}/>
            <Route path='/payoutHistoryShow' exact component = {PayoutHistoryShow}/>
            <Route path ='/areyousure' exact component={AreYouSure}/>
            <Route path ='/login' exact component={Login}/>
            <Route path ='/report' exact component={Report}/>
            <Route path ='/passwordchange' exact component={PasswordChange}/>
            <Route path ='/passwordError' exact component={PasswordError}/>
            <Route path ='/goalShow' exact component={GoalShow}/>
            <Route path ='/goalCreate' exact component={GoalCreate}/>
            <Route path ='/goalShow/edit/:goal_id' exact component={GoalEdit}/>
            <Route path ='/goalShow/delete/:goal_id' exact component={GoalDelete}/>
          </Switch>
          </div>
        </div>
      </Router>

    </div>
  );
}





export default App;
