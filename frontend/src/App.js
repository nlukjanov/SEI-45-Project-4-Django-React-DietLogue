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
import EditLog from './components/EditLog.js'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Notifications />
      <main>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <UnauthenticatedRoute path='/register' component={Register} />
          <UnauthenticatedRoute path='/login' component={Login} />
          <SecureRoute path='/myaccount' component={MyAccount} />
          <SecureRoute path='/loghistory' component={LogHistory} />
          <SecureRoute path='/logs/:id/edit' component={EditLog} />
          <SecureRoute path='/logs/new' component={NewLog} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
