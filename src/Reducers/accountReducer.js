

import {
  LOGIN,LOGOUT,SET_ACCOUNT
} from '../actions/types'

const INITIAL_STATE = {
  account: 'none'
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN:
      return {...state, account: action.payload};
    case SET_ACCOUNT:
      return{...state,account:action.payload}
    case LOGOUT:
      return {...state, account: "none"};
    default:
      return state
  }
}
