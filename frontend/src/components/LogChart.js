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
          proteins = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            mode: 'markers',
            name: 'Scatter'
          },
          
          calories = {
            x: [2, 3, 4, 5],
            y: [16, 5, 11, 9],
            mode: 'lines',
            name: 'Lines'
          },
          
          fat = {
            x: [1, 2, 3, 4],
            y: [12, 9, 15, 12],
            mode: 'lines+markers',
            name: 'Scatter and Lines'
          }],
          
          layout = {
            title: 'Title of the Graph',
            xaxis: {
              title: 'date'
            },
            yaxis: {
              title: 'amount'
            }
          }
          
        }
        layout={ {width: 320, height: 240, title: 'food log'}} />
    )
  }

}

export default LogChart
