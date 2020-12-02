import {
  GET_TIME,UPDATE_TIME,REVERT_TIME
} from '../actions/types'

const INITIAL_STATE = {
  month: 0
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_TIME:
      return {...state, month: action.payload};
    case UPDATE_TIME:
      return {...state, month: action.payload};
    case REVERT_TIME:
      return {...state, month: action.payload};

    default:
      return state
  }
}
