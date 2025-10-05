import React, { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button} type="button">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
