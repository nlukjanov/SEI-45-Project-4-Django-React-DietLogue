import React from 'react'
import LogChart from './LogChart'
import LogHistory from './LogHistory'

class MyAccount extends React.Component {
  state = {

  }

  render () {
    return(
      <>
        <h1>My Account</h1>
        <LogChart />
        <LogHistory />
        

      </>
    )
  }
}

export default MyAccount  

