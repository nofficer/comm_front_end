import {
  CREATE_TRANS, GET_TRANS
} from '../actions/types'

const INITIAL_STATE = {
  trans : []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_TRANS:
      return {...state, trans: action.payload};
    case GET_TRANS:
      return{...state, trans: action.payload}
    default:
      return state
  }
}
