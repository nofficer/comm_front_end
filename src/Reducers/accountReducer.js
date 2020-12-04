

import {
  LOGIN,LOGOUT,SET_ACCOUNT,SELECT_MONTH
} from '../actions/types'

const INITIAL_STATE = {
  account: 'none',
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
    default:
      return state
  }
}
