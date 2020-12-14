import {
  UPLOAD_FILE,LOADING
} from '../actions/types'

const INITIAL_STATE = {
  file : [],
  loading: "Done"
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case UPLOAD_FILE:
      return {...state, file: action.payload,loading:'Done'};
    case LOADING:
      return {...state,loading:action.payload}

    default:
      return state
  }
}
