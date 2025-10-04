import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ trigger, children, position = 'bottom-left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`${styles.menu} ${styles[position]}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
