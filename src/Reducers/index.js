import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import planReducer from './planReducer'
import userReducer from './userReducer'
import calcReducer from './calcReducer'



export default combineReducers ({
  form: formReducer,
  plans: planReducer,
  users: userReducer,
  calc: calcReducer
})
