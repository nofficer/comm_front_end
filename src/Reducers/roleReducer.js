import {
GET_ROLE_HIERARCHY,CREATE_ROLE_HIERARCHY,EDIT_ROLE_HIERARCHY,DELETE_ROLE_HIERARCHY,GET_ROLE_HIERARCHIES
} from '../actions/types'

const INITIAL_STATE = {
  roles: [],
  role: {}
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_ROLE_HIERARCHY:
      return {...state, role: action.payload}
    case CREATE_ROLE_HIERARCHY:
      return {...state, roles: action.payload}
    case EDIT_ROLE_HIERARCHY:
      return {...state, roles: action.payload}
    case DELETE_ROLE_HIERARCHY:
      return {...state, roles: action.payload}
    case GET_ROLE_HIERARCHIES:
      return {...state, roles: action.payload}
    default:
      return state
  }
}

export default fn;
