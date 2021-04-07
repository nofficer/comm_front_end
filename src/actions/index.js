import { GET_PLANS, GET_USERS,  GET_USER, CREATE_USER, EDIT_USER, CREATE_CALC, CHANGE_DONE, CREATE_PLAN, EDIT_PLAN, GET_ATTAINMENT_RULES, CREATE_ATTAINMENT_RULE, EDIT_ATTAINMENT_RULE, GET_TRANS, CREATE_TRANS, EDIT_TRANS, GET_TRAN, DELETE_TRANS, DELETE_ATTAINMENT_RULE,DELETE_PLAN,DELETE_USER,GET_ATTAINMENT_RULE,GET_PLAN,UPLOAD_FILE,CHECK_RULE_USE,CHECK_PLAN_USE,CHECK_USER_USE,GET_RATE_TABLE,GET_RATE_TABLES,CREATE_RATE_TABLE,EDIT_RATE_TABLE,DELETE_RATE_TABLE,CALC_PLANS,GET_PAYOUTS,EDIT_PAYOUT,GET_PAYOUT,DELETE_PAYOUT,LOAD,GET_TIME,UPDATE_TIME,REVERT_TIME,LOGIN,LOGOUT,GET_PAYOUTS_USER,GET_GOAL,GET_GOALS,CREATE_GOAL,EDIT_GOAL,DELETE_GOAL,CLEAR,SELECT_MONTH,UPDATE_ACCOUNT,GET_PAYROLL,SET_FILTER,GET_FILTER,CLEAR_FILTER,LOADING,

GET_LIABILITY,GET_LIABILITIES,EDIT_LIABILITY,DELETE_LIABILITY,CAST_USER,UPDATE_FYE,SELECT_YEAR,CLEAR_TRANS,CALC_STATUS,GET_YEARS,GET_SUMMARY_DATA,GET_PLAN_SUMMARY,GET_TOP_EARNERS,GET_ROLE_HIERARCHY,CREATE_ROLE_HIERARCHY,EDIT_ROLE_HIERARCHY,DELETE_ROLE_HIERARCHY,GET_ROLE_HIERARCHIES,GET_USERS_JOINED,GET_AUTO_TRANS,QBO_CALLBACK,GET_PAYOUTS_SHOW,GET_PAYOUTS_HISTORY_SHOW,INPUT_FORECAST,GET_FORECAST,
CHECK_USER } from './types'
import db from '../apis/db'
import history from '../history'
import axios from 'axios'
import store from '../index'
import firebase from "firebase/app";
import "firebase/auth";


// const proxycheck = axios.create({
//   baseURL: 'http://127.0.0.1:5000',
//   headers: {
//
//     }
// })
//
//
// export const getProxy = () => {
//   return async (dispatch) => {
//     const response = await proxycheck.post('',{'req_type':'get','auth_key':'allowme', 'url':'/getUsers','values':{1:2,3:4}})
//     console.log(response)
//   }
// }

// This function gets a token from the state or the session storage and sets it on all the request headers
function getToken() {
  var token_val = ''
  // console.log('getting token')
  if(typeof(store) != 'undefined' ){
   token_val =  store.getState().account.account.token

  }
  else if(sessionStorage.getItem('token')){
    token_val = sessionStorage.getItem('token')

  }





  db.defaults.headers.common['Authorization'] = token_val


}

export const inputForecast = (formValues) => {
  return async (dispatch) => {
    const response = await db.post('/insertForecast',formValues)

    dispatch({type:INPUT_FORECAST, payload: response.data})
    history.push('/')
    //REDIRECT ELSEWHERE
  }
}

export const getForecast = (year) => {
  return async (dispatch) => {
    const response = await db.post('/getForecast',year)

    dispatch({type:GET_FORECAST, payload: response.data})

    //REDIRECT ELSEWHERE
  }
}



export const callback_action_qbo = (URL) => {
  return async (dispatch) => {
    console.log('callback action')
    const response = await db.get('/callback' + URL)

    dispatch({type:QBO_CALLBACK, payload: response.data})
    history.push('/transShow')
    //REDIRECT ELSEWHERE
  }
}

export const getAutoTrans = () => {
  history.push('/QBOLoadTrans')
  return async (dispatch) => {
    const response = await db.get('/QB_Oauth')
    dispatch({type:GET_AUTO_TRANS, payload: response.data})
    //Before the response comes just send the player to the loading screen and then when it returns good send them back to the transhow
    if(response.data === "good"){
      history.push('/transShow')
    }
    else {
      window.location.href =response.data
    }

  }
}

export const getUsersJoined = () => {
  return async (dispatch) => {
    const response = await db.get('/getUsersJoined')
    dispatch({type:GET_USERS_JOINED, payload: response.data})
  }
}



export const deleteRoleHierarchy = (user_id) => {

  return async (dispatch) => {
    const response = await db.post('/deleteRoleHierarchy', user_id)
    dispatch({type:DELETE_ROLE_HIERARCHY, payload: response.data})
    history.push('/RoleHierarchyShow')
  }
}

export const editRoleHierarchy = (formValues,user_id) => {
  return async (dispatch) => {
    const response = await db.post('/updateRoleHierarchy' , formValues,user_id)
    dispatch({type:EDIT_ROLE_HIERARCHY, payload: response.data})
    history.push('/RoleHierarchyShow')
  }
}
export const createRoleHierarchy = (formValues) => {
  return async (dispatch) => {

    const response = await db.post('/insertRoleHierarchy' , formValues)
    dispatch({type:CREATE_ROLE_HIERARCHY, payload: response.data})
    history.push('/RoleHierarchyShow')
  }
}
export const getRoleHierarchy = (user_id) => {
  return async (dispatch) => {
    const response = await db.post('/getRoleHierarchy' , user_id)
    dispatch({type:GET_ROLE_HIERARCHY, payload: response.data})
  }
}

