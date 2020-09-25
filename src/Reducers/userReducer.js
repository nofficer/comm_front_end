import {
  GET_USERS,CREATE_USER
} from '../actions/types'

const INITIAL_STATE = {
  users: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_USERS:
      return {...state, users: action.payload};
    case CREATE_USER:
    return {...state, users: action.payload}
    default:
      return state
  }
}
