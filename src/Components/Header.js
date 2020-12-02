import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {setAccount,logout} from '../actions'


class Header extends React.Component {
  componentDidMount(){
     this.props.setAccount()
  }
  renderSignIn(){

  }

  render() {
    if(typeof(this.props.account['user_id']) == "number"){
      if(this.props.account['role'] == "admin"){return (


      <div className='ui seven item menu'>
      <div class="ui simple dropdown item">


      <Link to='/'>
          Home
      </Link>


        <div class=" ui vertical menu ">


            <div className=''>
              <a className="blue active item"><Link to='/calc'>
                  Calc
              </Link></a>

            </div>
            <div className=''>
              <a className="blue active item"><Link to='/time'>
                  Time
              </Link></a>

            </div>
            <div className=''>
              <a  className="blue active item"><Link onClick={(e) => e.stopPropagation(this.props.logout())}  to='/'>
                  Log out
              </Link></a>

            </div>





      </div>

    </div>
    <div class="ui simple dropdown item">


    <Link to='/payoutShow'>
        Calcs
    </Link>


      <div class=" ui vertical menu ">


          <div className=''>
            <a className="blue active item"><Link to='/payoutShow'>
                Payouts
            </Link></a>

          </div>
          <div className=''>
            <a className="blue active item"><Link to='/payoutHistoryShow'>
                Historical Payouts
            </Link></a>

          </div>




    </div>

  </div>
          <div class="ui simple dropdown item">


          <Link to='/rateTableShow'>
              Rate Tables
          </Link>


            <div class="menu">

                <div className='item'>
                  <Link to='/import'>
                      Import Rates
                  </Link>
                </div>

                <div className='item'>
                  <Link to='/rateTableShow'>
                      Rate Tables
                  </Link>
                </div>

                <div className='item'>
                  <Link to='/rateTableCreate'>
                      Create Rate Table
                  </Link>
                </div>





          </div>

        </div>



          <div class="ui simple dropdown item">


          <Link to='/transShow'>
              Deals
          </Link>


            <div class="menu">

                <div className='item'>
                  <Link to='/import'>
                      Import Deals
                  </Link>
                </div>

                <div className='item'>
                  <Link to='/transShow'>
                      Transactions
                  </Link>
                </div>

                <div className='item'>
                  <Link to='/transCreate'>
                    Create Transaction
                  </Link>
                </div>

          </div>

        </div>
        <div class="ui simple dropdown item">


        <Link to='/planShow'>
          Plans
        </Link>

          <div class="menu">
            <div className='item'>
              <Link to='/planShow'>
                Plans
              </Link>
            </div>
            <div className='item'>
              <Link to='/planCreate'>
                Create Plan
              </Link>
            </div>
          </div>
        </div>
        <div class="ui simple dropdown item">


        <Link to ='/attainRuleShow'>
          Attainment Rules
        </Link>

          <div class="menu">

              <div className='item'>
                <Link to ='/attainRuleShow'>
                  Attainment Rules
                </Link>
              </div>
              <div className='item'>
                <Link to ='/attainRuleCreate'>
                  Create Attainment Rules
                </Link>
              </div>
            </div>
          </div>
          <div class="ui simple dropdown item">


          <Link to ='/userShow'>
            Users
          </Link>

            <div class="menu">
            <div className='item'>
              <Link to='/import'>
                  Import Users
              </Link>
            </div>

            <div className='item'>
            <Link to ='/userShow'>
              Users
            </Link>
            </div>
            <div className='item'>
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


            <div className='ui two item menu'>

            <div class="ui simple dropdown item">
            <div className='item'>
            <Link to='/report'>
                Payouts
            </Link>
            </div>
            </div>




              <div class="ui simple dropdown item">
              <div className='item'>

              <Link onClick={(e) => e.stopPropagation(this.props.logout())}  to='/'>
                  Log out
              </Link>
              </div>
              </div>






            </div>
      )
    }
    }
  else {
    return(


          <div className='ui one item menu'>
          <div class="ui simple dropdown item">


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
    account: state.account.account
  }
}

export default connect(mapStateToProps, { setAccount,logout })(Header)
