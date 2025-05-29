import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ServicesList from '../components/services/ServicesList';
import ProcessTimeline from '../components/services/ProcessTimeline';
import TechnologyStack from '../components/services/TechnologyStack';
import { SERVICES_LIST, PROCESS_STEPS } from '../constants/services';

const ServicesPage = () => {
  return (
    <PageLayout 
      title="Our Services" 
      description="Comprehensive AI automation solutions for modern businesses"
      currentPath="/services"
    >
      <ServicesList services={SERVICES_LIST} />
      <ProcessTimeline steps={PROCESS_STEPS} />
      <TechnologyStack />
    </PageLayout>
  );
};

export default ServicesPage;