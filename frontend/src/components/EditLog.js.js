import React from 'react'
import axios from 'axios'
import Authentication from './Authentication'
import Select from 'react-select'
import { notify } from 'react-notify-toast'
import HelperData from './HelperData'
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
    helperData: null
  }

  async componentDidMount() {
    const logId = this.props.match.params.id
    try {
      const res = await Promise.all([
        axios.get('/api/foods/'),
        axios.get(`/api/logs/${logId}`)
      ])
      const foodOptions = []
      res[0].data.map(el => {
        const foodObject = {}
        foodObject['value'] = el.id
        foodObject['label'] = el.name
        foodOptions.push(foodObject)
      })
      const currentEntry = res[1].data
      this.setState({
        foodOption: foodOptions,
        foodData: res[0].data,
        formData: currentEntry
      })
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
    const logId = this.props.match.params.id
    try {
      await axios.put(`/api/logs/${logId}/`, this.state.formData, {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      notify.show('Log entry updated', 'success', 2000)
      this.props.history.push('/loghistory')
    } catch (error) {
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
    const foodItem = this.state.foodData.find(
      x => x.id === this.state.formData.food
    )
    this.setState({ helperData: foodItem })
  }

  handlePortion = e => {
    const name = e.target.getAttribute('name')

    if (name === 'increase') {
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
    const { helperData, formData } = this.state
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns'>
            <form
              onSubmit={this.handleSubmit}
              className='column is-half is-offset-one-quarter'
            >
              <h2 className='title'>Update Log Entry</h2>
              <div className='field'>
                <label className='label has-text-centered'>Food</label>
                <div className='control'>
                  <Select
                    onChange={this.handleMultiChange}
                    options={this.state.foodOption}
                    isClearable
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
                  <HelperData helperData={helperData} formData={formData} />
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
