

import {
  LOGIN,LOGOUT,SET_ACCOUNT,SELECT_MONTH,UPDATE_ACCOUNT,CHECK_USER
} from '../actions/types'

const INITIAL_STATE = {
  account: {},
  selected_month: ''
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN:
      return {...state, account: action.payload};
    case SET_ACCOUNT:
      return{...state,account:action.payload}
    case LOGOUT:
      return {...state, account: "none"};
    case SELECT_MONTH:
      return {...state, selected_month:action.payload}
    case UPDATE_ACCOUNT:
      return {...state};
    case CHECK_USER:
      return {...state, account:action.payload};
    default:
      return state
  }
}
//user_id:1,username:"Nathan.officer@cdw.ca",role:"admin"
