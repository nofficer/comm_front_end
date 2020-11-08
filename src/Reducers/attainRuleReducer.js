import {
  GET_ATTAINMENT_RULES, CREATE_ATTAINMENT_RULE,EDIT_ATTAINMENT_RULE,DELETE_ATTAINMENT_RULE,GET_ATTAINMENT_RULE
} from '../actions/types'

const INITIAL_STATE = {
  attainmentRules: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_ATTAINMENT_RULES:
      return {...state, attainmentRules: action.payload};
    case GET_ATTAINMENT_RULE:
      return {...state, attainmentRules: action.payload};
    case CREATE_ATTAINMENT_RULE:
      return {...state, attainmentRules: action.payload};
    case DELETE_ATTAINMENT_RULE:
      return {...state,attainmentRules:action.payload};
    case EDIT_ATTAINMENT_RULE:
      return {...state, attainmentRules:action.payload}
    default:
      return state
  }
}
