import {
  GET_PAYOUTS,DELETE_PAYOUT,EDIT_PAYOUT,GET_PAYOUT,CALC_PLANS,LOAD,GET_PAYOUTS_USER,GET_PAYROLL
} from '../actions/types'

const INITIAL_STATE = {
  payouts: [],
  summary: [],
  payout: {},
  payroll: []
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
    case LOAD:
      return {...state, calcs:'Running'}
    case CALC_PLANS:
      return{...state, payouts: action.payload,calcs: 'Done'}
    case GET_PAYOUTS_USER:
      return{...state,summary: action.payload}
    case GET_PAYROLL:
      return{...state,payroll:action.payload}
    default:
      return state
  }
}
