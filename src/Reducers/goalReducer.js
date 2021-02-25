import {
  GET_GOAL,GET_GOALS,CREATE_GOAL,EDIT_GOAL,DELETE_GOAL
} from '../actions/types'

const INITIAL_STATE = {
  goals: [],
  goal: {}
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_GOAL:
      return {...state, goal: action.payload}
    case GET_GOALS:
      return {...state, goals: action.payload}
    case EDIT_GOAL:
      return {...state, goals: action.payload}
    case CREATE_GOAL:
      return {...state, goals: action.payload}
    case DELETE_GOAL:
      return {...state, goals: action.payload}
    default:
      return state
  }
}

export default fn;
