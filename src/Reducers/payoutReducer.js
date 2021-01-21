import {
  GET_PAYOUTS,DELETE_PAYOUT,EDIT_PAYOUT,GET_PAYOUT,CALC_PLANS,LOAD,GET_PAYOUTS_USER,GET_PAYROLL,GET_LIABILITY,GET_LIABILITIES,EDIT_LIABILITY,DELETE_LIABILITY
} from '../actions/types'

const INITIAL_STATE = {
  payouts: [],
  summary: [],
  payout: {},
  payroll: [],
  liability: {},
  liabilities: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_PAYOUTS:
      return {...state, payouts: action.payload}
    case DELETE_PAYOUT:
      return {...state, payouts: action.payload}
    case EDIT_PAYOUT:
      return {...state, payouts: action.payload}
    case GET_PAYOUT:
      return {...state, payout: action.payload}

    case CALC_PLANS:
      return{...state, payouts: action.payload}
    case GET_PAYOUTS_USER:
      return{...state,summary: action.payload}
    case GET_PAYROLL:
      return{...state,payroll:action.payload}
    case GET_LIABILITY:
      return {...state, liability:action.payload}
    case GET_LIABILITIES:
      return{...state, liabilities: action.payload}
    case EDIT_LIABILITY:
      return{...state, liabilities: action.payload}
    case DELETE_LIABILITY:
      return{...state, liabilities: action.payload}
    default:
      return state
  }
}
