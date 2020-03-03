import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'
import Authentication from './Authentication'
import headers from "../lib/headers"

class LogChart extends React.Component {
  state = {
    data: [{
      calories: 0,
      proteins: 0,
      carbs: 0,
      fiber: 0,
      fat: 0,
      sat_fat: 0
    }]
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
    } catch (error) {
      this.props.history.push('/notfound')
    }
  }

  render () {
    return(
      <Plot 
        data = {[
          {
            x: ['Monday', 'Tuesday'],
            y: [3, 5],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'}
          }
        ]}
        layout={ {width: 320, height: 240, title: 'food log'}} />
    )
  }

}

export default LogChart
