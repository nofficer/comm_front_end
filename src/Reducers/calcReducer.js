

import {
  CREATE_CALC, CHANGE_DONE,CALC_PLANS
} from '../actions/types'

const INITIAL_STATE = {
  calc : "Not_Done"
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_CALC:
      return {...state, calc: action.payload};
    case CHANGE_DONE:
      return{...state, calc: action.payload};
    default:
      return state
  }
}
