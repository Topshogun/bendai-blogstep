import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const HeroContent = () => {
  const navigate = useNavigate();

  const scrollToConsultation = () => {
    const consultationSection = document.getElementById('consultation-form');
    if (consultationSection) {
      consultationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-orbitron">
        Transform Your Business with AI Automation
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
        From Customer Support to CRM Integrations, Websites, Custom Agents, and 
        Appointment Settings – We Automate Success.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Button 
          variant="primary" 
          className="min-w-[250px] group transition-all duration-300 transform hover:scale-105"
          onClick={scrollToConsultation}
          aria-label="Schedule your free AI automation consultation"
          data-tracking="consultation-cta-hero"
        >
          Schedule a Free Consultation
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          variant="secondary" 
          className="min-w-[250px] group transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate('/services')}
          aria-label="View our AI automation services"
          data-tracking="services-cta-hero"
        >
          Explore Our Services
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </>
  );
};

export default HeroContent;