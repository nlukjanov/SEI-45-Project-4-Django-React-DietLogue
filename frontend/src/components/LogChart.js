import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'
import Authentication from './Authentication'
import headers from "../lib/headers"

let logDate = []
let dailyCalories = 0
let dailProtein = 0
let dailyCarbs = 0
let dailyFiber = 0
let dailyFat = 0
let dailySatFat = 0

class LogChart extends React.Component {
  state = {
    logData: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/myaccount',
      {
        headers: {
          Authorization: `Bearer ${Authentication.getToken('token')}`
        }
      })
      const sortedLogs = response.data.logs.sort((a, b) => b.id - a.id)
      this.setState({ logData: sortedLogs })
      const logDates = this.logData.map(log => logDate.push(log.date))
      console.log(logDates)
    } catch (error) {
      // this.props.history.push('/notfound')
      console.log(error)
    }
  }

  

  render () {  
    return(
      <Plot 
        data = {[
          {
            x: [1],
            y: [2],
            mode: 'lines+markers',
            marker: {color: 'red'},

          }
        ]}
        layout={ {
          width: 320, 
          height: 240, 
          title: 'food log', 
          xaxis: {
            title: 'date'
          },
          yaxis: {
            title: 'amount'
          }}} 
      />
    )
  }

}

export default LogChart
