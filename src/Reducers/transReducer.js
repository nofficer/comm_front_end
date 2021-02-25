import {
  CREATE_TRANS, GET_TRANS,GET_TRAN,DELETE_TRANS,EDIT_TRANS,CLEAR_TRANS,GET_AUTO_TRANS
} from '../actions/types'

const INITIAL_STATE = {
  trans : []
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_AUTO_TRANS:
      return{...state,redirect_link:action.payload};
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

export default fn;
