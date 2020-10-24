import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import UserCreate from './UserCreate'
import PlanShow from './PlanShow'
import PlanCreate from './PlanCreate'
import UserShow from './UserShow'
import AttainRuleShow from './AttainRuleShow'
import Landing from './Landing'
import AttainRuleCreate from './AttainRuleCreate'
import TransShow from './TransShow'
import Header from './Header'
import Calc from './Calc'
import history from '../history'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className='container'>
        <Header />
        <div className='container2'>
          <Switch>
            <Route path ='/' exact component={Landing}/>
            <Route path ='/attainRuleCreate' exact component={AttainRuleCreate}/>
            <Route path='/planCreate' exact component={PlanCreate}/>
            <Route path ='/attainRuleShow' exact component={AttainRuleShow}/>
            <Route path ='/planShow' exact component={PlanShow}/>
            <Route path='/userCreate' exact component={UserCreate} />
            <Route path='/userShow' exact component={UserShow}/>
            <Route path='/calc' exact component={Calc}/>
            <Route path='/transShow' exact component={TransShow}/>
          </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}





export default App;
