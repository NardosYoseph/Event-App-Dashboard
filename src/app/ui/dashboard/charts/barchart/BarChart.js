import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from "../chart.module.css"

 const BarChart = ({ incidentData }) => {
  const chartData = {

        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Solved',
            data: incidentData.map((dayData) => dayData.solved),
            backgroundColor: 'rgba(46, 204, 113, 0.7)', // Translucent green for solved
            borderColor: 'rgba(46, 204, 113, 1)', // Solid green border
            borderWidth: 1,
          },
          {
            label: 'Unsolved',
            data: incidentData.map((dayData) => dayData.unsolved),
            backgroundColor: 'rgba(231, 76, 60, 0.7)', // Translucent red for unsolved
            borderColor: 'rgba(231, 76, 60, 1)', // Solid red border
            borderWidth: 1,
          },
        ],
      
  };

  const chartOptions = {
    // ... other chart options
    scales: {
      x: {
        stacked: true, // Enable stacking for bars
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return(
  <div className={styles.barchartContainer}>
  <Bar  data={chartData} options={chartOptions} />;
  </div>
  )
};
export default BarChart;