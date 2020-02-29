import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <>
        <h1>Home Page</h1>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </>
    )
  }
}
export default Home
