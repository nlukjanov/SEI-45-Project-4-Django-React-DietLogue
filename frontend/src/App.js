import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import MyAccount from './components/MyAccount'
import LogHistory from './components/LogHistory'
import NewLog from './components/NewLog'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        {/* <Notifications /> */}
        {/* <Navbar /> */}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/myaccount' component={MyAccount} />
          <Route path='/loghistory' component={LogHistory} />
          <Route path='/logs/new' component={NewLog} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
