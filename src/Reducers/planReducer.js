import {
  GET_PLANS, CREATE_PLAN
} from '../actions/types'

const INITIAL_STATE = {
  plans: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_PLANS:
      return {...state, plans: action.payload};
      case CREATE_PLAN:
      return {...state, plans: action.payload}
    default:
      return state
  }
}
