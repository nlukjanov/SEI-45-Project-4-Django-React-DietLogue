import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Authentication from './Authentication'
import { notify } from 'react-notify-toast'

const SecureRoute = ({ component: Component, ...rest }) => {
  console.log(Authentication.isAuthenticated())
  if (Authentication.isAuthenticated()) return <Route {...rest} component={Component} />
  Authentication.logout()
  notify.show('Please log in to continue', 'success', 2000)
  return <Redirect to='/login' />
}

export default SecureRoute