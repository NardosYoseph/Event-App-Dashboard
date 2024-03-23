"use client"
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";

const Search = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useDebouncedCallback((value) => {
    const trimmedValue = value.trim();
    console.log("Searching for:", trimmedValue);
    onSearch(trimmedValue); // Call the provided search function
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
