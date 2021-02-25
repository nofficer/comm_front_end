import {
  GET_PAYOUTS,DELETE_PAYOUT,EDIT_PAYOUT,GET_PAYOUT,CALC_PLANS,GET_PAYOUTS_USER,GET_PAYROLL,GET_LIABILITY,GET_LIABILITIES,EDIT_LIABILITY,DELETE_LIABILITY,GET_PAYOUTS_SHOW,GET_PAYOUTS_HISTORY_SHOW
} from '../actions/types'

const INITIAL_STATE = {
  payouts: [],
  summary: [],
  payout: {},
  payroll: [],
  liability: {},
  liabilities: [],
  payouts_show:[],
  payouts_history_show: []
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_PAYOUTS_HISTORY_SHOW:
      return {...state,payouts_history_show:action.payload}
    case GET_PAYOUTS_SHOW:
      return {...state,payouts_show:action.payload}
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

export default fn;
