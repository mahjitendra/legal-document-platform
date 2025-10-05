import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Layout from './components/layout/Layout';

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DocumentsPage from './pages/Documents/DocumentsPage';
import CreateDocumentPage from './pages/Documents/CreateDocumentPage';
import DocumentDetailPage from './pages/Documents/DocumentDetailPage';
import EditDocumentPage from './pages/Documents/EditDocumentPage';
import SignDocumentPage from './pages/Documents/SignDocumentPage';
import TemplatesPage from './pages/Templates/TemplatesPage';
import TemplateDetailPage from './pages/Templates/TemplateDetailPage';
import CreateTemplatePage from './pages/Templates/CreateTemplatePage';
import EditTemplatePage from './pages/Templates/EditTemplatePage';
import CheckoutPage from './pages/Payment/CheckoutPage';
import BookingPage from './pages/Consultation/BookingPage';
import ConsultationPage from './pages/Consultation/ConsultationPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFoundPage from './pages/Error/NotFoundPage';

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/documents/create" element={<CreateDocumentPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/documents/edit/:id" element={<EditDocumentPage />} />
          <Route path="/documents/sign/:id" element={<SignDocumentPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:id" element={<TemplateDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/consultations" element={<ConsultationPage />} />
          <Route path="/consultations/book" element={<BookingPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/templates/create" element={<CreateTemplatePage />} />
          <Route path="/templates/edit/:id" element={<EditTemplatePage />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;