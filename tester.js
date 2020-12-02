if(this.props.account['role'] == 'admin'){
    return (

    )
}

else if(typeof(this.props.account['user_id']) == "number"){
  return "You do not have sufficient permissions to access this page"
}
else{
  return <Login/>
}




import Login from './Accounts/Login'



account: state.account.account
