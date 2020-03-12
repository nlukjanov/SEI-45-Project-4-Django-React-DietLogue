import React from 'react'
import axios from 'axios'
import Authentication from './Authentication'
import Plot from 'react-plotly.js'
const moment = require('moment')

const dietOptions = {
  option1: {
    fat: 56,
    sat_fat: 16,
    carbs: 208,
    protein: 34,
    fiber: 22.4,
    calories: 1600
  },
  option2: {
    fat: 63,
    sat_fat: 18,
    carbs: 236,
    protein: 46,
    fiber: 25.2,
    calories: 1800
  },
  option3: {
    fat: 70,
    sat_fat: 20,
    carbs: 260,
    protein: 50,
    fiber: 28,
    calories: 2000
  },
  option4: {
    fat: 77,
    sat_fat: 22,
    carbs: 286,
    protein: 52,
    fiber: 30.8,
    calories: 2200
  },
  option5: {
    fat: 84,
    sat_fat: 24,
    carbs: 312,
    protein: 56,
    fiber: 33.6,
    calories: 2400
  }
}

const currentWeek = []
const currentTime = new Date()
for (let i = 1; i <= 7; i++) {
  const first = currentTime.getDate() - currentTime.getDay() + i
  const day = new Date(currentTime.setDate(first)).toISOString().slice(0, 10)
  currentWeek.push(day)
}

