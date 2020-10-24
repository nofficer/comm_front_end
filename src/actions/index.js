import { GET_PLANS, GET_USERS, CREATE_USER, CREATE_CALC, CHANGE_DONE, GO_PUSH, CREATE_PLAN, GET_ATTAINMENT_RULES, CREATE_ATTAINMENT_RULE, GET_TRANS } from './types'
import db from '../apis/db'
import history from '../history'

export const getTrans = () => {
  return async (dispatch) => {
    const response = await db.get('/getTrans')
    dispatch({type:GET_TRANS, payload: response.data})
  }
}

export const createAttainRule = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/insertAttainmentRule',formValues)
    dispatch({type:CREATE_ATTAINMENT_RULE, payload: response.data})
    history.push('/attainRuleShow')
  }
}


export const createPlan = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/insertPlan',formValues)
    dispatch({type:CREATE_PLAN, payload: response.data})
    history.push('/planShow')
  }
}

export const getPlans = () => {

  return async (dispatch) => {
    const response = await db.get('/getPlans')
    dispatch({type:GET_PLANS, payload: response.data})
  }
}

export const getAttainmentRules = () => {

  return async (dispatch) => {
    const response = await db.get('/getAttainmentRules')
    dispatch({type:GET_ATTAINMENT_RULES, payload: response.data})
  }
}

export const getUsers = () => {

  return async (dispatch) => {
    const response = await db.get('/getUsers')
    dispatch({type:GET_USERS, payload: response.data})
  }
}

export const createUser = (formValues) => {

  return async (dispatch) => {
    const response = await db.post('/insertUser',formValues)

    dispatch({type:CREATE_USER, payload: response.data})
    history.push('/userShow')
  }
}

export const createCalc = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/calc', formValues)

    dispatch({type:CREATE_CALC, payload: response.data})
  }
}

export const changeDone = () => {
  return {type:CHANGE_DONE, payload: "Not Done"}
}




// export const makeMove = (move) => {
//     return async (dispatch) => {
//       const response = await chess.post('/board/move', move)
//       dispatch({type:PLAYER_MOVE, payload: response.data})
//     }
//   }
//
// export const changeSide = (side) => {
//   return ({type:CHANGE_SIDE, payload: side})
// }
//
//
// export const getBoard = () => {
//   return async (dispatch) => {
//     const response = await chess.get('/board')
//     dispatch({type:BOARD, payload: response.data})
//   }}
//
// export const botMove = (boardfen) => {
//   return async (dispatch) => {
//     const response = await chess.post('/bot_move', boardfen)
//     dispatch({type:BOT_MOVE, payload: response.data})
//   }
// }
//
// export const makeTurn = (turn) => {
//   return ({type: TURN, payload: turn})
// }
