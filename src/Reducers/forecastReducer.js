import {
INPUT_FORECAST,GET_FORECAST
} from '../actions/types'

const INITIAL_STATE = {
  forecast:[]
}

const fn = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case INPUT_FORECAST:
      return {...state}
    case GET_FORECAST:
      return {...state, forecast:action.payload}
    default:
      return state


  }
}
//user_id:1,username:"Nathan.officer@cdw.ca",role:"admin"

export default fn;
