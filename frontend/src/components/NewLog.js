import React from 'react'
import axios from 'axios'
import Authentication from './Authentication'
import Select from 'react-select'
import { notify } from 'react-notify-toast'
const pluralize = require('pluralize')
const moment = require('moment')

class NewLog extends React.Component {
  state = {
    formData: {
      food: null,
      portion: 1,
      date: moment(new Date()).format('YYYY-MM-DD')
    },
    foodOption: [],
    foodData: null,
    helperData: null,
    errors: {}
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/foods/')
      const foodOptions = []
      res.data.map(el => {
        const foodObject = {}
        foodObject['value'] = el.id
        foodObject['label'] = el.name
        foodOptions.push(foodObject)
      })
      this.setState({ foodOption: foodOptions, foodData: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const formData = { ...this.state.formData, [name]: Number(value) }
    this.setState({ formData })
  }

  handleDate = ({ target: { name, value } }) => {
    const formData = { ...this.state.formData, [name]: value }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log(this.state.formData)
    try {
      await axios.post('/api/logs/', this.state.formData, {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      notify.show('Log entry created', 'success', 2000)
      this.props.history.push('/myaccount')
    } catch (error) {
      console.log(error.response.data)
      this.setState({ ...this.state, errors: error.response.data })
    }
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
    // if (!this.state.foodData) return null
    console.log(this.state.errors)
    // console.log(this.state.formData.food)
    // console.log(this.state.foodData[this.state.formData.food].name)
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
                  />
                </div>
                {this.state.errors.food && (
                  <small className='help is-danger'>
                    {this.state.errors.food[0].replace('null', 'empty')}
                  </small>
                )}
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
                      {`${this.state.formData.portion}
                      ${pluralize('portion', this.state.formData.portion)} = 
                      ${Number(this.state.helperData.measure) *
                        this.state.formData.portion}
                      ${pluralize(
                        this.state.helperData.unit,
                        Number(this.state.helperData.measure) *
                          this.state.formData.portion
                      )} = 
                      ${Number(this.state.helperData.grams) *
                        this.state.formData.portion} grams`}
                    </small>
                  </div>
                )}
              </div>
              <div className='field'>
                <label className='label has-text-centered'>Date</label>
                <div className='control'>
                  <input
                    className='input'
                    type='date'
                    name='date'
                    value={this.state.formData.date}
                    onChange={this.handleDate}
                  />
                </div>
                {this.state.errors.date && (
                  <small className='help is-danger'>
                    {this.state.errors.date[0]}
                  </small>
                )}
              </div>
              <div className='field'>
                <button
                  type='submit'
                  className='button is-fullwidth is-primary'
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
