import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'
import headers from '../lib/headers'
import DynamicSelect from './DynamicSelect'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      gender: '',
      height: 0,
      weight: 0,
      dob: new Date()
    },
    errors: {}
  }

  numberIncrease = (start, stop, step) => {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    )
  }

  heights = this.numberIncrease(100, 200, 1)
  weights = this.numberIncrease(30, 150, 1)

  handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleHeightSelectChange = selectedValue => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, height: Number(selectedValue) }
    })
  }

  handleWeightSelectChange = selectedValue => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, weight: Number(selectedValue) }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/register/', this.state.data, headers)
      notify.show('Account successfully created', 'success', 2000)
      this.props.history.push('/login/')
    } catch (error) {
      this.setState({ errors: error.response.data })
    }
  }

  render() {
    return (
      <>
        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <form
                className='column is-half is-offset-one-quarter'
                onSubmit={this.handleSubmit}
              >
                <h2 className='title is-5 is-mobile has-text-centered'>
                  Create your account
                </h2>

                <div className='field'>
                  <div className='control'>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      placeholder='username'
                      name='username'
                      required
                    />
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      type='email'
                      placeholder='email'
                      name='email'
                      required
                    />
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      type='password'
                      placeholder='password'
                      name='password'
                      required
                    />
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      type='password'
                      placeholder='confirm password'
                      name='password_confirmation'
                      required
                    />
                  </div>
                </div>
                <hr />
                <div>
                  <h2 className='title is-5 is-mobile has-text-centered'>
                    Tell us a little bit about yourself
                  </h2>
                </div>

                <div className='field'>
                  <div className='control'>
                    <label className='label'>Gender</label>
                    <label className='radio'>
                      <input
                        type='radio'
                        name='gender'
                        value='M'
                        onChange={this.handleChange}
                      />
                      Male
                    </label>
                    <label className='radio'>
                      <input
                        type='radio'
                        name='gender'
                        value='F'
                        onChange={this.handleChange}
                      />
                      Female
                    </label>
                  </div>
                  {this.state.errors.gender && (
                    <small className='help is-danger'>
                      Please select a gender
                    </small>
                  )}
                </div>

                <div className='field'>
                  <label className='label'>Height</label>
                  <div className='control'>
                    <DynamicSelect
                      data={this.heights}
                      onSelectChange={this.handleHeightSelectChange}
                    />
                  </div>
                  {this.state.errors.height && (
                    <small className='help is-danger'>
                      {this.state.errors.height[0].replace('null', 'empty')}
                    </small>
                  )}
                </div>

                <div className='field'>
                  <label className='label'>Weight</label>
                  <div className='control'>
                    <DynamicSelect
                      data={this.weights}
                      onSelectChange={this.handleWeightSelectChange}
                    />
                  </div>
                  {this.state.errors.weight && (
                    <small className='help is-danger'>
                      {this.state.errors.weight[0].replace('null', 'empty')}
                    </small>
                  )}
                </div>

                <div className='field'>
                  <label className='label'>Date of Birth</label>
                  <div className='control'>
                    <input
                      type='date'
                      className='input'
                      name='dob'
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  {this.state.errors.height && (
                    <small className='help is-danger'>
                      {this.state.errors.dob[0]}
                    </small>
                  )}
                </div>

                <div>
                  <button
                    className='button is-primary is-fullwidth'
                    type='submit'
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Register
