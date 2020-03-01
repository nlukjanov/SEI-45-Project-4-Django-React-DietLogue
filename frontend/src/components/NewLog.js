import React from 'react'
import axios from 'axios'
// import Auth from '../../lib/auth'
import Select from 'react-select'

class NewLog extends React.Component {
  state = {
    formData: {
      food: null,
      portion: 1
    },
    food: {}
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:8000/api/foods/')
      const foodOptions = []
      res.data.map(el => {
        const foodObject = {}
        foodObject['value'] = el.id
        foodObject['label'] = el.name
        foodOptions.push(foodObject)
      })
      this.setState({ food: foodOptions })
    } catch (error) {
      // this.props.history.push('/notfound')
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const formData = { ...this.state.formData, [name]: value }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(this.state.formData)
    try {
      const res = await axios.post(
        'http://localhost:8000/api/logs/',
        this.state.formData,
        { headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ToXIHM9kzaAX264Jyc81T5vpxJG5tNKH6vvI8iFkOCQ` } }
      )
      // this.props.history.push(`/cheeses/${res.data._id}`)
    } catch (error) {
      console.log(error.res)
    }
  }

  handleMultiChange = selected => {
    const formData = { ...this.state.formData, food: selected.value }
    this.setState({ formData })
  }

  render() {
    console.log(this.state)
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <form
              onSubmit={this.handleSubmit}
              className='column is-half is-offset-one-quarter'
            >
              <h2 className='title'>New Cheese</h2>
              <div className='field'>
                <label className='label'>Food</label>
                <div className='control'>
                  <Select
                    onChange={this.handleMultiChange}
                    options={this.state.food}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Portion</label>
                <div className='control'>
                <input
                  className='input'
                  type='number'
                  min='1'
                  name='portion'
                  value={this.state.formData.portion}
                  onChange={this.handleChange}
                />
                </div>
              </div>
              <div className='field'>
                <button
                  type='submit'
                  className='button is-fullwidth is-warning'
                >
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default NewLog
