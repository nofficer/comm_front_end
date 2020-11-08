import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import UserCreate from './UserCreate'
import PlanShow from './PlanShow'
import PlanCreate from './PlanCreate'
import UserShow from './UserShow'
import AttainRuleShow from './AttainRuleShow'
import ImportTrans from './ImportTrans'
import AttainRuleCreate from './AttainRuleCreate'
import TransShow from './TransShow'
import TransEdit from './TransEdit'
import AttainRuleEdit from './AttainRuleEdit'
import Landing from './Landing'
import PlanEdit from './PlanEdit'
import TransCreate from './TransCreate'
import UserEdit from './UserEdit'
import Header from './Header'
import Calc from './Calc'
import history from '../history'
import Example from './myhook'
import PlanDelete from './PlanDelete'
import AttainRuleDelete from './AttainRuleDelete'
import TransDelete from './TransDelete'
import ImportError from './ImportError'
import UserDelete from './UserDelete'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className='container'>
        <Header />
        <div className='container2'>
          <Switch>
            <Route path ='/' exact component={Landing}/>
            <Route path ='/ImportError' exact component={ImportError}/>
            <Route path ='/ImportTrans' exact component={ImportTrans}/>
            <Route path ='/attainRuleCreate' exact component={AttainRuleCreate}/>
            <Route path='/planCreate' exact component={PlanCreate}/>
            <Route path ='/attainRuleShow' exact component={AttainRuleShow}/>
            <Route path ='/planShow' exact component={PlanShow}/>
            <Route path='/userCreate' exact component={UserCreate} />
            <Route path='/userShow' exact component={UserShow}/>
            <Route path='/userShow/delete/:user_id' exact component={UserDelete}/>
            <Route path='/calc' exact component={Calc}/>
            <Route path='/transShow' exact component={TransShow}/>
            <Route path='/transCreate' exact component={TransCreate}/>
            <Route path='/transShow/edit/:trans_id' exact component={TransEdit}/>
            <Route path='/userShow/edit/:user_id' exact component={UserEdit}/>
            <Route path='/attainRuleShow/edit/:rule_id' exact component ={AttainRuleEdit}/>
            <Route path='/planShow/edit/:plan_id' exact component ={PlanEdit}/>
            <Route path='/planShow/delete/:plan_id' exact component ={PlanDelete}/>
            <Route path='/attainRuleShow/delete/:rule_id' exact component ={AttainRuleDelete}/>
            <Route path='/TransShow/delete/:trans_id' exact component = {TransDelete}/>

          </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}





export default App;
