import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3>Legal Document Platform</h3>
            <p>Simplifying legal documentation for everyone</p>
          </div>

          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/templates">Templates</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Legal</h4>
            <ul className={styles.links}>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Contact</h4>
            <ul className={styles.links}>
              <li>Email: support@legaldocs.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 Legal Document Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
