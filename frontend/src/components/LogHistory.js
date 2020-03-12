import React, { Component } from 'react'
import axios from 'axios'
import Authentication from './Authentication'
import { withRouter } from 'react-router'

const moment = require('moment')
class LogHistory extends Component {
  state = {
    logData: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myaccount/', {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      const sortedLogs = res.data.logs.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      this.setState({ logData: sortedLogs })
    } catch (error) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    const { logData } = this.state
    return (
      <section className='section'>
        <div className='container'>
          <h1 className='title has-text-centered'>Your log history</h1>
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
                  <th>Protein</th>
                  <th>Carbs</th>
                  <th>Fiber</th>
                  <th>Fat</th>
                  <th>Sat. Fat</th>
                </tr>
              </thead>
              <tbody>
                {logData.map(entry => {
                  return (
                    <tr
                      className='link'
                      key={entry.id}
                      onClick={() =>
                        this.props.history.push(`/logs/${entry.id}/edit`)
                      }
                    >
                      <td>{moment(entry.date).format('DD/MM/YYYY')}</td>
                      <td>{entry.food.name}</td>
                      <td>{entry.portion}</td>
                      <td>{entry.food.measure}</td>
                      <td>{entry.food.unit}</td>
                      <td>{Math.round(entry.food.grams * entry.portion)}</td>
                      <td>{Math.round(entry.food.calories * entry.portion)}</td>
                      <td>{Math.round(entry.food.protein * entry.portion)}</td>
                      <td>{Math.round(entry.food.carbs * entry.portion)}</td>
                      <td>{Math.round(entry.food.fiber * entry.portion)}</td>
                      <td>{Math.round(entry.food.fat * entry.portion)}</td>
                      <td>{Math.round(entry.food.sat_fat * entry.portion)}</td>
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

export default withRouter(LogHistory)
