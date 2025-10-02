import React from 'react';
import styles from './Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname.startsWith(to);
  return (
    <Link className={active ? styles.active : ''} to={to}>{children}</Link>
  );
};

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.heading}>General</div>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/documents">Documents</NavLink>
        <NavLink to="/templates">Templates</NavLink>
      </div>
      <div className={styles.section}>
        <div className={styles.heading}>Account</div>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/billing">Billing</NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