export const getRoleHierarchies = () => {
  return async (dispatch) => {
    const response = await db.get('/getRoleHierarchies')
    dispatch({type:GET_ROLE_HIERARCHIES, payload: response.data})
  }
}






export const getTopEarners = (requested_year) => {

  return async (dispatch) => {
    const response = await db.post('/getTopEarners',requested_year)
    dispatch({type:GET_TOP_EARNERS, payload: response.data})

  }
}



export const getPlanSummary = (requested_year) => {

  return async (dispatch) => {
    const response = await db.post('/getPlanSummary',requested_year)
    dispatch({type:GET_PLAN_SUMMARY, payload: response.data})

  }
}


export const getSummaryData = (requested_year) => {

  return async (dispatch) => {
    const response = await db.post('/getSummaryData',requested_year)
    dispatch({type:GET_SUMMARY_DATA, payload: response.data})

  }
}

export const getYears = () => {
  return async (dispatch) => {
    const response = await db.get('/getYears')
    dispatch({type:GET_YEARS, payload: response.data})

  }
}


export const checkCalcStatus = () => {
  return async (dispatch) => {
    const response = await db.get('/calc_status')
    dispatch({type:CALC_STATUS, payload: response.data})

  }
}


export const updateFYE = () => {
  return async (dispatch) => {
    const response = await db.get('/nextFYE')
    dispatch({type:UPDATE_FYE, payload: response.data})

}
}

export const castUser = (user_id,role,username,casted_user_id,token) => {

  return({type:CAST_USER, payload: {user_id:user_id.toLowerCase(),role:role,username:username,casted_user_id:casted_user_id,token:token}})
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



export const clearFilter = () => {
  getToken()
  return({type:CLEAR_FILTER})
}

export const setFilter = (key,val) => {

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
    if(response.data === 'wrong_password'){
      history.push({pathname:'/passwordError',state:{detail:'Incorrect Password - Password not changed, please try again'}})
    }
    else{
      history.push({pathname:'/passwordError',state:{detail:'Password Changed'}})
    }

  }

}

export const selectMonth = (month) => {

  return({type:SELECT_MONTH, payload:month})
}

export const selectYear = (year) => {

  return({type:SELECT_YEAR, payload:year})
}


export const clearError = () => {
  history.push('/')
  return({type:CLEAR})
}

export const clearUserError = () => {

  history.push('/userCreate')
  return({type:CLEAR})
}

export const clearTransError = () => {

  // history.push('/userShow')
  return({type:CLEAR})
}

export const clearGoalError = () => {

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



export const login = (formValues,save)=>{

  return async (dispatch) => {
    const response = await db.post('/userLogin',formValues)
    dispatch({type:LOGIN, payload: response.data})
    if(typeof(response.data['user_id']) != 'undefined' ){

      sessionStorage.setItem('username',response.data['username'])
      sessionStorage.setItem('password',response.data['password'])
      sessionStorage.setItem('token', response.data['token'])

    }
    getToken()
    setTimeout(function(){ alert("Your session has timed out, please refresh or close the page and log in again"); }, 3564000);


  }
}

export const checkUser = () => {
  var savedUser = {}
  savedUser['username'] = sessionStorage.getItem('username')
  savedUser['password'] = sessionStorage.getItem('password')

  return async (dispatch) => {
    const response = await db.post('/checkUser',savedUser)

    dispatch({type:CHECK_USER,payload:response.data})
    getToken()
    setTimeout(function(){ alert("Your session has timed out, please refresh or close the page and log in again"); }, 3564000);

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
  getToken()
  return async (dispatch) => {
    const response = await db.get('/getTime')
    dispatch({type:GET_TIME, payload: response.data})

  }
}

export const getPayoutsHistory = (selection) => {

  return async (dispatch) => {
    const response = await db.post('/getPayoutsHistory',selection)
    dispatch({type:GET_PAYOUTS, payload: response.data})

  }
}

export const getPayoutsHistory_show = (selection) => {

  return async (dispatch) => {
    const response = await db.post('/getPayoutsHistory',selection)
    dispatch({type:GET_PAYOUTS_HISTORY_SHOW, payload: response.data})

  }
}


export const getPayouts_cy = () => {

  return async (dispatch) => {
    const response = await db.get('/getPayouts_cy')
    dispatch({type:GET_PAYOUTS, payload: response.data})

  }
}




export const getPayouts = () => {

  return async (dispatch) => {
    const response = await db.get('/getPayouts')
    dispatch({type:GET_PAYOUTS, payload: response.data})

  }
}

export const getPayouts_show = () => {

  return async (dispatch) => {
    const response = await db.get('/getPayouts')
    dispatch({type:GET_PAYOUTS_SHOW, payload: response.data})

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


export const calcPlans = (planList) => {

  return async (dispatch) => {
    const response = await db.post('/calc_plans',planList)
    dispatch({type:CALC_PLANS, payload: response.data})
  }
}

export const deleteRateTable = (rate_id) => {

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
    var url = '/'+type + 'Show'
    var ignored = response.data.slice(4,).split('-')[0]
    var updated = response.data.slice(4,).split('-')[1]

    if(response.data.slice(0,4) === "Done"){
      history.push({pathname:'/ImportSuccess',state:{detail:response.data,ignored:ignored,updated:updated,url:url}})
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

export const clearTrans = () => {
  return({type:CLEAR_TRANS,payload:[]})
}

export const getTrans = (filter) => {
  return async (dispatch) => {
    const response = await db.post('/getTrans',filter)
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

export const editPlan = (formValues) => {

  return async (dispatch) => {
    const response = await db.post('/updatePlan',formValues)
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
