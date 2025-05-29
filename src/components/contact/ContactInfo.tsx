import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Icon from '../ui/Icon';

interface ContactInfoProps {
  info: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

const ContactInfo = ({ info }: ContactInfoProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Icon icon={MapPin} className="text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Address</h4>
            <p className="text-gray-400">{info.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Icon icon={Phone} className="text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Phone</h4>
            <p className="text-gray-400">{info.phone}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Icon icon={Mail} className="text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Email</h4>
            <p className="text-gray-400">{info.email}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Icon icon={Clock} className="text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Business Hours</h4>
            <p className="text-gray-400">{info.hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;