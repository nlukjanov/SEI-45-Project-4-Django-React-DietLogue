import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'
import headers from "../lib/headers"

class LogChart extends React.Component {
  state = {
    data: {
      calories: 0,
      proteins: 0,
      carbs: 0,
      fiber: 0,
      fat: 0,
      sat_fat: 0
    }
  }

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/myaccount', headers)
  //   } 
  // }




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
