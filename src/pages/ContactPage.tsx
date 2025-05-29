import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import LocationMap from '../components/contact/LocationMap';
import { CONTACT_INFO } from '../constants/contact';

const ContactPage = () => {
  return (
    <PageLayout 
      title="Contact Us" 
      description="Get in touch with our AI automation experts"
      currentPath="/contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <ContactInfo info={CONTACT_INFO} />
      </div>
      <LocationMap />
    </PageLayout>
  );
};

export default ContactPage;