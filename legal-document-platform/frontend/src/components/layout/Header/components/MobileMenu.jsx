import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  return (
    <div>
      {/* Add your mobile menu implementation here */}
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default MobileMenu;