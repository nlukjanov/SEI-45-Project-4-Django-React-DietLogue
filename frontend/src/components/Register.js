import React from 'react'
import axios from 'axios'
import { notify } from 'react-notify-toast'
import headers from '../lib/headers'
import DynamicSelect from './DynamicSelect'
import 'bulma-calendar'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'


import 'react-datepicker/dist/react-datepicker.css'


//todo fix the height/weight dropdown error

class Register extends React.Component {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      gender: '',
      height: null,
      weight: null,
      dob: new Date()
    },
    selectedValue: null
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

  handleSelectChange = selectedValue => {
    this.setState({selectedValue: selectedValue})
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/register/', this.state.data, headers)
      notify.show('Account successfully created', 'success', 2000)
      this.props.history.push('/api/login/')
    } catch (error) {
      console.log(error.response)
    }
  }

  render() {

    return (
      <>
        <section className='section'>
          <div className='container'>
            <div className='columns is-mobile is-centered'>
              <div className='column is-6'>
                <form onSubmit={this.handleSubmit}>
                  <h2 className="title is-5 is-mobile">Create your account</h2>

                  <div>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      placeholder='username'
                      name='username'
                      required
                    />
                  </div>

                  <div>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      type='email'
                      placeholder='email'
                      name='email'
                      required
                    />
                  </div>

                  <div>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      type='password'
                      placeholder='password'
                      name='password'
                      required
                    />
                  </div>

                  <div>
                    <input
                      className='input'
                      onChange={this.handleChange}
                      type='password'
                      placeholder='confirm password'
                      name='password_confirmation'
                      required
                    />
                  </div>

                  <hr/>
                  <div>
                    <h2 className="title is-5 is-mobile">Tell us a little bit about yourself</h2>
                  </div>

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

                    <div className='field'>
                      <label className='label'>Height</label>
                      <div className='control'>
                        <DynamicSelect
                          data={this.heights}
                          onSelectChange={this.handleSelectChange}
                        /><br/>
                      </div>
                    </div>

                    <div className='field'>
                      <label className='label'>Weight</label>
                      <div className='control'>
                        <DynamicSelect
                          data={this.weights}
                          onSelectChange={this.handleSelectChange}
                        /><br/>
                      </div>
                    </div>

                    <div className='field'>
                      <label className='label'>Date of Birth</label>
                      <div className='control'>
                        <input 
                          type="date"
                          className="input"
                        >
                        </input>
                        <br/>

                      </div>
                    </div>
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
          </div>
        </section>
      </>
    )
  }
}

export default Register
