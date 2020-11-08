import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import planReducer from './planReducer'
import userReducer from './userReducer'
import calcReducer from './calcReducer'
import transReducer from './transReducer'
import attainRuleReducer from './attainRuleReducer'
import fileReducer from './fileReducer'


export default combineReducers ({
  form: formReducer,
  plans: planReducer,
  users: userReducer,
  calc: calcReducer,
  attainmentRules: attainRuleReducer,
  trans: transReducer,
  file: fileReducer
})
