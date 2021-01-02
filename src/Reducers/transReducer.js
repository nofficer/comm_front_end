import {
  CREATE_TRANS, GET_TRANS,GET_TRAN,DELETE_TRANS,EDIT_TRANS,CLEAR_TRANS
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
    case GET_TRAN:
      return{...state,tran:action.payload}
    case EDIT_TRANS:
      return{...state,trans:action.payload}
    case DELETE_TRANS:
      return{...state,trans:action.payload}
    case CLEAR_TRANS:
      return{...state,trans:action.payload}
    default:
      return state
  }
}
