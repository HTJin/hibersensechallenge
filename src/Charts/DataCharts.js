import React from 'react'

import { HorizontalBar } from 'react-chartjs-2'

import './DataCharts.css'

export const ChartDisplay = (props) => {
  const kilo = []
  for (const watts of props.data) {
    kilo.push(watts/1000)
  }
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'kWh',
        backgroundColor: 'rgba(176,119,188,0.2)',
        borderColor: 'rgba(176,119,188,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(176,119,188,0.4)',
        hoverBorderColor: 'rgba(176,119,188,1)',
        data: kilo
      }
    ]
  }
  
  return (
    <div>
      <h2>Energy Consumption by Room</h2>
      <HorizontalBar data={data} />
    </div>
  )
}