class MyAccount extends React.Component {
  state = {
    userData: {},
    todayLogEntries: [],
    dailyLogEntries: [],
    dropDownSelection: 'calories',
    diet: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myaccount/', {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      console.log('res', res.data)
      this.setState({ userData: res.data }, () => {
        this.setUserData()
        this.setDailyLogEntries()
      })
    } catch (error) {
      console.log(error)
    }
  }

  setUserData = () => {
    const todayLogEntries = this.state.userData.logs.filter(entry => {
      const today = moment(new Date()).format('YYYY-MM-DD')
      const entryDate = moment(entry.date).format('YYYY-MM-DD')
      return today === entryDate
    })
    const diet = () => {
      const age = moment().diff(this.state.userData.dob, 'years')
      if (this.state.userData.gender === 'M') {
        if (age >= 9 && age <= 13) {
          return dietOptions.option1
        } else if (age >= 14 && age <= 18) {
          return dietOptions.option4
        } else if (age >= 19 && age <= 30) {
          return dietOptions.option5
        } else if (age >= 31 && age <= 50) {
          return dietOptions.option4
        } else if (age >= 51) {
          return dietOptions.option3
        } else {
          return dietOptions.option3
        }
      } else if (this.state.userData.gender === 'F') {
        if (age >= 9 && age <= 13) {
          return dietOptions.option1
        } else if (age >= 14 && age <= 18) {
          return dietOptions.option2
        } else if (age >= 19 && age <= 30) {
          return dietOptions.option3
        } else if (age >= 31 && age <= 50) {
          return dietOptions.option2
        } else if (age >= 51) {
          return dietOptions.option1
        } else {
          return dietOptions.option3
        }
      }
    }
    this.setState({ todayLogEntries, diet: diet() })
  }

  setDailyLogEntries = () => {
    const dailyLogEntries = this.state.userData.logs.reduce((foods, entry) => {
      const entryDate = entry.date
      if (!foods[entryDate]) {
        foods[entryDate] = []
      }
      foods[entryDate].push(entry)
      return foods
    }, {})
    this.setState({ dailyLogEntries })
  }

  calculateProgress = nutrient => {
    const foodNutrition = this.state.todayLogEntries.map(entry => {
      return entry.food[nutrient] * entry.portion
    })
    return foodNutrition.reduce((a, b) => Number(a) + Number(b), 0)
  }

  unpackNutrients = date => {
    const dateFoodArr = Object.entries(this.state.dailyLogEntries)
    const currentEntry = dateFoodArr.filter(dateFoodItem => (dateFoodItem.flat(2))[0] === date)
    return currentEntry.flat(2)
  }

  calculateDailyTotal = (date, nutrient) => {
    const nutrientEntries = this.unpackNutrients(date)
    const nutrients = nutrientEntries
      .filter(entry => typeof entry !== 'string')
    const dailyNutrients = nutrients.map(foodItem => Number(foodItem.food[nutrient]) * Number(foodItem.portion)
    ) 
    const dailyTotal = dailyNutrients.reduce(
      (a, b) => parseFloat(a) + parseFloat(b),0)

    return dailyTotal
  }

  getCurrentWeekValues = nutrient => {
    return currentWeek.map(day => this.calculateDailyTotal(day, nutrient))
  }

  handleChange = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    this.setState({ [name]: newValue })
  }

  render() {
    console.log(this.state)
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns is-mobile is-centered'>
            <div className='column is-6'>
              <figure className='column is-mobile'>
                <img
                  className='column is-3 is-mobile has-image-centered is-16x16'
                  src={require('../assets/logo-notext.png')}
                />
              </figure>
            </div>
            {/* <div className='column is-6'>
              <div>Diet Log</div>
            </div> */}
          </div>
          <div className='columns'>
            <div className='column is-12'>
              <div className='mobile'>
                <Plot
                  useResizeHandler
                  style={{ height: '100%', width: '100%' }}
                  data={[
                    {
                      x: currentWeek.slice(0, 5),
                      y: this.getCurrentWeekValues('protein'),
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'red' },
                      name: 'protein'
                    },
                    {
                      x: currentWeek.slice(0, 5),
                      y: this.getCurrentWeekValues('calories'),
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'yellow' },
                      name: 'calories',
                      yaxis: 'y2'
                    },
                    {
                      x: currentWeek.slice(0, 5),
                      y: this.getCurrentWeekValues('carbs'),
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'green' },
                      name: 'carbs'
                    },
                    {
                      x: currentWeek.slice(0, 5),
                      y: this.getCurrentWeekValues('fat'),
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'red' },
                      name: 'fat'
                    },
                    {
                      x: currentWeek.slice(0, 5),
                      y: this.getCurrentWeekValues('sat_fat'),
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'blue' },
                      name: 'sat_fat'
                    }
                  ]}
                  layout={{
                    title: 'You weekly consumption',
                    margin: { t: 60, r: 50, l: 30, b: 60 },
                    autosize: true,
                    showlegend: true,
                    xaxis: {
                      autorange: true
                    },
                    yaxis2: {
                      overlaying: 'y',
                      side: 'right',
                      title: 'calories measure'
                    },
                    legend: {
                      x: 0.5,
                      y: 1
                    }
                  }}
                  config={{ displayModeBar: false }}
                />
              </div>
              <hr />
              <div>
                <h4 className='is-size-5 has-text-centered'>
                  Your day at a glance
                </h4>
              </div>
              <br />
              <div className='field is-centered'>
                <div className='select'>
                  <select
                    name='dropDownSelection'
                    onChange={this.handleChange}
                    value={this.state.dropDownSelection}
                    className='is-centered'
                  >
                    <option value='calories'>Calories</option>
                    <option value='protein'>Protein</option>
                    <option value='carbs'>Carbs</option>
                    <option value='fiber'>Fiber</option>
                    <option value='fat'>Fat</option>
                    <option value='sat_fat'>Sat Fat</option>
                  </select>
                </div>
              </div>
              <progress
                className='progress is-primary'
                value={this.calculateProgress(this.state.dropDownSelection)}
                max={this.state.diet[this.state.dropDownSelection]}
              ></progress>
              <div className='table-container'>
                <table className='table is-fullwidth'>
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Portion</th>
                      <th>Measure</th>
                      <th>Unit</th>
                      <th>Grams</th>
                      <th>Calories</th>
                      <th>Protein</th>
                      <th>Carbs</th>
                      <th>Fiber</th>
                      <th>Fat</th>
                      <th>Sat. Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.todayLogEntries.map(entry => {
                      return (
                        <tr
                          className='link'
                          key={entry.id}
                          onClick={() =>
                            this.props.history.push(`/logs/${entry.id}/edit`)
                          }
                        >
                          <td>{entry.food.name}</td>
                          <td>{entry.portion}</td>
                          <td>{entry.food.measure}</td>
                          <td>{entry.food.unit}</td>
                          <td>
                            {Math.round(entry.food.grams * entry.portion)}
                          </td>
                          <td>
                            {Math.round(entry.food.calories * entry.portion)}
                          </td>
                          <td>
                            {Math.round(entry.food.protein * entry.portion)}
                          </td>
                          <td>
                            {Math.round(entry.food.carbs * entry.portion)}
                          </td>
                          <td>
                            {Math.round(entry.food.fiber * entry.portion)}
                          </td>
                          <td>{Math.round(entry.food.fat * entry.portion)}</td>
                          <td>
                            {Math.round(entry.food.sat_fat * entry.portion)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MyAccount
