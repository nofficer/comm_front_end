import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import planReducer from './planReducer'
import userReducer from './userReducer'
import calcReducer from './calcReducer'
import transReducer from './transReducer'
import attainRuleReducer from './attainRuleReducer'
import fileReducer from './fileReducer'
import checkReducer from './checkReducer'
import rateTableReducer from './rateTableReducer'
import payoutReducer from './payoutReducer'
import timeReducer from './timeReducer'
import accountReducer from './accountReducer'
import goalReducer from './goalReducer'
import errorReducer from './errorReducer'
import filterReducer from './filterReducer'
import roleReducer from './roleReducer'


export default combineReducers ({
  form: formReducer,
  plans: planReducer,
  users: userReducer,
  calc: calcReducer,
  attainmentRules: attainRuleReducer,
  trans: transReducer,
  file: fileReducer,
  check: checkReducer,
  rateTables: rateTableReducer,
  payouts: payoutReducer,
  month: timeReducer,
  account: accountReducer,
  goals: goalReducer,
  errors: errorReducer,
  filter:filterReducer,
  roles: roleReducer,

})
