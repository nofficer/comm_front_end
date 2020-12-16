import {
  GET_USERS,CREATE_USER,DELETE_USER,EDIT_USER,GET_USER,GET_ROLE_HIERARCHY,CREATE_ROLE_HIERARCHY,EDIT_ROLE_HIERARCHY,DELETE_ROLE_HIERARCHY,GET_ROLE_HIERARCHIES
} from '../actions/types'

const INITIAL_STATE = {
  users: [],
  user:{},
  role_hierarchy: {},
  role_hierarchies: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_USERS:
      return {...state, users: action.payload};
    case CREATE_USER:
      return {...state, users: action.payload};
    case EDIT_USER:
      return{...state,users:action.payload}
    case DELETE_USER:
      return {...state, users:action.payload};
    case GET_USER:
      return {...state, user:action.payload};
    case GET_ROLE_HIERARCHY:
      return {...state, role_hierarchy:action.payload};
    case GET_ROLE_HIERARCHIES:
      return {...state, role_hierarchies:action.payload};
    case EDIT_ROLE_HIERARCHY:
      return {...state, role_hierarchies:action.payload};
    case DELETE_ROLE_HIERARCHY:
      return {...state, role_hierarchies:action.payload};
    case CREATE_ROLE_HIERARCHY:
      return {...state, role_hierarchies:action.payload};
    default:
      return state
  }
}
