// components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from "../chart.module.css"

const PieChart = ({ incidentData }) => {
  const chartData = {
    labels: ['Solved', 'Unsolved'],
    datasets: [
      {
        data: [
          incidentData.reduce((total, dayData) => total + dayData.solved, 0),
          incidentData.reduce((total, dayData) => total + dayData.unsolved, 0),
        ],
        backgroundColor: ['rgba(46, 204, 113, 0.7)', 'rgba(231, 76, 60, 0.7)'],
        borderColor: ['rgba(46, 204, 113, 1)', 'rgba(231, 76, 60, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    // ... other chart options
  };
  return (
  <div className={styles.piechartContainer}>
  <Pie data={chartData} options={chartOptions} />
</div>)
};

export default PieChart;
