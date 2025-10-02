import React from 'react';
import styles from './Header.module.css';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import UserMenu from './components/UserMenu';
import MobileMenu from './components/MobileMenu';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.navContainer}>
        <Navigation />
      </div>
      <div className={styles.userMenuContainer}>
        <UserMenu />
      </div>
      <div className={styles.mobileMenuContainer}>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;