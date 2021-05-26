import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout,selectMonth,getTime,clearFilter,checkUser} from '../actions'
import history from '../history'


class Header extends React.Component {
  componentDidMount(){
    this.props.clearFilter()
    this.props.getTime()
    this.props.selectMonth(this.props.month['current.month_id'])
    this.props.checkUser()

     // this.props.setAccount()
  }
  renderSignIn(){

  }

  render() {
    if(typeof(this.props.account['user_id']) !== "undefined"){
      if(this.props.account['role'] === "admin"){return (


      <div className='ui nine item menu'>
      <div onClick={(e) => e.stopPropagation(history.push({pathname:'/',state:{detail:this.props.month}}))} className="ui simple dropdown item">


      <Link to='/'>
          Home
      </Link>



        <div className=" ui vertical menu ">



            <div onClick={(e) => e.stopPropagation(history.push('/admin'))} className='  center aligned item'>
              <Link to='/admin'>
                  Admin
              </Link>

            </div>
            <div onClick={(e) => e.stopPropagation(history.push({pathname:'/report',state:{detail:this.props.month}}))} className='item'>
            <Link to='/report'>
                  Report
              </Link>

            </div>
            <div onClick={(e) => e.stopPropagation(history.push({pathname:'/forecast',state:{detail:this.props.month}}))} className='item'>
            <Link to='/forecast'>
                  Forecast
              </Link>

            </div>
            <div onClick={(e) => e.stopPropagation(this.props.logout())} className='item'>
            <Link onClick={(e) => e.stopPropagation(this.props.logout())}  to='/'>
                  Log out
              </Link>

            </div>





      </div>

    </div>
    <div onClick={(e) => e.stopPropagation(history.push('/runCalcs'))} className="ui simple dropdown item">


    <Link to='/runCalcs'>
        Calcs
    </Link>


      <div className=" ui vertical menu ">
          <div onClick={(e) => e.stopPropagation(history.push('/runCalcs'))} className='item'>
            <Link to='/runCalcs'>
                Run Calculations
            </Link>

          </div>


          <div onClick={(e) => e.stopPropagation(history.push('/payoutShow'))} className='item'>
            <Link to='/payoutShow'>
                Payouts
            </Link>

          </div>
          <div onClick={(e) => e.stopPropagation(history.push('/payoutHistoryShow'))} className='item'>
          <Link to='/payoutHistoryShow'>
                Historical Payouts
            </Link>

          </div>




    </div>

  </div>
  <div onClick={(e) => e.stopPropagation(history.push({pathname:'/roleHierarchyShow',state:{detail:this.props.month}}))} className="ui simple dropdown item">


  <Link to='/'>
      Role Hierarchy
  </Link>



    <div className=" ui vertical menu ">
    <div onClick={(e) => e.stopPropagation(history.push('/import'))} className='item'>
      <Link to='/import'>
          Import Role Hierarchy
      </Link>

    </div>


        <div onClick={(e) => e.stopPropagation(history.push('/roleHierarchyShow'))} className='item'>
          <Link to='/roleHierarchyShow'>
              Role Hierarchy
          </Link>

        </div>
        <div onClick={(e) => e.stopPropagation(history.push({pathname:'/roleHierarchyCreate',state:{detail:this.props.month}}))} className='item'>
          <Link to='/roleHierarchyCreate'>
              Create Role Hierarchy
          </Link>

        </div>






  </div>

</div>

          <div onClick={(e) => e.stopPropagation(history.push('/rateTableShow'))} className="ui simple dropdown item">


          <Link to='/rateTableShow'>
              Rates
          </Link>


            <div className="menu">

                <div onClick={(e) => e.stopPropagation(history.push('/import'))} className='item'>
                  <Link to='/import'>
                      Import Rates
                  </Link>
                </div>

                <div onClick={(e) => e.stopPropagation(history.push('/rateTableShow'))} className='item'>
                  <Link to='/rateTableShow'>
                      Rates
                  </Link>
                </div>

                <div onClick={(e) => e.stopPropagation(history.push('/rateTableCreate'))} className='item'>
                  <Link to='/rateTableCreate'>
                      Create Rate
                  </Link>
                </div>





          </div>

        </div>
        <div onClick={(e) => e.stopPropagation(history.push('/goalShow'))} className="ui simple dropdown item">


        <Link to='/goalShow'>
            Goals
        </Link>


          <div className="menu">

              <div onClick={(e) => e.stopPropagation(history.push('/import'))} className='item'>
                <Link to='/import'>
                    Import Goals
                </Link>
              </div>

              <div onClick={(e) => e.stopPropagation(history.push('/goalShow'))} className='item'>
                <Link to='/goalShow'>
                    Goals
                </Link>
              </div>

              <div onClick={(e) => e.stopPropagation(history.push('/goalCreate'))} className='item'>
                <Link to='/goalCreate'>
                    Create Goals
                </Link>
              </div>





        </div>

      </div>



          <div onClick={(e) => e.stopPropagation(history.push('/transShow'))} className="ui simple dropdown item">


          <Link to='/transShow'>
              Deals
          </Link>


            <div className="menu">

                <div onClick={(e) => e.stopPropagation(history.push('/import'))} className='item'>
                  <Link to='/import'>
                      Import Deals
                  </Link>
                </div>

                <div onClick={(e) => e.stopPropagation(history.push('/transShow'))} className='item'>
                  <Link to='/transShow'>
                      Transactions
                  </Link>
                </div>

                <div onClick={(e) => e.stopPropagation(history.push('/transCreate'))} className='item'>
                  <Link to='/transCreate'>
                    Create Transaction
                  </Link>
                </div>

          </div>

        </div>
        <div onClick={(e) => e.stopPropagation(history.push('/planShow'))} className="ui simple dropdown item">


        <Link to='/planShow'>
          Plans
        </Link>

          <div className="menu">
            <div onClick={(e) => e.stopPropagation(history.push('/planShow'))} className='item'>
              <Link to='/planShow'>
                Plans
              </Link>
            </div>
            <div onClick={(e) => e.stopPropagation(history.push('/planCreate'))} className='item'>
              <Link to='/planCreate'>
                Create Plan
              </Link>
            </div>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation(history.push('/attainRuleShow'))} className="ui simple dropdown item">


        <Link to ='/attainRuleShow'>
          Attainment Rules
        </Link>

          <div className="menu">

              <div onClick={(e) => e.stopPropagation(history.push('/attainRuleShow'))} className='item'>
                <Link to ='/attainRuleShow'>
                  Attainment Rules
                </Link>
              </div>
              <div onClick={(e) => e.stopPropagation(history.push('/attainRuleCreate'))} className='item'>
                <Link to ='/attainRuleCreate'>
                  Create Attainment Rules
                </Link>
              </div>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation(history.push('/userShow'))} className="ui simple dropdown item">


          <Link to ='/userShow'>
            Users
          </Link>

            <div className="menu">
            <div onClick={(e) => e.stopPropagation(history.push('/import'))} className='item'>
              <Link to='/import'>
                  Import Users
              </Link>
            </div>

            <div onClick={(e) => e.stopPropagation(history.push('/userShow'))} className='item'>
            <Link to ='/userShow'>
              Users
            </Link>
            </div>
            <div onClick={(e) => e.stopPropagation(history.push('/userCreate'))} className='item'>
            <Link to ='/userCreate'>
              Create User
            </Link>
            </div>



            </div>
            </div>


      </div>
    )}
    else {
      return(


            <div className='ui three item menu'>


            <div onClick={(e) => e.stopPropagation(history.push({pathname:'/report',state:{detail:this.props.month}}))} className='item ui simple dropdown hoveritem'>
            <Link to='/report'>
                Payouts
            </Link>
            </div>






              <div onClick={(e) => e.stopPropagation(this.props.logout())} className='item ui simple dropdown hoveritem'>

              <Link onClick={(e) => e.stopPropagation(this.props.logout())}  to='/'>
                  Log out
              </Link>
              </div>



              <div onClick={(e) => e.stopPropagation(history.push({pathname:'/passwordchange',state:{detail:this.props.account['user_id']}}))} className='item ui simple dropdown hoveritem'>

              Change Password




              </div>







            </div>
      )
    }
    }
  else {
    return(


          <div className='ui one item menu'>
          <div onClick={(e) => e.stopPropagation(history.push('/login'))} className="ui simple dropdown item">


          <Link to='/login'>
              Login
          </Link>



        </div>
          </div>
    )
  }
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    month:state.month.month
  }
}

export default connect(mapStateToProps, { logout,selectMonth,getTime,clearFilter,checkUser })(Header)
