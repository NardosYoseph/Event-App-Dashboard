import React from 'react';
import Select from 'react-select';
import styles from './filter.module.css'

const Filter = ({ statusOptions, priorityOptions, onStatusFilterChange, onPriorityFilterChange, currentPage }) => {
  const handleStatusFilterChange = (selectedOption) => {
    const filterValue = selectedOption?.value;
    onStatusFilterChange(filterValue);
  };

  const handlePriorityFilterChange = (selectedOption) => {
    const filterValue = selectedOption?.value;
    onPriorityFilterChange(filterValue);
  };

  return (
    <div className={styles.container}>
      {/* <label>Status Filter:</label> */}
      <Select
        options={statusOptions}
        onChange={handleStatusFilterChange}
        placeholder="Filter by status..."
        isSearchable={false}
      />

      {/* <label>Priority Filter:</label> */}
      <Select
        options={priorityOptions}
        onChange={handlePriorityFilterChange}
        placeholder="Filter by priority..."
        isSearchable={false}
      />
    </div>
  );
};

export default Filter;
