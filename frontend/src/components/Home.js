import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <>
        <div>
          <div>
            Logo
          </div>
          <div>
            Diet Log
          </div>
        </div>
        <div>
          Slogan
        </div>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </>
    )
  }
}
export default Home
