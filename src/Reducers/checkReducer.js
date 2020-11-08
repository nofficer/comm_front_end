import {
  CHECK_PLAN_USE,CHECK_RULE_USE,CHECK_USER_USE
} from '../actions/types'

const INITIAL_STATE = {
  check: "Clear"
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CHECK_PLAN_USE:
      return {...state, check: action.payload};
    case CHECK_RULE_USE:
      return {...state, check: action.payload};
    case CHECK_USER_USE:
      return {...state, check: action.payload}
    default:
      return state
  }
}
