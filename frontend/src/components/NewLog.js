import React from 'react'
import axios from 'axios'
// import Auth from '../../lib/auth'
import Select from 'react-select'
const pluralize = require('pluralize')

class NewLog extends React.Component {
  state = {
    formData: {
      food: null,
      portion: 1
    },
    foodOption: [],
    foodData: [],
    helperData: null
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
      this.setState({ foodOption: foodOptions, foodData: res.data })
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
    this.setState({
      formData: {
        food: '',
        portion: 1
      }
    })
  }

  handleMultiChange = selected => {
    const value = selected ? selected.value : null
    const formData = { ...this.state.formData, food: value }
    this.setState({ formData }, () => {
      this.dataHelper()
    })
  }

  dataHelper = () => {
    if (!this.state.formData.food) return this.setState({ helperData: null })
    console.log(this.state)
    const measure = this.state.foodData.find(
      x => x.id === this.state.formData.food
    ).measure
    const unit = this.state.foodData.find(
      x => x.id === this.state.formData.food
    ).unit
    const grams = this.state.foodData.find(
      x => x.id === this.state.formData.food
    ).grams

    const helperData = { measure, unit, grams }
    this.setState({ helperData })
  }

  handlePortion = e => {
    const name = e.target.getAttribute('name')

    if (name === 'increase') {
      console.log(this.state.formData.portion)
      const formData = {
        ...this.state.formData,
        portion: this.state.formData.portion + 1
      }
      this.setState({ formData })
    } else if (name === 'decrease') {
      if (this.state.formData.portion === 1) {
        return
      }
      const formData = {
        ...this.state.formData,
        portion: this.state.formData.portion - 1
      }
      this.setState({ formData })
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
              <h2 className='title'>New Log Entry</h2>
              <div className='field'>
                <label className='label has-text-centered'>Food</label>
                <div className='control'>
                  <Select
                    onChange={this.handleMultiChange}
                    options={this.state.foodOption}
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
                {this.state.helperData && (
                  <div className='flex-container'>
                    <small className='help'>
                      {this.state.formData.portion}{' '}
                      {pluralize('portion', this.state.formData.portion)} ={' '}
                      {Number(this.state.helperData.measure) *
                        this.state.formData.portion}
                    </small>
                    <small className='help'>
                      {pluralize(
                        this.state.helperData.unit,
                        Number(this.state.helperData.measure) *
                          this.state.formData.portion
                      )}
                    </small>
                    <small className='help'>
                      {' '}
                      ={' '}
                      {Number(this.state.helperData.grams) *
                        this.state.formData.portion}{' '}
                      grams
                    </small>
                  </div>
                )}
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
