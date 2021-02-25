import {
CALC_PLANS,CLEAR,CREATE_USER,CREATE_TRANS,CREATE_GOAL,CREATE_RATE_TABLE,UPLOAD_FILE
} from '../actions/types'

const INITIAL_STATE = {
  errors: 'None'
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CLEAR:
      return{...state,errors:"None",payouts:[]}
    case CALC_PLANS:
      return{...state, errors:action.payload}
    case CREATE_USER:
      return{...state,errors:action.payload}
    case CREATE_TRANS:
      return{...state,errors:action.payload}
    case CREATE_GOAL:
      return{...state,errors:action.payload}
    case CREATE_RATE_TABLE:
      return{...state,errors:action.payload}
    case UPLOAD_FILE:
      return {...state, errors:action.payload}
    default:
      return state
  }
}

export default fn;
