import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './i18n/i18n';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;