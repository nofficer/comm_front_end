import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import UserCreate from './UserCreate'
import PlanShow from './PlanShow'
import UserShow from './UserShow'
import Calc from './Calc'
import history from '../history'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className='container'>
        <div className='container2'>
          <Switch>
            <Route path ='/' exact component={PlanShow}/>
            <Route path='/userCreate' exact component={UserCreate} />
            <Route path='/userShow' exact component={UserShow}/>
            <Route path='/calc' exact component={Calc}/>
          </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}





export default App;
