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
import BlogPage from './pages/BlogPage';
import ServicesPage from './pages/ServicesPage';
import { AdminRoutes } from './routes/adminRoutes';

import './styles/cursor-effects.css';
import './styles/navigation.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white cursor-none">
        <ModernCursor />
        <FloatingNav />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ProblemSolution />
              <Services />
              <WhyChooseUs />
              <CaseStudies />
              <ConsultationForm />
              <FAQ />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog/*" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {AdminRoutes()}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;