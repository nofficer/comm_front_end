import React from 'react'
import { connect } from 'react-redux'
import { getUsers,deleteUser,getTime,setFilter,clearFilter,clearError,clearUserError} from '../actions'
import history from '../history'
import { Link } from 'react-router-dom'
import Login from './Accounts/Login'
import Modal from '../Modal'


function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};


class UserShow extends React.Component {

  componentDidMount(){
    this.props.clearFilter()
    this.props.getUsers()
    this.props.getTime()
  }

  filterMap = {
    'user_id':0,
    'name':1,
    'plan_id':2,
    'plan_name':3,
    'location':4,
    'username':5,
    'role':6,
    'annual_ti':7
  }

  createItem(user){
    var filters = Object.keys(this.props.filter)
    var check = true
    filters.map((filter) => {

      if(user[this.filterMap[filter]] === null){
        check = false
      }
      else if(user[this.filterMap[filter]] !== null){
        if(!user[this.filterMap[filter]].toString().toLowerCase().includes(this.props.filter[filter].toLowerCase())){
            check = false
          }
      }

      return true
        }
    )

    if(
      check
    ){
    return (
      <tr key={user[0]}><td className='center aligned collapsing'>{user[0]}</td><td className='center aligned'>{user[1]}</td><td className='center aligned'>{user[2]}</td><td className='center aligned'>{user[3]}</td><td className='center aligned'>{user[4]}</td><td className='center aligned'>{user[5]}</td><td className='center aligned'>{user[6]}</td><td className='center aligned'>{formatMoney(user[7])}</td>
      <td className='center aligned'><Link onClick={(e) => e.stopPropagation()} to={`/userShow/edit/${user[0]}`} className='ui small button primary'>
        Edit
      </Link>
      <Link onClick={(e) => e.stopPropagation()} to={`/userShow/delete/${user[0]}`} className='ui small button negative'>
        Delete
      </Link>
      <button onClick={(e) => e.stopPropagation(history.push({pathname:'/passwordChange',state:{detail:user[0]} } ) ) } className='ui small button positive'>
        Change Password
      </button>
      </td>



      </tr>
    )
  }
  }

  renderList(){

    return this.props.users.map((user) => {
      return (this.createItem(user))
    })

  }


  render(){
    if(this.props.error === 'id'){
      return <Modal onDismiss={this.props.clearUserError} title='Error in User Creation' content='A user with that ID already exists' actions='Ok'/>
    }
    else if(this.props.error === 'username'){
      return <Modal onDismiss={this.props.clearUserError} title='Error in User Creation' content='That username is already taken' actions='Ok'/>
    }
    else if(this.props.error === 'limit'){
      return <Modal onDismiss={this.props.clearUserError} title='Error in User Creation' content='You are at the maximum number of users allowed for your license. Please upgrade or delete users.' actions='Ok'/>
    }
    else if(this.props.error === 'import'){
      return <Modal onDismiss={this.props.clearUserError} title='Error in User Creation' content={this.props.error} actions='Ok'/>
    }
    else if(this.props.error === 'wrong'){
        return <Modal onDismiss={this.props.clearUserError} title='Error in User Editing' content='Issue with editing user, unexpected value provided' actions='Ok'/>
    }
    else {
      if(this.props.account['role'] === 'admin'){
        return (
          <div>
          <div className='ui grid'>

          <div className='sixteen wide column'></div>

          <div className='sixteen wide column'>
          <div className='ui center aligned grid'>
            <h1 className=''>Users</h1>
            </div>
          </div>
          <div className='sixteen wide column'></div>
          <div className='sixteen wide column'></div>
          </div>
          <div style={{overflow:'auto', whitespace:'nowrap',"transform":"rotateX(180deg)"}} className='ui container containermargin'>
          <table  className='ui celled unstackable table' style={{"transform":"rotateX(180deg)"}}>
            <thead>


            <tr>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('user_id',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
                <div className="ui input">
                  <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('name',e.target.value))} placeholder="Search..."/>
                </div>
              </td>
              <td className='center aligned'>
              <div className="ui input">
                <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('plan_id',e.target.value))} placeholder="Search..."/>
              </div>
            </td>
            <td className='center aligned'>
            <div className="ui input">
              <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('plan_name',e.target.value))} placeholder="Search..."/>
            </div>
          </td>
          <td className='center aligned'>
          <div className="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('location',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td className='center aligned'>
          <div className="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('username',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td className='center aligned'>
          <div className="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('role',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td className='center aligned'>
          <div className="ui input">
            <input type="text" size="6" onChange={(e) => e.stopPropagation(this.props.setFilter('annual_ti',e.target.value))} placeholder="Search..."/>
          </div>
          </td>
          <td className='center aligned'>
          </td>
              </tr>


              <tr>
                <th className='center aligned'><strong>User ID</strong></th>
                <th className='center aligned'><strong> Name</strong></th>
                <th className='center aligned'><strong>Plan ID</strong></th>
                <th className='center aligned'><strong>Plan Name</strong></th>
                <th className='center aligned'><strong>Location</strong></th>
                <th className='center aligned'><strong>Username</strong></th>
                <th className='center aligned'><strong>Role</strong></th>
                <th className='center aligned'><strong>Annual TI</strong></th>
                <th className='center aligned'><strong>Options</strong></th>
              </tr>
            </thead>
            <tbody>
            {this.renderList()}
            </tbody>
          </table>

          </div>
          </div>


        )
      }

      else if(typeof(this.props.account['user_id']) !== "undefined"){
        return "You do not have sufficient permissions to access this page"
      }
      else{
        return <Login/>
      }
    }


  }
}

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users.users),
    account: state.account.account,
    filter: state.filter.filter,
    error:state.errors.errors
  }
}

export default connect(mapStateToProps, { getUsers,deleteUser,getTime,setFilter,clearFilter,clearError,clearUserError})(UserShow)
