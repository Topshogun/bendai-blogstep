import React from 'react';
import { MessageSquare, Database, Code, Calendar, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const ServiceCard = ({ icon: IconComponent, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg">
    <Icon icon={IconComponent} size={48} className="mb-6 text-blue-400" />
    <h3 className="text-xl font-semibold mb-4 font-orbitron">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Services = () => {
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
    <section id="services-section" className="py-24 px-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our AI Automation Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ServiceCard
            icon={MessageSquare}
            title="AI-Powered Customer Support"
            description="Instant, intelligent, and 24/7 support solutions to keep your customers satisfied."
          />
          <ServiceCard
            icon={Database}
            title="CRM Integrations"
            description="Seamlessly integrate and automate your CRM to manage relationships more effectively."
          />
          <ServiceCard
            icon={Code}
            title="Custom Websites & AI Agents"
            description="Tailor-made websites and custom AI agents that automate your operations and elevate your brand."
          />
          <ServiceCard
            icon={Calendar}
            title="Appointment Scheduling"
            description="Smart scheduling systems that organize your meetings effortlessly and save time."
          />
        </div>
        
        <div className="flex flex-col items-center gap-8">
          <Button 
            variant="primary"
            onClick={scrollToConsultation}
            className="group min-w-[300px] transform hover:scale-105 transition-all duration-300"
            aria-label="Schedule your free AI automation consultation"
            data-tracking="consultation-cta-services"
          >
            Schedule a Free Consultation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-gray-400 text-center max-w-2xl">
            Ready to transform your business with AI automation? Schedule your free consultation 
            today and discover how we can help streamline your operations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;