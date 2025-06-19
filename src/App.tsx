import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FloatingNav from './components/navigation/FloatingNav';
import Footer from './components/Footer';
import HeroSection from './components/Hero/HeroSection';
import ProblemSolution from './components/sections/ProblemSolution';
import Services from './components/sections/Services';
import WhyChooseUs from './components/sections/WhyChooseUs';
import CaseStudies from './components/sections/CaseStudies';
import ConsultationForm from './components/sections/ConsultationForm';
import FAQ from './components/sections/FAQ';
import ModernCursor from './components/cursor/ModernCursor';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SubscribePage from './pages/SubscribePage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import PostsPage from './pages/admin/PostsPage';
import SettingsPage from './pages/admin/SettingsPage';
import UsersPage from './pages/admin/UsersPage';
import { useAuthProtection } from './middleware/authMiddleware';

import './styles/cursor-effects.css';
import './styles/navigation.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  useAuthProtection();
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white cursor-none">
        <ModernCursor />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <FloatingNav />
              <HeroSection />
              <ProblemSolution />
              <Services />
              <WhyChooseUs />
              <CaseStudies />
              <ConsultationForm />
              <FAQ />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <FloatingNav />
              <AboutPage />
              <Footer />
            </>
          } />
          <Route path="/services" element={
            <>
              <FloatingNav />
              <ServicesPage />
              <Footer />
            </>
          } />
          <Route path="/blog" element={
            <>
              <FloatingNav />
              <BlogPage />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <FloatingNav />
              <ContactPage />
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <FloatingNav />
              <PrivacyPage />
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <FloatingNav />
              <TermsPage />
              <Footer />
            </>
          } />
          <Route path="/subscribe" element={
            <>
              <FloatingNav />
              <SubscribePage />
              <Footer />
            </>
          } />
          
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;