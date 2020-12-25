import { GET_PLANS, GET_USERS,  GET_USER, CREATE_USER, EDIT_USER, CREATE_CALC, CHANGE_DONE, GO_PUSH, CREATE_PLAN, EDIT_PLAN, GET_ATTAINMENT_RULES, CREATE_ATTAINMENT_RULE, EDIT_ATTAINMENT_RULE, GET_TRANS, CREATE_TRANS, EDIT_TRANS, GET_TRAN, DELETE_TRANS, DELETE_ATTAINMENT_RULE,DELETE_PLAN,DELETE_USER,GET_ATTAINMENT_RULE,GET_PLAN,UPLOAD_FILE,ONCHANGE_FILE,CHECK_RULE_USE,CHECK_PLAN_USE,CHECK_USER_USE,GET_RATE_TABLE,GET_RATE_TABLES,CREATE_RATE_TABLE,EDIT_RATE_TABLE,DELETE_RATE_TABLE,ERROR_HANDLE,CALC_PLANS,GET_PAYOUTS,EDIT_PAYOUT,GET_PAYOUT,DELETE_PAYOUT,LOAD,GET_TIME,UPDATE_TIME,REVERT_TIME,LOGIN,SET_ACCOUNT,LOGOUT,GET_PAYOUTS_USER,GET_GOAL,GET_GOALS,CREATE_GOAL,EDIT_GOAL,DELETE_GOAL,CLEAR,SELECT_MONTH,UPDATE_ACCOUNT,GET_PAYROLL,SET_FILTER,GET_FILTER,CLEAR_FILTER,LOADING,
GET_ROLE_HIERARCHY,CREATE_ROLE_HIERARCHY,EDIT_ROLE_HIERARCHY,DELETE_ROLE_HIERARCHY,GET_ROLE_HIERARCHIES,
GET_LIABILITY,GET_LIABILITIES,EDIT_LIABILITY,DELETE_LIABILITY,CAST_USER,UPDATE_FYE,SELECT_YEAR,
CHECK_USER } from './types'
import db from '../apis/db'
import history from '../history'


export const updateFYE = () => {
  return async (dispatch) => {
    const response = await db.get('/nextFYE')
    dispatch({type:UPDATE_FYE, payload: response.data})

}
}

export const castUser = (user_id) => {
  return({type:CAST_USER, payload: {user_id:parseInt(user_id),role:'admin',username:'admin'}})
}

export const getLiability = (liability_id) => {
  return async (dispatch) => {
    const response = await db.post('/getLiability', liability_id)
    dispatch({type:GET_LIABILITY, payload: response.data})

  }
}

export const getLiabilities = () => {
  return async (dispatch) => {
    const response = await db.get('/getLiabilities')
    dispatch({type:GET_LIABILITIES, payload: response.data})

  }
}

export const editLiability = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/updateLiability', formValues)
    dispatch({type:EDIT_LIABILITY, payload: response.data})
    history.push('/LiabilityShow')
  }
}

export const deleteLiability = (liability_id) => {
  return async (dispatch) => {
    const response = await db.post('/deleteLiability', liability_id)
    dispatch({type:DELETE_LIABILITY, payload: response.data})
  }
}

export const getRoleHierarchy = (user_id) => {
  return async (dispatch) => {
    const response = await db.post('/getRoleHierarchy', user_id)
    dispatch({type:GET_ROLE_HIERARCHY, payload: response.data})

  }
}

export const getRoleHierarchies = () => {
  return async (dispatch) => {
    const response = await db.get('/getRoleHierarchies')
    dispatch({type:GET_ROLE_HIERARCHIES, payload: response.data})

  }
}

export const deleteRoleHierarchy = (user_id) => {
  return async (dispatch) => {
    const response = await db.post('/deleteRoleHierarchy', user_id)
    dispatch({type:DELETE_ROLE_HIERARCHY, payload: response.data})

  }
}

export const editRoleHierarchy = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/editRoleHierarchy', formValues)
    dispatch({type:EDIT_ROLE_HIERARCHY, payload: response.data})

  }
}

export const insertRoleHierarchy = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/insertRoleHierarchy', formValues)
    dispatch({type:CREATE_ROLE_HIERARCHY, payload: response.data})

  }
}


