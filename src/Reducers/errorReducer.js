import {
CALC_PLANS,CLEAR
} from '../actions/types'

const INITIAL_STATE = {
  errors: 'None'
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CLEAR:
      return{...state,errors:"None",payouts:[]}
    case CALC_PLANS:
      return{...state, errors:action.payload}
    default:
      return state
  }
}
