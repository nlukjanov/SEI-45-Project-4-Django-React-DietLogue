import React from 'react'
import { Link } from 'react-router-dom'


class Home extends React.Component {
  render() {
    return (
      <>
        <section className='section'>
          <div className='container'>
            <div className='columns is-mobile is-centered'>
              <div className='column is-mobile'>
                <div className='column is-mobile'>
                  <figure>
                    <img className='column is-mobile has-image-centered' src={require('../assets/logo3.png')} />
                  </figure>
                </div>

                <div className='is-size-4 has-text-centered'>LET'S START THE DIETLOGUE ABOUT NUTRITION!</div>
              </div>
            </div>
            <Link className='button is-primary is-fullwidth' to='/register'>
              Register
            </Link>
            <br/>
            <Link className='button is-primary is-fullwidth' to='/login'>
              Login
            </Link>
          </div>
        </section>
      </>
    )
  }
}
export default Home
