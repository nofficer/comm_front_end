import {
  SET_FILTER,GET_FILTER,CLEAR_FILTER
} from '../actions/types'

const INITIAL_STATE = {
  filter:{}
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_FILTER:
    
    if(action.payload[1].length > 0){
      state.filter[action.payload[0]] = action.payload[1]
    }
    else{
      delete state.filter[action.payload[0]]
    }
      return {...state};
    case GET_FILTER:
      return {...state}
    case CLEAR_FILTER:
      return {filter:{}}
    default:
      return state


  }
}
//user_id:1,username:"Nathan.officer@cdw.ca",role:"admin"

export default fn;
