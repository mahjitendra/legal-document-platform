import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <span>© {new Date().getFullYear()} Legal Document Platform</span>
      <nav className={styles.links}>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </footer>
);

export default Footer;

