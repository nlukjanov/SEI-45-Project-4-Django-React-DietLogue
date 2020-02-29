import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {
  // handleLogout = () => {
  //   notify.show('Come back soon!', 'success', 3000)
  //   Auth.logout()
  //   this.props.history.push('/')
  // }
  render() {
    return (
      <nav className='navbar is-dark'>
        <div className='container'>
          <div className='navbar-brand'>
            <Link className='navbar-item' to='/'>
              Home
            </Link>
          </div>
          <div className='navbar-menu'>
            <div className='navbar-end'>
              <Link className='navbar-item' to='/logs/new'>
                New Log Entry
              </Link>
              <Link className='navbar-item' to='/register'>
                Register
              </Link>
              <Link className='navbar-item' to='/login'>
                Login
              </Link>
              <Link className='navbar-item' to='/myaccount'>
                My Account
              </Link>
              <Link className='navbar-item' to='/loghistory'>
                Log History
              </Link>
              <a onClick={this.handleLogout} className='navbar-item'>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
