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
    const formData = { ...this.state.formData, [name]: Number(value) }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(this.state.formData)
    try {
      const res = await axios.post(
        'http://localhost:8000/api/logs/',
        this.state.formData,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ToXIHM9kzaAX264Jyc81T5vpxJG5tNKH6vvI8iFkOCQ`
          }
        }
      )
      // this.props.history.push(`/cheeses/${res.data._id}`)
    } catch (error) {
      console.log(error.res)
    }
  }

  handleMultiChange = selected => {
    const value = selected ? selected.value : null
    const formData = { ...this.state.formData, food: value }
    this.setState({ formData })
  }

  handlePortion = e => {
    const name = e.target.getAttribute('name')
    
    if (name === 'increase') {
      console.log(this.state.formData.portion)
      const formData = {
        ...this.state.formData,
        portion: this.state.formData.portion + 1
      }
      this.setState({formData})
    } else if (name === 'decrease') {
      if (this.state.formData.portion === 1) {
        return 
      }
      const formData = {
        ...this.state.formData,
        portion: this.state.formData.portion - 1
      }
      this.setState({formData})
    }
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
                <label className='label has-text-centered'>Food</label>
                <div className='control'>
                  <Select
                    onChange={this.handleMultiChange}
                    options={this.state.food}
                    isClearable
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label has-text-centered'>Portion</label>
                <div className='control'>
                  <div className='flex-container'>
                    <div
                      name='decrease'
                      className='button'
                      onClick={this.handlePortion}
                    >
                      -
                    </div>
                    <input
                      className='input'
                      type='number'
                      min={1}
                      name='portion'
                      value={this.state.formData.portion}
                      onChange={this.handleChange}
                    />
                    <div
                      className='button'
                      name='increase'
                      onClick={this.handlePortion}
                    >
                      +
                    </div>
                  </div>
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
