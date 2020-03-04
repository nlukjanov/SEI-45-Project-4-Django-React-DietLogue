import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'
import Authentication from './Authentication'
import headers from '../lib/headers'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login/', this.state.data, headers)
      Authentication.setToken(res.data.token)
      notify.show('Welcome Back!', 'success', 3000)
      this.props.history.push('/')
    } catch (error) {
      this.setState({ error: error.response.data.message })
    }
  }

  render() {
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column column is-half is-offset-one-quarter'>
              <h1 className='title is-5 is-mobile has-text-centered'>
                Login Here
              </h1>
              <form onSubmit={this.handleSubmit}>
                <div className='field'>
                  <div className='control'>
                    <input
                      className='input'
                      placeholder='email'
                      name='email'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='field'>
                  <div className='control'>
                    <input
                      className='input'
                      type='password'
                      placeholder='password'
                      name='password'
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  {this.state.error && (
                    <small className='help is-danger'>{this.state.error}</small>
                  )}
                </div>
                <div className='field'>
                  <div className='control'>
                    <button
                      className='button is-primary is-fullwidth'
                      type='submit'
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
