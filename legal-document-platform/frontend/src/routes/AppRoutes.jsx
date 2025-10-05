import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import DocumentsPage from '../pages/Documents/DocumentsPage';
import DocumentDetailPage from '../pages/Documents/DocumentDetailPage';
import CreateDocumentPage from '../pages/Documents/CreateDocumentPage';
import EditDocumentPage from '../pages/Documents/EditDocumentPage';
import SignDocumentPage from '../pages/Documents/SignDocumentPage';
import TemplatesPage from '../pages/Templates/TemplatesPage';
import TemplateDetailPage from '../pages/Templates/TemplateDetailPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import ConsultationPage from '../pages/Consultation/ConsultationPage';
import BookingPage from '../pages/Consultation/BookingPage';
import CheckoutPage from '../pages/Payment/CheckoutPage';
import PaymentSuccessPage from '../pages/Payment/PaymentSuccessPage';
import PaymentFailurePage from '../pages/Payment/PaymentFailurePage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AboutPage from '../pages/About/AboutPage';
import ContactPage from '../pages/Contact/ContactPage';
import PricingPage from '../pages/Pricing/PricingPage';
import NotFoundPage from '../pages/Error/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/templates/:id" element={<TemplateDetailPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/create" element={<CreateDocumentPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
        <Route path="/documents/:id/edit" element={<EditDocumentPage />} />
        <Route path="/documents/:id/sign" element={<SignDocumentPage />} />
        <Route path="/consultations" element={<ConsultationPage />} />
        <Route path="/consultations/book" element={<BookingPage />} />
        <Route path="/payment/checkout" element={<CheckoutPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failure" element={<PaymentFailurePage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
