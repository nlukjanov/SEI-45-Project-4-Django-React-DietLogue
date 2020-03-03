import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Authentication from './Authentication'
import Plot from 'react-plotly.js'
// import LogChart from './LogChart'
const moment = require('moment')

const diet = {
  fat: 70,
  sat_fat: 20,
  carbs: 260,
  protein: 50,
  fiber: 38,
  calories: 2000
}

class MyAccount extends React.Component {
  state = {
    userData: {},
    todayLogEntries: [],
    dropDownSelection: 'calories'
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myaccount', {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      this.setState({ userData: res.data }, () => this.setTodayLogEntries())
    } catch (error) {
      console.log(error)
    }
  }

  setTodayLogEntries = () => {
    const todayLogEntries = this.state.userData.logs.filter(entry => {
      const today = moment(new Date()).format('YYYY-MM-DD')
      const entryDate = moment(entry.date).format('YYYY-MM-DD')
      return today === entryDate
    })
    this.setState({ todayLogEntries })
  }

  calculateProgress = nutrient => {
    const foodNutrition = this.state.todayLogEntries.map(entry => {
      return entry.food[nutrient] * entry.portion
    })
    console.log(foodNutrition.reduce((a, b) => Number(a) + Number(b), 0))
    return foodNutrition.reduce((a, b) => Number(a) + Number(b), 0)
  }

  handleChange = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    this.setState({ [name]: newValue })
  }

  render() {
    // if (!this.state.userData.logs) return null
    console.log(this.state)
    return (
      <section className='section'>
        <div className='container'>
          <div className='columns is-mobile is-centered'>
            <div className='column is-6'>
              <div className=''>Logo</div>
            </div>
            <div className='column is-6'>
              <div>Diet Log</div>
            </div>
          </div>
          <Link className='button is-primary is-fullwidth' to='/logs/new'>
            Log Your Food
          </Link>
          <div className='columns'>
            <div className='column is-12'>
              <div className='mobile'>
                <Plot
                  useResizeHandler
                  style={{ height: '100%', width: '100%' }}
                  data={[
                    {
                      x: [1, 2, 3, 4, 5, 6, 7],
                      y: [2, 6, 3, 5, 1, 6, 9],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'red' }
                    },
                    {
                      x: [1, 2, 3, 4, 5, 6, 7],
                      y: [4, 2, 1, 7, 2, 3, 6],
                      type: 'scatter',
                      mode: 'lines+markers',
                      marker: { color: 'blue' }
                    }
                  ]}
                  layout={{
                    title: 'You consumption',
                    margin: { t: 60, r: 10, l: 10, b: 30 },
                    autosize: true,
                    showlegend: false
                  }}
                  config={{ displayModeBar: false }}
                />
              </div>
              <div>Your Day At A Glance</div>
              <div className='field'>
                <div className='select'>
                  <select
                    name='dropDownSelection'
                    onChange={this.handleChange}
                    value={this.state.dropDownSelection}
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
                max={diet[this.state.dropDownSelection]}
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
                      <th>Proteins</th>
                      <th>Carbs</th>
                      <th>Fiber</th>
                      <th>Fat</th>
                      <th>Sat. Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.todayLogEntries.map(entry => {
                      console.log(entry.food.sat_fat)
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