export const clearFilter = () => {
  return({type:CLEAR_FILTER})
}

export const setFilter = (key,val) => {
  console.log(val)
  return({type:SET_FILTER,payload:[key,val]})
}

export const getFilter = () => {
  return({type:GET_FILTER})
}



export const getPayroll = (month_id) => {
  return async (dispatch) => {
    const response = await db.post('/getPayrollFile', month_id)
    dispatch({type:GET_PAYROLL,payload:response.data})
  }
}


export const updateAccount = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/updateAccount', formValues)
    dispatch({type:UPDATE_ACCOUNT})
    history.push('/')
  }

}

export const selectMonth = (month) => {
  console.log("Selecting month")
  return({type:SELECT_MONTH, payload:month})
}

export const selectYear = (year) => {
  console.log("Selecting year")
  return({type:SELECT_YEAR, payload:year})
}


export const clearError = () => {
  history.push('/')
  return({type:CLEAR})
}

export const clearUserError = () => {
  console.log("This is running")
  // history.push('/userShow')
  return({type:CLEAR})
}

export const clearTransError = () => {
  console.log("This is running")
  // history.push('/userShow')
  return({type:CLEAR})
}

export const clearGoalError = () => {
  console.log("This is running")
  // history.push('/userShow')
  return({type:CLEAR})
}

export const deleteGoal = (goal_id) => {

  return async (dispatch) => {
    const response = await db.post('/deleteGoal', goal_id)
    dispatch({type:DELETE_GOAL, payload: response.data})
    history.push('/GoalShow')
  }
}

export const editGoal = (formValues,goal_id) => {
  return async (dispatch) => {
    const response = await db.post('/updateGoal' , formValues,goal_id)
    dispatch({type:EDIT_GOAL, payload: response.data})
    history.push('/GoalShow')
  }
}
export const createGoal = (formValues) => {
  return async (dispatch) => {
    console.log(formValues)
    const response = await db.post('/insertGoal' , formValues)
    dispatch({type:CREATE_GOAL, payload: response.data})
    history.push('/GoalShow')
  }
}
export const getGoal = (goal_id) => {
  return async (dispatch) => {
    const response = await db.post('/getGoal' , goal_id)
    dispatch({type:GET_GOAL, payload: response.data})
  }
}

export const getGoals = () => {
  return async (dispatch) => {
    const response = await db.get('/getGoals')
    dispatch({type:GET_GOALS, payload: response.data})
  }
}

export const logout = () => {
  console.log("User logging out")
  localStorage.clear()
  sessionStorage.clear()
  return({type:LOGOUT})
}

    //Removed this for security concerns
// export const setAccount = () => {
//   var account = "none"
//   if(localStorage.getItem('role')){
//     account = {}
//     console.log("Localstorage setting")
//
//     account['role'] = localStorage.getItem('role')
//     account['user_id'] = parseInt(localStorage.getItem('user_id'))
//     account['username'] = localStorage.getItem('username')
//   }
//   else if(sessionStorage.getItem('role')){
//     account = {}
//     console.log("Sessionstorage setting")
//     account['role'] = sessionStorage.getItem('role')
//     account['user_id'] = parseInt(sessionStorage.getItem('user_id'))
//     account['username'] = sessionStorage.getItem('username')
//   }
//
//   return({type:SET_ACCOUNT, payload:account})
// }

export const login = (formValues,save)=>{
  return async (dispatch) => {
    const response = await db.post('/userLogin',formValues)
    dispatch({type:LOGIN, payload: response.data})
    if(typeof(response.data['user_id']) == 'number' ){

      sessionStorage.setItem('username',response.data['username'])
      sessionStorage.setItem('password',response.data['password'])
      history.push('/')
    }

  }
}

export const checkUser = () => {
  var savedUser = {}
  savedUser['username'] = sessionStorage.getItem('username')
  savedUser['password'] = sessionStorage.getItem('password')
  return async (dispatch) => {
    const response = await db.post('/checkUser',savedUser)
    dispatch({type:CHECK_USER,payload:response.data})
  }
}

export const loadCalcs = () =>{

  return({type:LOAD})
}

