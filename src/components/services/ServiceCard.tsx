import React from 'react';
import { Service } from '../../types';
import Icon from '../ui/Icon';

const ServiceCard = ({ title, description, icon, features }: Service) => {
  return (
    <div className="group p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
      <Icon icon={icon} size={48} className="text-blue-400 mb-6" />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-gray-300">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;