import React from 'react'
import Plot from 'react-plotly.js'




class LogChart extends React.Component {
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
