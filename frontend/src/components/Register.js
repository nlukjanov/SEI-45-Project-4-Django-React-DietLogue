import React from 'react'
import axios from 'axios'
import FormErrors from './FormErrors'

//todo gender radio button
//todo dob calendar
//todo height dropdown
//todo weight dropdown


class Register extends React.Component {
  state = {
    data: {
      name: '',
      email: '',
      password: '', 
      passwordConfirmation: '',
      gender: '',
      height: 0, 
      weight: 0,
      dob: ''
    }, 
    emailValid: false,
    formValid: false, 
    passwordValid: false, 
    formErrors: {email: '', password: ''}
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value }
    this.setState({ data },
      // () => {
      //   this.validateField(name.value)
      // }
      )
  }

  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.formErrors
  //   let emailValid = this.state.emailValid
  //   let passwordValid = this.state.passwordValid

  //   switch (fieldName) {
  //     case 'email': 
  //       emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,}$/i)
  //       fieldValidationErrors.email = email
  //   }
  // }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/register', this.state.data)
      // this.props.history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <section className='form'>
        <form onSubmit={this.handleSubmit}>
          <h2>Create your account</h2>
          <div className="form-div">
            <input
              onChange={this.handleChange}
              placeholder="username"
              name="username" 
              required/>
          </div>
          <div className="form-div">
            <input
              onChange={this.handleChange}
              type="email"
              placeholder="email"
              name="email" 
              required/>
          </div>
          <div className="form-div">
            <input
              onChange={this.handleChange}
              type="password"
              placeholder="password"
              name="password" 
              required/>
          </div>
          <div className="form-div">
            <input
              onChange={this.handleChange}
              type="password"
              placeholder="confirm password"
              name="passwordConfirmation" 
              required/>
          </div>
          <div>
            <h3>Tell us a little bit about yourself</h3>
          </div>

          <div className="button-div">
          <button
            className="button"
            type="submit">
              Register</button>
        </div>
        </form>
      </section>
    )
  }
}

export default Register

