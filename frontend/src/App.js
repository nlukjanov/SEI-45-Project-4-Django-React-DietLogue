import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notifications from 'react-notify-toast'
import './App.css'
import 'bulma'

import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import MyAccount from './components/MyAccount'
import LogHistory from './components/LogHistory'
import NewLog from './components/NewLog'
import Navbar from './components/Navbar'
import SecureRoute from './components/SecureRoute'
import ErrorPage from './components/ErrorPage'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Notifications />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <SecureRoute path='/myaccount' component={MyAccount} />
          <SecureRoute path='/loghistory' component={LogHistory} />
          <SecureRoute path='/logs/new' component={NewLog} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
