import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';

const Layout = ({ children, withSidebar = true }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {withSidebar && <Sidebar />}
        <div style={{ flex: 1, padding: '1rem' }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

