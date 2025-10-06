import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/documents', icon: '📄', label: 'Documents' },
    { path: '/templates', icon: '📋', label: 'Templates' },
    { path: '/consultations', icon: '👨‍⚖️', label: 'Consultations' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={onClose}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </>
  );
};

export default Sidebar;
