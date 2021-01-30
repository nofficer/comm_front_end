

import {
  CREATE_CALC, CHANGE_DONE,CALC_PLANS,CALC_STATUS,LOAD
} from '../actions/types'

const INITIAL_STATE = {
  calc : "Done",
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_CALC:
      return {...state, calc: action.payload};
    case CHANGE_DONE:
      return{...state, calc: action.payload};
    case CALC_STATUS:
      return{...state, calc:action.payload}
    case CALC_PLANS:
      return{...state, calc:'Done'}
    case LOAD:
      return {...state, calc:'Running'}


    default:
      return state
  }
}
