

import {
  LOGIN,LOGOUT,SET_ACCOUNT,SELECT_MONTH,UPDATE_ACCOUNT,CHECK_USER,CAST_USER,SELECT_YEAR
} from '../actions/types'

const INITIAL_STATE = {
  account: {},
  selected_month: '',
  selected_year: ''
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN:
      return {...state, account: action.payload};
    case SET_ACCOUNT:
      return{...state,account:action.payload}
    case LOGOUT:
      return {...state, account: "none"};
    case SELECT_MONTH:
      return {...state, selected_month:action.payload}
    case SELECT_YEAR:
      return {...state, selected_year:action.payload}
    case UPDATE_ACCOUNT:
      return {...state};
    case CHECK_USER:
      return {...state, account:action.payload};
    case CAST_USER:
      return {...state, account:action.payload}
    default:
      return state
  }
}
//user_id:1,username:"Nathan.officer@cdw.ca",role:"admin"

export default fn;
