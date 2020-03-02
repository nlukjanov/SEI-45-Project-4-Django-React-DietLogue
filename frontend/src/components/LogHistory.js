import React, { Component } from 'react'
import axios from 'axios'
import headers from "../lib/headers"
const moment = require('moment')


class LogHistory extends Component {
  state = {
    logData: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/myaccount', headers)
      const sortedLogs = res.data.logs.sort((a, b) => b.id - a.id)
      this.setState({ logData: sortedLogs })
    } catch (error) {
      // this.props.history.push('/notfound')
    }
  }

  render() {
    console.log(this.state)
    const logData = this.state.logData
    return (
      <section className='section'>
        <div className='container'>
          <h1 className='title has-text-centered'>
            Your log history
          </h1>
          <div className='table-container'>
            <table className='table is-fullwidth'>
              <thead>
                <tr>
                  <th>Date</th>
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
                {logData.map(entry => {
                  console.log(entry.food.sat_fat)
                  return (
                    <tr key={entry.id}>
                      <td>{moment(entry.created_at).format('DD/MM/YYYY, H:mm')}</td>
                      <td>{entry.food.name}</td>
                      <td>{entry.portion}</td>
                      <td>{entry.food.measure}</td>
                      <td>{entry.food.unit}</td>
                      <td>{entry.food.grams}</td>
                      <td>{entry.food.calories}</td>
                      <td>{entry.food.protein}</td>
                      <td>{entry.food.carbs}</td>
                      <td>{entry.food.fiber}</td>
                      <td>{entry.food.fat}</td>
                      <td>{entry.food.sat_fat}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

export default LogHistory
