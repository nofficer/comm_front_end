import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  renderSignIn(){

  }

  render() {
    return (

    <div className='ui ten item menu'>
      <div className='item'>
        <Link to='/ImportTrans'>
            Import Deals
        </Link>
      </div>
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
          <div className='item'>
          <Link to ='/calc'>
            AE Calculator
          </Link>
          </div>
    </div>
    )
  }
}

export default Header
