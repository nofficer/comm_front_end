import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout,selectMonth,getTime,clearFilter} from '../actions'
import history from '../history'


class Header extends React.Component {
  componentDidMount(){
    this.props.clearFilter()
    this.props.getTime()
    this.props.selectMonth(this.props.month['current.month_id'])
     // this.props.setAccount()
  }
  renderSignIn(){

  }

  render() {
    if(typeof(this.props.account['user_id']) == "number"){
      if(this.props.account['role'] == "admin"){return (


      <div className='ui eight item menu'>
      <div onClick={(e) => e.stopPropagation(history.push('/'))} class="ui simple dropdown item">


      <Link to='/'>
          Home
      </Link>



        <div class=" ui vertical menu ">



            <div onClick={(e) => e.stopPropagation(history.push('/admin'))} className=''>
              <a className="blue active item"><Link to='/admin'>
                  Admin
              </Link></a>

            </div>
            <div onClick={(e) => e.stopPropagation(this.props.logout())} className=''>
              <a  className="blue active item"><Link onClick={(e) => e.stopPropagation(this.props.logout())}  to='/'>
                  Log out
              </Link></a>

            </div>





      </div>

    </div>
    <div onClick={(e) => e.stopPropagation(history.push('/payoutShow'))} class="ui simple dropdown item">


    <Link to='/payoutShow'>
        Calcs
    </Link>


      <div class=" ui vertical menu ">


          <div onClick={(e) => e.stopPropagation(history.push('/payoutShow'))} className=''>
            <a className="blue active item"><Link to='/payoutShow'>
                Payouts
            </Link></a>

          </div>
          <div onClick={(e) => e.stopPropagation(history.push('/payoutHistoryShow'))} className=''>
            <a className="blue active item"><Link to='/payoutHistoryShow'>
                Historical Payouts
            </Link></a>

          </div>




    </div>

  </div>
          <div onClick={(e) => e.stopPropagation(history.push('/rateTableShow'))} class="ui simple dropdown item">


          <Link to='/rateTableShow'>
              Rate Tables
          </Link>


            <div class="menu">

                <div onClick={(e) => e.stopPropagation(history.push('/import'))} className='item'>
                  <Link to='/import'>
                      Import Rates
                  </Link>
                </div>

                <div onClick={(e) => e.stopPropagation(history.push('/rateTableShow'))} className='item'>
                  <Link to='/rateTableShow'>
                      Rate Tables
                  </Link>
                </div>

                <div onClick={(e) => e.stopPropagation(history.push('/rateTableCreate'))} className='item'>
                  <Link to='/rateTableCreate'>
                      Create Rate Table
                  </Link>
                </div>





          </div>

        </div>
        <div onClick={(e) => e.stopPropagation(history.push('/goalShow'))} class="ui simple dropdown item">


        <Link to='/goalShow'>
            Goals
        </Link>


          <div class="menu">

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



          <div onClick={(e) => e.stopPropagation(history.push('/transShow'))} class="ui simple dropdown item">


          <Link to='/transShow'>
              Deals
          </Link>


            <div class="menu">

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
        <div onClick={(e) => e.stopPropagation(history.push('/planShow'))} class="ui simple dropdown item">


        <Link to='/planShow'>
          Plans
        </Link>

          <div class="menu">
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
        <div onClick={(e) => e.stopPropagation(history.push('/attainRuleShow'))} class="ui simple dropdown item">


        <Link to ='/attainRuleShow'>
          Attainment Rules
        </Link>

          <div class="menu">

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
          <div onClick={(e) => e.stopPropagation(history.push('/userShow'))} class="ui simple dropdown item">


          <Link to ='/userShow'>
            Users
          </Link>

            <div class="menu">
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


            <div onClick={(e) => e.stopPropagation(history.push('/report'))} className='item ui simple dropdown hoveritem'>
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

              Change Passowrd




              </div>







            </div>
      )
    }
    }
  else {
    return(


          <div className='ui one item menu'>
          <div onClick={(e) => e.stopPropagation(history.push('/login'))} class="ui simple dropdown item">


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

export default connect(mapStateToProps, { logout,selectMonth,getTime,clearFilter })(Header)
