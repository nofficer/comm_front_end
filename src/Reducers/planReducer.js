import {
  GET_PLANS, CREATE_PLAN,EDIT_PLAN, DELETE_PLAN, GET_PLAN
} from '../actions/types'

const INITIAL_STATE = {
  plans: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_PLANS:
      return {...state, plans: action.payload};
      case GET_PLAN:
        return {...state, plan: action.payload};
      case CREATE_PLAN:
      return {...state, plans: action.payload}
      case EDIT_PLAN:
        return {...state,plans:action.payload}
      case DELETE_PLAN:
        return {...state, plans:action.payload}
    default:
      return state
  }
}
