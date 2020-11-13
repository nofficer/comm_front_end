import {
  GET_RATE_TABLE,GET_RATE_TABLES,GET_RATE_TABLES_PLANS,CREATE_RATE_TABLE,EDIT_RATE_TABLE,DELETE_RATE_TABLE
} from '../actions/types'

const INITIAL_STATE = {
  rateTables: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_RATE_TABLE:
      return {...state, rateTables: action.payload}
    case GET_RATE_TABLES:
      return {...state, rateTables: action.payload}
    case GET_RATE_TABLES_PLANS:
      return {...state, rateTables: action.payload}
    case EDIT_RATE_TABLE:
      return {...state, rateTables: action.payload}
    case CREATE_RATE_TABLE:
      return {...state, rateTables: action.payload}
    case DELETE_RATE_TABLE:
      return {...state, rateTables: action.payload}
    default:
      return state
  }
}
