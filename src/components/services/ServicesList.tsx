import React from 'react';
import { Service } from '../../types';
import ServiceCard from './ServiceCard';
import SectionHeader from '../common/SectionHeader';

interface ServicesListProps {
  services: Service[];
}

const ServicesList = ({ services }: ServicesListProps) => {
  return (
    <section className="py-16">
      <SectionHeader
        title="Our Services"
        subtitle="Comprehensive AI solutions for your business needs"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesList;