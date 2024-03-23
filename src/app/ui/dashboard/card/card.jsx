import React from 'react';
import styles from "./card.module.css"
const Card = ({ title, value, percentage }) => {
  
  console.log(title)
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>Total: {value}</p>
      <p>Percentage: {percentage.toFixed(2)}%</p>
    </div>
  );
};

export default Card;