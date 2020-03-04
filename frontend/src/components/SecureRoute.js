import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Authentication from './Authentication'

const SecureRoute = ({ component: Component, ...rest }) => {
  if (Authentication.isAuthenticated()) return <Route {...rest} component={Component} />
  Authentication.logout()
  return <Redirect to='/login' />
}

export default SecureRoute