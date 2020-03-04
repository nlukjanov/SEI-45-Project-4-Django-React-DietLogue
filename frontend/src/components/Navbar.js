import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import Authentication from './Authentication'

class Navbar extends React.Component {
  state = { navbarOpen: false }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  // componentDidUpdate(prevProps) {
  //   // we have imported withRouter for navbar to know about the current path. if the path has changed, then the navbar will close in mobile vue
  //   //! somehow it works even without this code, probably some update in react or bulma
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.setState({ navbarOpen: false })
  //   }
  // }

  handleLogout = () => {
    notify.show('Come back soon!', 'success', 3000)
    Authentication.logout()

    this.props.history.push('/')
  }

  render() {
    const { navbarOpen } = this.state
    return (
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            {Authentication.isAuthenticated() && (
              <Link className='navbar-item' to='/myaccount'>
                Home
              </Link>
            )}
            {!Authentication.isAuthenticated() && (
              <Link className='navbar-item' to='/'>
                Home
              </Link>
            )}
            <p
              className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
          <div
            className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}
            onClick={this.toggleNavbar}
          >
            <div className='navbar-end'>
              {Authentication.isAuthenticated() && (
                <Link className='navbar-item' to='/logs/new'>
                  New Log Entry
                </Link>
              )}
              {!Authentication.isAuthenticated() && (
                <Link className='navbar-item' to='/register'>
                  Register
                </Link>
              )}
              {!Authentication.isAuthenticated() && (
                <Link className='navbar-item' to='/login'>
                  Login
                </Link>
              )}
              {Authentication.isAuthenticated() && (
                <Link className='navbar-item' to='/myaccount'>
                  My Account
                </Link>
              )}
              {Authentication.isAuthenticated() && (
                <Link className='navbar-item' to='/loghistory'>
                  Log History
                </Link>
              )}
              {Authentication.isAuthenticated() && (
                <a onClick={this.handleLogout} className='navbar-item'>
                  Logout
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
