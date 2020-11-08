import {
  UPLOAD_FILE
} from '../actions/types'

const INITIAL_STATE = {
  file : []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case UPLOAD_FILE:
      return {...state, file: action.payload};

    default:
      return state
  }
}
