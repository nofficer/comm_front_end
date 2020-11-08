import { GET_PLANS, GET_USERS,  GET_USER, CREATE_USER, EDIT_USER, CREATE_CALC, CHANGE_DONE, GO_PUSH, CREATE_PLAN, EDIT_PLAN, GET_ATTAINMENT_RULES, CREATE_ATTAINMENT_RULE, EDIT_ATTAINMENT_RULE, GET_TRANS, CREATE_TRANS, EDIT_TRANS, GET_TRAN, DELETE_TRANS, DELETE_ATTAINMENT_RULE,DELETE_PLAN,DELETE_USER,GET_ATTAINMENT_RULE,GET_PLAN,UPLOAD_FILE,ONCHANGE_FILE } from './types'
import db from '../apis/db'
import history from '../history'

export const uploadFile = (data) => {
  return async (dispatch) => {
    const response = await db.post('/import_file',data)
    dispatch({type:UPLOAD_FILE, payload:response.data})
    history.push('/TransShow')
  }

}

export const onChangeFile = () => {

}


export const getUser = (user_id) => {
  return async (dispatch) => {
    const response = await db.post('/getUser',user_id)
    dispatch({type:GET_USER, payload: response.data})
  }
}

export const editUser = (formValues,user_id) => {
  return async (dispatch) => {
    const response = await db.post('/updateUser',formValues,user_id)
    dispatch({type:EDIT_USER, payload: response.data})
    history.push('/UserShow')
  }
}



export const deleteTrans = (trans_id) => {
  return async (dispatch) => {
    const response = await db.post('/deleteTrans', trans_id)
    dispatch({type:DELETE_TRANS, payload: response.data})
    history.push('/TransShow')
  }
}

export const getTran = (trans_id) => {
  return async (dispatch) => {
    const response = await db.post('/getTran',trans_id)
    dispatch({type:GET_TRAN, payload: response.data})
  }
}

export const getTrans = () => {
  return async (dispatch) => {
    const response = await db.get('/getTrans')
    dispatch({type:GET_TRANS, payload: response.data})
  }
}

export const createTrans = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/insertTrans', formValues)
    dispatch({type:CREATE_TRANS, payload: response.data})
    history.push('/TransShow')
  }
}

export const editTrans = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/updateTrans',formValues)
    dispatch({type:EDIT_TRANS, payload: response.data})
    history.push('/TransShow')
  }
}

export const createAttainRule = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/insertAttainmentRule',formValues)
    dispatch({type:CREATE_ATTAINMENT_RULE, payload: response.data})
    history.push('/attainRuleShow')
  }
}

export const getAttainmentRule =(rule_id) => {
  return async(dispatch) => {
    const response = await db.post('/getAttainmentRule',rule_id)
    dispatch({type:GET_ATTAINMENT_RULE, payload: response.data})

  }
}

export const editAttainmentRule = (formValues,rule_id) => {
  return async (dispatch) => {
    const response = await db.post('/updateAttainmentRule',formValues,rule_id)
    dispatch({type:EDIT_ATTAINMENT_RULE, payload:response.data})
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

export const deletePlan = (plan_id) => {
  return async (dispatch) => {
    const response = await db.post('/deletePlan', plan_id)
    dispatch({type:DELETE_PLAN, payload: response.data})
    history.push('/planShow')
  }
}

export const getPlans = () => {

  return async (dispatch) => {
    const response = await db.get('/getPlans')
    dispatch({type:GET_PLANS, payload: response.data})
  }
}

export const getPlan = (plan_id) => {
  return async (dispatch) => {
    const response = await db.post('/getPlan',plan_id)
    dispatch({type:GET_PLAN, payload: response.data})
  }
}

export const editPlan = (formValues,plan_id) => {
  return async (dispatch) => {
    const response = await db.post('/updatePlan', formValues,plan_id)
    dispatch({type:EDIT_PLAN, payload: response.data})
    history.push('/planShow')
  }
}

export const deleteAttainmentRule = (rule_id) => {
  return async (dispatch) => {
    const response = await db.post('/deleteAttainmentRule', rule_id)
    dispatch({type:DELETE_ATTAINMENT_RULE, payload: response.data})
    history.push('/attainRuleShow')
  }
}


export const getAttainmentRules = () => {

  return async (dispatch) => {
    const response = await db.get('/getAttainmentRules')
    dispatch({type:GET_ATTAINMENT_RULES, payload: response.data})
  }
}

export const deleteUser = (user_id) => {
  return async (dispatch) => {
    const response = await db.post('/deleteUser', user_id)
    dispatch({type:DELETE_USER, payload: response.data})
    history.push('/UserShow')
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
