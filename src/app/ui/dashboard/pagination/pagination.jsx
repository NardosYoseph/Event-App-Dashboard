"use client";
import styles from "./pagination.module.css";
import React from 'react';

const Pagination = ({ pgManager, handlePageChange }) => {
  return (
    <div className={styles.button}>
      {pgManager?.hasPreviousPage && (
        <button onClick={() => handlePageChange(pgManager.getCurrentPage - 1)}>
          Previous
        </button>
      )}

      {pgManager?.pageLinks.map((link) => (
        <button className={styles.button}
          key={link.pageNumber}
          onClick={() => handlePageChange(link.pageNumber)}
          disabled={link.isCurrent}
        >
          {link.pageNumber}
        </button>
      ))}

      {pgManager?.hasNextPage && (
      <button className={styles.button}   onClick={() => handlePageChange(pgManager.getCurrentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;