export const revertTime = () => {

  return async (dispatch) => {
    const response = await db.post('/revertTime')
    dispatch({type:REVERT_TIME, payload: response.data})
    history.push('/admin')
  }
}

export const updateTime = () => {

  return async (dispatch) => {
    const response = await db.post('/updateTime')
    dispatch({type:UPDATE_TIME, payload: response.data})
    history.push('/admin')
  }
}

export const getTime = () => {

  return async (dispatch) => {
    const response = await db.get('/getTime')
    dispatch({type:GET_TIME, payload: response.data})

  }
}

export const getPayoutsHistory = () => {

  return async (dispatch) => {
    const response = await db.get('/getPayoutsHistory')
    dispatch({type:GET_PAYOUTS, payload: response.data})

  }
}





export const getPayouts = () => {

  return async (dispatch) => {
    const response = await db.get('/getPayouts')
    dispatch({type:GET_PAYOUTS, payload: response.data})

  }
}

export const getPayouts_user = (userMonth) => {

  return async (dispatch) => {
    const response = await db.post('/getPayouts_user',userMonth)
    dispatch({type:GET_PAYOUTS_USER, payload: response.data})

  }
}

export const updatePayout = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/updatePayout',formValues)
    dispatch({type:EDIT_PAYOUT, payload:response.data})
    history.push('/payoutShow')
  }
}

export const deletePayout = (payout_id) => {
  return async (dispatch) => {
    const response = await db.post('/deletePayout',payout_id)
    dispatch({type:DELETE_PAYOUT, payload:response.data})
  }
}

export const getPayout = (payout_id) => {
  return async (dispatch) => {
    const response = await db.post('/getPayout',payout_id)
    dispatch({type:GET_PAYOUT, payload:response.data})
  }
}


export const calcPlans = () => {

  return async (dispatch) => {
    const response = await db.get('/calc_plans')
    dispatch({type:CALC_PLANS, payload: response.data})
  }
}

export const deleteRateTable = (rate_id) => {
  console.log(rate_id)
  return async (dispatch) => {
    const response = await db.post('/deleteRateTable', rate_id)
    dispatch({type:DELETE_RATE_TABLE, payload: response.data})
    history.push('/RateTableShow')
  }
}

export const editRateTable = (formValues,rate_id) => {
  return async (dispatch) => {
    const response = await db.post('/updateRateTable' , formValues,rate_id)
    dispatch({type:EDIT_RATE_TABLE, payload: response.data})
    history.push('/RateTableShow')
  }
}
export const createRateTable = (formValues) => {
  return async (dispatch) => {
    console.log(formValues)
    const response = await db.post('/insertRateTable' , formValues)
    dispatch({type:CREATE_RATE_TABLE, payload: response.data})
    history.push('/RateTableShow')
  }
}
export const getRateTable = (rate_id) => {
  return async (dispatch) => {
    const response = await db.post('/getRateTable' , rate_id)
    dispatch({type:GET_RATE_TABLE, payload: response.data})
  }
}

export const getRateTables = () => {
  return async (dispatch) => {
    const response = await db.get('/getRateTables')
    dispatch({type:GET_RATE_TABLES, payload: response.data})
  }
}

export const checkUserUse = (user_id) => {
  return async (dispatch) => {
    const response = await db.post('/checkUserUse',user_id)
    dispatch({type:CHECK_USER_USE, payload:response.data})
  }
}

export const checkPlanUse = (plan_id) => {
  return async (dispatch) => {
    const response = await db.post('/checkPlanUse',plan_id)
    dispatch({type:CHECK_PLAN_USE, payload:response.data})
  }
}

export const checkRuleUse = (rule_id) => {
  return async (dispatch) => {
    const response = await db.post('/checkRuleUse',rule_id)
    dispatch({type:CHECK_RULE_USE, payload:response.data})
  }
}

export const uploadFile = (data,type) => {
  return async (dispatch) => {
    const response = await db.post('/import_fileB',data)
    dispatch({type:UPLOAD_FILE, payload:response.data})
    var url = './'+type + 'Show'
    if(response.data == "Done"){
      history.push(url)
    }
    else{
        history.push({pathname:'/ImportError',state:{detail:response.data}})
    }

  }

}

export const loading = () => {
  return({type:LOADING, payload:'loading'})
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
