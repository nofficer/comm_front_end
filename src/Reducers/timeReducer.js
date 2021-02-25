import {
  GET_TIME,UPDATE_TIME,REVERT_TIME,UPDATE_FYE,GET_YEARS,GET_SUMMARY_DATA,GET_PLAN_SUMMARY,GET_TOP_EARNERS
} from '../actions/types'

const INITIAL_STATE = {
  month: 0,
  years: [],
  summary_data: [],
  plan_summary: {},
  top_earners:[]
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_TOP_EARNERS:
      return{...state,top_earners:action.payload}
    case GET_PLAN_SUMMARY:
      return {...state,plan_summary: action.payload}
    case GET_SUMMARY_DATA:
      return {...state,summary_data: action.payload}
    case GET_YEARS:
      return {...state, years:action.payload}
    case GET_TIME:
      return {...state, month: action.payload};
    case UPDATE_TIME:
      return {...state, month: action.payload};
    case REVERT_TIME:
      return {...state, month: action.payload};
    case UPDATE_FYE:
      return {...state, month: action.payload};
    default:
      return state
  }
}

export default fn;
